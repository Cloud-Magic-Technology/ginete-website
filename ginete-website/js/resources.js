// Resource download modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('resource-modal');
    const closeBtn = document.querySelector('.modal-close');
    const resourceButtons = document.querySelectorAll('.resource-download');
    const resourceForm = document.getElementById('resource-form');
    const resourceId = document.getElementById('resource-id');
    
    // Open modal when resource download button is clicked
    resourceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resource = this.getAttribute('data-resource');
            resourceId.value = resource;
            modal.classList.add('active');
            document.getElementById('resource-success').style.display = 'none';
            resourceForm.style.display = 'block';
            resourceForm.reset();
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Handle resource form submission
    resourceForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch('/api/gate-resource', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                resourceForm.style.display = 'none';
                document.getElementById('resource-success').style.display = 'block';
                
                // Close modal after 3 seconds
                setTimeout(() => {
                    modal.classList.remove('active');
                }, 3000);
            } else {
                throw new Error('Failed to process request');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error processing your request. Please try again or contact us directly at hello@ginete.co');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
    
    // Load news articles
    loadNews();
});

async function loadNews() {
    const newsContainer = document.getElementById('news-container');
    const newsLoading = document.getElementById('news-loading');
    const newsError = document.getElementById('news-error');
    
    try {
        const response = await fetch('/api/scrape-news');
        
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        newsLoading.style.display = 'none';
        
        if (data.articles && data.articles.length > 0) {
            newsContainer.style.display = 'grid';
            renderNews(data.articles);
        } else {
            newsError.querySelector('p').textContent = 'No news articles available at this time.';
            newsError.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading news:', error);
        newsLoading.style.display = 'none';
        newsError.style.display = 'block';
    }
}

function renderNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        
        newsCard.innerHTML = `
            <div class="news-source">${article.source}</div>
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <div class="news-meta">
                    <span class="news-date">${formatDate(article.date)}</span>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-link">Read More →</a>
                </div>
            </div>
        `;
        
        newsContainer.appendChild(newsCard);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
}
