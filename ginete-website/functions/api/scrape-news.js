// Cloudflare Pages Function for Healthcare News RSS Aggregation
export async function onRequestGet(context) {
    try {
        const sources = [
            {
                name: 'CMS.gov',
                url: 'https://www.cms.gov/newsroom/press-releases/rss.xml',
                filter: []
            },
            {
                name: 'DHCS - California',
                url: 'https://www.dhcs.ca.gov/RSS/Pages/DHCS-News-RSS.aspx',
                filter: ['medi-cal', 'managed care', 'health plan', 'compliance']
            },
            {
                name: 'NCQA',
                url: 'https://www.ncqa.org/news/feed/',
                filter: []
            }
        ];

        const allArticles = [];

        const fetchPromises = sources.map(async (source) => {
            try {
                const response = await fetch(source.url, {
                    headers: { 'User-Agent': 'Ginete Healthcare News Aggregator' }
                });
                if (!response.ok) return;

                const xml = await response.text();
                const items = parseRSS(xml);

                items.slice(0, 5).forEach(item => {
                    if (source.filter.length === 0 ||
                        source.filter.some(keyword =>
                            (item.title + ' ' + item.description).toLowerCase().includes(keyword)
                        )) {
                        allArticles.push({
                            source: source.name,
                            title: item.title,
                            description: item.description ?
                                item.description.substring(0, 150) + '...' :
                                'Click to read more',
                            url: item.link,
                            date: item.pubDate || new Date().toISOString()
                        });
                    }
                });
            } catch (e) {
                // Continue with other sources
            }
        });

        await Promise.all(fetchPromises);

        // Add DMHC placeholder
        allArticles.push({
            source: 'DMHC - California',
            title: 'Latest DMHC Regulatory Updates',
            description: 'Check the Department of Managed Health Care website for the latest regulatory guidance and enforcement actions...',
            url: 'https://www.dmhc.ca.gov/AbouttheDMHC/NewsRoom.aspx',
            date: new Date().toISOString()
        });

        // Sort by date
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

        return new Response(JSON.stringify({
            success: true,
            articles: allArticles.slice(0, 12),
            updated: new Date().toISOString()
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600'
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: 'Failed to fetch news',
            details: error.message,
            articles: []
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Simple RSS/XML parser for Workers (no Node.js dependencies)
function parseRSS(xml) {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
        const itemXml = match[1];
        items.push({
            title: extractTag(itemXml, 'title'),
            link: extractTag(itemXml, 'link'),
            description: stripHtml(extractTag(itemXml, 'description')),
            pubDate: extractTag(itemXml, 'pubDate') || extractTag(itemXml, 'dc:date')
        });
    }

    return items;
}

function extractTag(xml, tag) {
    const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
    const match = regex.exec(xml);
    if (match) {
        return (match[1] || match[2] || '').trim();
    }
    return '';
}

function stripHtml(str) {
    return str.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}
