// CMS Final Rules Tracker JavaScript

let rulesData = null;
let filteredRules = [];

// Load rules data
async function loadRulesData() {
    try {
        const response = await fetch('data/cms-rules.json');
        if (!response.ok) throw new Error('Failed to load rules data');
        rulesData = await response.json();
        displayRules(rulesData.rules);
        document.getElementById('loading-rules').style.display = 'none';
    } catch (error) {
        console.error('Error loading rules:', error);
        document.getElementById('loading-rules').innerHTML = `
            <p style="color: var(--accent-color);">Unable to load rules data. Please try again later.</p>
        `;
    }
}

// Display rules in timeline
function displayRules(rules) {
    const container = document.getElementById('rules-container');
    container.innerHTML = '';
    
    if (rules.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">No rules found matching your criteria.</p>';
        return;
    }
    
    // Group by year
    const rulesByYear = {};
    rules.forEach(rule => {
        if (!rulesByYear[rule.calendarYear]) {
            rulesByYear[rule.calendarYear] = [];
        }
        rulesByYear[rule.calendarYear].push(rule);
    });
    
    // Sort years descending
    const years = Object.keys(rulesByYear).sort((a, b) => b - a);
    
    years.forEach(year => {
        const yearSection = document.createElement('div');
        yearSection.className = 'year-section';
        
        const yearHeader = document.createElement('div');
        yearHeader.className = 'year-header';
        yearHeader.innerHTML = `
            <h3>Calendar Year ${year}</h3>
            <span class="year-count">${rulesByYear[year].length} Rule${rulesByYear[year].length > 1 ? 's' : ''}</span>
        `;
        yearSection.appendChild(yearHeader);
        
        const rulesGrid = document.createElement('div');
        rulesGrid.className = 'rules-grid';
        
        rulesByYear[year].forEach(rule => {
            const ruleCard = createRuleCard(rule);
            rulesGrid.appendChild(ruleCard);
        });
        
        yearSection.appendChild(rulesGrid);
        container.appendChild(yearSection);
    });
}

// Create rule card
function createRuleCard(rule) {
    const card = document.createElement('div');
    card.className = 'rule-card';
    card.dataset.ruleId = rule.id;
    
    const statusClass = rule.status.toLowerCase();
    const typeLabel = getRuleTypeLabel(rule.type);
    
    card.innerHTML = `
        <div class="rule-card-header">
            <span class="rule-type-badge ${rule.type}">${typeLabel}</span>
            <span class="rule-status ${statusClass}">${rule.status}</span>
        </div>
        <h3 class="rule-title">${rule.title}</h3>
        <div class="rule-meta">
            <div class="rule-meta-item">
                <strong>Implementation:</strong> ${formatDate(rule.implementationDate)}
            </div>
            <div class="rule-meta-item">
                <strong>Published:</strong> ${formatDate(rule.releaseDate)}
            </div>
        </div>
        <div class="rule-changes-preview">
            <strong>${rule.keyChanges.length} Key Changes:</strong>
            <ul class="changes-list">
                ${rule.keyChanges.slice(0, 3).map(change => `
                    <li><span class="impact-badge impact-${change.impact}">${change.impact}</span> ${change.category}</li>
                `).join('')}
                ${rule.keyChanges.length > 3 ? `<li class="more-changes">+ ${rule.keyChanges.length - 3} more</li>` : ''}
            </ul>
        </div>
        <div class="rule-actions">
            <button class="btn-link view-details" data-rule-id="${rule.id}">View Full Details →</button>
            <a href="${rule.cmsLink}" target="_blank" rel="noopener noreferrer" class="btn-link">CMS.gov ↗</a>
        </div>
    `;
    
    card.querySelector('.view-details').addEventListener('click', () => showRuleDetails(rule));
    
    return card;
}

