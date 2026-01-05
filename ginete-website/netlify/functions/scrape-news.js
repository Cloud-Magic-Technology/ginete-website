// Netlify Function for Scraping Healthcare Compliance News
const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        // Define news sources with RSS feeds
        const sources = [
            {
                name: 'CMS.gov',
                url: 'https://www.cms.gov/newsroom/press-releases/rss.xml',
                filter: []  // Include all CMS news
            },
            {
                name: 'DHCS - California',
                url: 'https://www.dhcs.ca.gov/RSS/Pages/DHCS-News-RSS.aspx',
                filter: ['Medi-Cal', 'managed care', 'health plan', 'compliance']
            },
            {
                name: 'NCQA',
                url: 'https://www.ncqa.org/news/feed/',
                filter: []  // Include all NCQA news
            }
        ];
        
        // Fetch and parse all feeds
        const allArticles = [];
        
        for (const source of sources) {
            try {
                const feed = await parser.parseURL(source.url);
                
                feed.items.slice(0, 5).forEach(item => {
                    // Filter based on keywords if specified
                    if (source.filter.length === 0 || 
                        source.filter.some(keyword => 
                            (item.title + item.contentSnippet).toLowerCase().includes(keyword.toLowerCase())
                        )) {
                        
                        allArticles.push({
                            source: source.name,
                            title: item.title,
                            description: item.contentSnippet ? 
                                item.contentSnippet.substring(0, 150) + '...' : 
                                'Click to read more',
                            url: item.link,
                            date: item.pubDate || item.isoDate || new Date().toISOString()
                        });
                    }
                });
            } catch (sourceError) {
                console.error(`Error fetching ${source.name}:`, sourceError.message);
                // Continue with other sources
            }
        }
        
        // Add DMHC news (manual fetch since they may not have RSS)
        try {
            // DMHC doesn't have a standard RSS feed, so we'll add recent announcements
            // In production, you may need to scrape their website or use their API
            const dmhcNews = [
                {
                    source: 'DMHC - California',
                    title: 'Latest DMHC Regulatory Updates',
                    description: 'Check the Department of Managed Health Care website for the latest regulatory guidance and enforcement actions...',
                    url: 'https://www.dmhc.ca.gov/AbouttheDMHC/NewsRoom.aspx',
                    date: new Date().toISOString()
                }
            ];
            allArticles.push(...dmhcNews);
        } catch (dmhcError) {
            console.error('Error fetching DMHC news:', dmhcError.message);
        }
        
        // Sort by date (most recent first)
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Return top 12 articles
        const topArticles = allArticles.slice(0, 12);
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            },
            body: JSON.stringify({
                success: true,
                articles: topArticles,
                updated: new Date().toISOString()
            })
        };
        
    } catch (error) {
        console.error('Error scraping news:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to fetch news',
                details: error.message,
                articles: []  // Return empty array so the site doesn't break
            })
        };
    }
};

/*
 * NEWS SOURCES INFORMATION:
 * 
 * 1. CMS.gov (Centers for Medicare & Medicaid Services)
 *    - Medicare and Medicaid updates
 *    - Quality reporting and regulatory changes
 *    - Medicare Advantage and Part D updates
 *    - RSS: https://www.cms.gov/newsroom/press-releases/rss.xml
 * 
 * 2. DHCS (California Department of Health Care Services)
 *    - Medi-Cal managed care updates
 *    - California-specific healthcare regulations
 *    - Provider and plan updates
 *    - RSS: https://www.dhcs.ca.gov/RSS/Pages/DHCS-News-RSS.aspx
 * 
 * 3. DMHC (California Department of Managed Health Care)
 *    - Health plan licensing and surveys
 *    - Enforcement actions
 *    - Regulatory guidance
 *    - Website: https://www.dmhc.ca.gov/AbouttheDMHC/NewsRoom.aspx
 *    - Note: DMHC doesn't have a standard RSS feed; may require web scraping
 * 
 * 4. NCQA (National Committee for Quality Assurance)
 *    - Health plan accreditation updates
 *    - HEDIS measure changes
 *    - Quality improvement news
 *    - RSS: https://www.ncqa.org/news/feed/
 * 
 * DEPLOYMENT NOTES:
 * - This function caches results for 1 hour to reduce load
 * - Add axios and rss-parser to dependencies: npm install axios rss-parser
 * - Consider implementing background scheduled updates for better performance
 * - DMHC may require custom scraping logic or manual updates
 */
