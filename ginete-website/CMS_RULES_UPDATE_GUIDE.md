# CMS Final Rules - Annual Update Guide

## Overview
This guide explains how to update the CMS Final Rules tracker each year as new rules are published.

## When to Update

### Typical CMS Final Rule Release Schedule:
- **Medicare Advantage & Part D**: Early April (for following calendar year)
- **Physician Fee Schedule (PFS)**: Early November (for following calendar year)
- **Outpatient Prospective Payment (OPPS)**: Early November (for following calendar year)
- **Inpatient Prospective Payment (IPPS)**: August (for following fiscal year)
- **Home Health**: November (for following calendar year)

## How to Update

### Option 1: Manual Update (Recommended for Annual Updates)

1. **Open the data file**: `data/cms-rules.json`

2. **Add new rule entry** following this template:

```json
{
  "id": "ma-part-d-2027",
  "type": "ma-part-d",
  "title": "Medicare Advantage and Part D Final Rule",
  "calendarYear": 2027,
  "releaseDate": "2026-04-01",
  "implementationDate": "2027-01-01",
  "status": "Published",
  "cmsLink": "https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-and-part-d-final-rule",
  "keyChanges": [
    {
      "category": "Rate Updates",
      "description": "[Your description]",
      "impact": "high"
    },
    {
      "category": "Quality & Stars",
      "description": "[Your description]",
      "impact": "high"
    }
  ],
  "summary": "[Brief summary of the rule]"
}
```

3. **Field Descriptions:**

- **id**: Unique identifier (format: `type-year`, e.g., `ma-part-d-2027`)
- **type**: One of: `ma-part-d`, `pfs`, `opps`, `ipps`, `home-health`
- **title**: Official rule name
- **calendarYear**: Year the rule takes effect (YYYY)
- **releaseDate**: Date rule was published (YYYY-MM-DD)
- **implementationDate**: Date rule becomes effective (YYYY-MM-DD)
- **status**: `Proposed`, `Published`, or `Active`
- **cmsLink**: Direct link to CMS fact sheet or rule page
- **keyChanges**: Array of change objects
  - **category**: Type of change (see categories below)
  - **description**: Clear description of the change
  - **impact**: `high`, `medium`, or `low`
- **summary**: 1-2 sentence overview

4. **Available Categories** (add to array if needed):
   - Rate Updates
   - Quality & Stars
   - Part D Benefits
   - Marketing & Enrollment
   - Network Adequacy
   - Prior Authorization
   - Supplemental Benefits
   - Broker Compensation
   - Conversion Factor
   - **Interoperability & API** (focus area - replaces MIPS/Hospital Quality)
   - Telehealth
   - E/M Coding
   - Payment Rates
   - ASC Rates
   - 340B Program
   - Care Management
   - Quality Programs (generic hospital/plan quality, not MIPS)
   - Wage Index
   - Case-Mix Weights

**Note on Interoperability & API**: This is a critical category covering:
- FHIR (Fast Healthcare Interoperability Resources) standards
- Patient Access APIs
- Provider Directory APIs
- Prior Authorization APIs
- ADT (Admission/Discharge/Transfer) notifications
- USCDI (US Core Data for Interoperability) versions
- Electronic health information exchange requirements
- Real-time benefit verification

5. **Update year filters**: 
   - Open `cms-final-rules.html`
   - Add new year to both filter dropdowns:
   ```html
   <option value="2027">2027</option>
   ```

### Option 2: Automated Update (Advanced)

Create a Node.js script to fetch and parse CMS rules automatically:

```javascript
// scripts/update-cms-rules.js
const axios = require('axios');
const fs = require('fs');

async function updateRules() {
  // Fetch from CMS API or RSS feed
  // Parse the data
  // Update cms-rules.json
  // Details would depend on CMS data availability
}
```

## Step-by-Step Annual Process

### 1. Monitor CMS Announcements
- Subscribe to CMS email updates
- Monitor CMS.gov newsroom
- Check Federal Register

### 2. When New Rule is Published

**Immediate Actions:**
1. Download the fact sheet and final rule
2. Read the executive summary
3. Identify 4-6 key changes with impact levels

**Within 24-48 Hours:**
1. Update `cms-rules.json` with new entry
2. Test locally: Open `cms-final-rules.html` in browser
3. Verify all data displays correctly
4. Check comparison functionality

**Within 1 Week:**
1. Create detailed analysis content
2. Consider adding a blog post
3. Email clients about the new rule
4. Update marketing materials if needed

### 3. Update Status of Previous Rules

When a new year's rule is published, update previous year:
```json
{
  "id": "ma-part-d-2026",
  "status": "Active",  // Change from "Published" to "Active"
  ...
}
```

### 4. Archive Old Rules

After 3-4 years, consider:
- Moving old rules to separate archive file
- Creating a "View Archive" link
- Keeping focus on recent/current rules

## Best Practices

### Content Quality
- ✅ Use clear, plain language
- ✅ Focus on practical impact to health plans
- ✅ Include specific numbers/percentages when available
- ✅ Link to official CMS resources
- ❌ Avoid jargon without explanation
- ❌ Don't editorialize - stay neutral

### Impact Levels
- **High**: Significant operational or financial impact
- **Medium**: Moderate changes requiring some adjustment
- **Low**: Minor updates or clarifications

### Categories
- Use existing categories when possible
- Add new categories to the `categories` array if needed
- Keep category names consistent year-over-year

## Testing Checklist

Before deploying updates:

- [ ] Rule displays in correct year section
- [ ] All badges show correct colors
- [ ] CMS.gov link works
- [ ] Detail modal opens and shows all information
- [ ] Year filter includes new year
- [ ] Type filter works correctly
- [ ] Comparison tool includes new year
- [ ] Mobile view displays properly
- [ ] No JavaScript errors in console

## Troubleshooting

### Rule Not Appearing
- Check JSON syntax (use JSONLint.com)
- Verify `calendarYear` is correct number
- Clear browser cache
- Check browser console for errors

### Wrong Colors/Styling
- Verify `type` matches one of: ma-part-d, pfs, opps, ipps, home-health
- Check `status` is: Proposed, Published, or Active
- Verify `impact` is: high, medium, or low

### Links Broken
- Ensure `cmsLink` is full URL with https://
- Test link in private/incognito window
- CMS may change URLs - update as needed

## Quick Reference

### File Locations
- **Data**: `/data/cms-rules.json`
- **HTML**: `/cms-final-rules.html`
- **JavaScript**: `/js/cms-rules.js`
- **Styles**: `/css/style.css`

### Rule Types
- `ma-part-d` → Medicare Advantage & Part D
- `pfs` → Physician Fee Schedule
- `opps` → Outpatient Prospective Payment
- `ipps` → Inpatient Prospective Payment
- `home-health` → Home Health

### Status Options
- `Proposed` → Draft/proposed rule
- `Published` → Final rule published
- `Active` → Currently in effect

## Marketing the Updates

When you add new rules:

1. **Social Media**
   - Post on LinkedIn about new rule
   - Link to your tracker page

2. **Email Campaign**
   - Send to client list
   - Highlight key changes
   - Offer consultation

3. **Blog Post**
   - Detailed analysis
   - What it means for clients
   - Action items

4. **Website Banner**
   - Add notification banner for major rules
   - Link to tracker page

## Support

For technical issues:
- Check browser console for errors
- Validate JSON at JSONLint.com
- Review this guide
- Contact development team

For content questions:
- Review CMS fact sheets
- Reference Federal Register
- Consult with compliance experts

---

**Last Updated**: January 2025
**Next Review**: April 2026 (MA/Part D Final Rule season)