// Get rule type label
function getRuleTypeLabel(type) {
    const labels = {
        'ma-part-d': 'MA & Part D',
        'pfs': 'Physician Fee Schedule',
        'opps': 'OPPS',
        'ipps': 'IPPS',
        'home-health': 'Home Health'
    };
    return labels[type] || type;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Show rule details
function showRuleDetails(rule) {
    const modal = document.getElementById('rule-detail-modal');
    const content = document.getElementById('rule-detail-content');
    
    content.innerHTML = `
        <div class="rule-detail-header">
            <span class="rule-type-badge ${rule.type}">${getRuleTypeLabel(rule.type)}</span>
            <span class="rule-status ${rule.status.toLowerCase()}">${rule.status}</span>
        </div>
        <h2>${rule.title}</h2>
        <h3>Calendar Year ${rule.calendarYear}</h3>
        
        <div class="detail-meta">
            <div><strong>Published:</strong> ${formatDate(rule.releaseDate)}</div>
            <div><strong>Implementation:</strong> ${formatDate(rule.implementationDate)}</div>
        </div>
        
        <div class="detail-summary">
            <h4>Summary</h4>
            <p>${rule.summary}</p>
        </div>
        
        <div class="detail-changes">
            <h4>Key Changes & Impact</h4>
            ${rule.keyChanges.map(change => `
                <div class="change-item">
                    <div class="change-header">
                        <strong>${change.category}</strong>
                        <span class="impact-badge impact-${change.impact}">${change.impact.toUpperCase()} IMPACT</span>
                    </div>
                    <p>${change.description}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="detail-actions">
            <a href="${rule.cmsLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View on CMS.gov ↗</a>
            <a href="contact.html" class="btn btn-secondary">Get Implementation Help</a>
        </div>
    `;
    
    modal.classList.add('active');
}

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    loadRulesData();
    
    const ruleTypeFilter = document.getElementById('rule-type-filter');
    const yearFilter = document.getElementById('year-filter');
    const compareBtn = document.getElementById('compare-years-btn');
    
    function applyFilters() {
        if (!rulesData) return;
        
        let filtered = rulesData.rules;
        
        const typeFilter = ruleTypeFilter.value;
        if (typeFilter !== 'all') {
            filtered = filtered.filter(rule => rule.type === typeFilter);
        }
        
        const year = yearFilter.value;
        if (year !== 'all') {
            filtered = filtered.filter(rule => rule.calendarYear.toString() === year);
        }
        
        filteredRules = filtered;
        displayRules(filtered);
    }
    
    ruleTypeFilter.addEventListener('change', applyFilters);
    yearFilter.addEventListener('change', applyFilters);
    
    // Comparison modal
    compareBtn.addEventListener('click', () => {
        document.getElementById('comparison-modal').classList.add('active');
    });
    
    // Run comparison
    document.getElementById('run-comparison-btn').addEventListener('click', runComparison);
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
});

// Run year-over-year comparison
function runComparison() {
    if (!rulesData) return;
    
    const year1 = parseInt(document.getElementById('compare-year-1').value);
    const year2 = parseInt(document.getElementById('compare-year-2').value);
    
    if (year1 === year2) {
        alert('Please select different years to compare');
        return;
    }
    
    const rules1 = rulesData.rules.filter(r => r.calendarYear === year1);
    const rules2 = rulesData.rules.filter(r => r.calendarYear === year2);
    
    const resultsContainer = document.getElementById('comparison-results');
    resultsContainer.innerHTML = `
        <h3>Comparing CY ${year1} vs CY ${year2}</h3>
        <div class="comparison-grid">
            <div class="comparison-column">
                <h4>Calendar Year ${year1}</h4>
                ${rules1.length > 0 ? rules1.map(rule => `
                    <div class="comparison-rule">
                        <div class="rule-type-badge ${rule.type}">${getRuleTypeLabel(rule.type)}</div>
                        <strong>${rule.title}</strong>
                        <ul class="compact-changes">
                            ${rule.keyChanges.map(c => `<li>${c.category}</li>`).join('')}
                        </ul>
                    </div>
                `).join('') : '<p>No rules found for this year</p>'}
            </div>
            <div class="comparison-column">
                <h4>Calendar Year ${year2}</h4>
                ${rules2.length > 0 ? rules2.map(rule => `
                    <div class="comparison-rule">
                        <div class="rule-type-badge ${rule.type}">${getRuleTypeLabel(rule.type)}</div>
                        <strong>${rule.title}</strong>
                        <ul class="compact-changes">
                            ${rule.keyChanges.map(c => `<li>${c.category}</li>`).join('')}
                        </ul>
                    </div>
                `).join('') : '<p>No rules found for this year</p>'}
            </div>
        </div>
        
        <div class="comparison-analysis">
            <h4>Key Differences</h4>
            ${generateComparisonAnalysis(rules1, rules2, year1, year2)}
        </div>
    `;
}

// Generate comparison analysis
function generateComparisonAnalysis(rules1, rules2, year1, year2) {
    const categories1 = new Set();
    const categories2 = new Set();
    
    rules1.forEach(rule => {
        rule.keyChanges.forEach(change => categories1.add(change.category));
    });
    
    rules2.forEach(rule => {
        rule.keyChanges.forEach(change => categories2.add(change.category));
    });
    
    const newCategories = [...categories2].filter(c => !categories1.has(c));
    const removedCategories = [...categories1].filter(c => !categories2.has(c));
    const continuingCategories = [...categories1].filter(c => categories2.has(c));
    
    let analysis = '<ul class="analysis-list">';
    
    if (newCategories.length > 0) {
        analysis += `<li><strong>New Focus Areas in ${year2}:</strong> ${newCategories.join(', ')}</li>`;
    }
    
    if (removedCategories.length > 0) {
        analysis += `<li><strong>No Longer Featured in ${year2}:</strong> ${removedCategories.join(', ')}</li>`;
    }
    
    if (continuingCategories.length > 0) {
        analysis += `<li><strong>Continuing Areas:</strong> ${continuingCategories.join(', ')}</li>`;
    }
    
    analysis += `<li><strong>Total Rule Count:</strong> ${year1} had ${rules1.length} rules, ${year2} has ${rules2.length} rules</li>`;
    
    analysis += '</ul>';
    
    return analysis;
}
