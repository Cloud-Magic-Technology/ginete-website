# Ginete Healthcare Consulting Group Website

A modern, professional 5-page website for Ginete Healthcare Consulting Group, featuring healthcare compliance services, resources, and industry news aggregation.

## 🌟 Features

- **5 Professional Pages**: Home, Services, About, Resources, Contact
- **SEO Optimized**: Meta tags, semantic HTML, clean structure
- **Responsive Design**: Mobile-first design that looks great on all devices
- **Gated Resources**: Email capture for eBook downloads
- **News Aggregation**: Automatic scraping of healthcare compliance news from HHS, CMS, HIPAA Journal
- **Google Calendar Integration**: Schedule consultations directly
- **Contact Form**: Direct email delivery to hello@ginete.co
- **Modern UI/UX**: Clean, professional healthcare-appropriate design

## 📁 Project Structure

```
ginete-website/
├── index.html              # Home page
├── services.html           # Services page
├── about.html              # About us page
├── resources.html          # Resources & news page
├── contact.html            # Contact page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── main.js            # Core functionality
│   ├── resources.js       # Resource downloads & news
│   └── calendar.js        # Google Calendar integration
├── netlify/
│   └── functions/
│       ├── send-contact.js    # Contact form handler
│       ├── gate-resource.js   # Resource download handler
│       └── scrape-news.js     # News aggregation
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## 🚀 Deployment Instructions

### Option 1: Deploy to Netlify (Recommended)

1. **Prerequisites**:
   - Create a GitHub account (if you don't have one)
   - Create a Netlify account (free): https://www.netlify.com

2. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy to Netlify**:
   - Log in to Netlify
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Configure build settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Click "Deploy site"

4. **Configure Environment Variables**:
   Go to Site settings → Environment variables and add:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

5. **Set Custom Domain**:
   - Go to Site settings → Domain management
   - Add custom domain: `ginete.co`
   - Follow Netlify's DNS configuration instructions

### Option 2: Deploy to AWS Lightsail

1. **Create Lightsail Instance**:
   - Choose "OS Only" → Ubuntu 22.04 LTS
   - Select appropriate plan ($5/month recommended)

2. **SSH into Instance and Install Dependencies**:
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm nginx
   ```

3. **Upload Website Files**:
   ```bash
   scp -r * ubuntu@YOUR_INSTANCE_IP:/home/ubuntu/ginete-website/
   ```

4. **Install Node Dependencies**:
   ```bash
   cd /home/ubuntu/ginete-website
   npm install
   ```

5. **Configure Nginx**:
   ```bash
   sudo nano /etc/nginx/sites-available/ginete
   ```
   
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name ginete.co www.ginete.co;
       root /home/ubuntu/ginete-website;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }

       location /.netlify/functions/ {
           proxy_pass http://localhost:8888;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable Site and Restart Nginx**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ginete /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Set Up SSL with Let's Encrypt**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d ginete.co -d www.ginete.co
   ```

## 🔧 Configuration

### Google Calendar Integration

1. **Set Up Google Workspace Calendar**:
   - Go to Google Calendar
   - Create an "Appointment schedule"
   - Configure availability and booking settings
   - Copy the scheduling link

2. **Update calendar.js**:
   - Open `js/calendar.js`
   - Replace `YOUR_SCHEDULE_ID` with your actual schedule ID
   - The link format: `https://calendar.google.com/calendar/appointments/schedules/[SCHEDULE_ID]`

### Email Configuration

For Gmail:
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use these credentials in environment variables

For Other SMTP Providers:
- Update SMTP_HOST and SMTP_PORT accordingly
- Ensure your SMTP provider allows application access

### News Sources

The news scraper pulls from:
- **HHS.gov**: HIPAA and OCR updates
- **CMS.gov**: Medicare/Medicaid regulations
- **HIPAA Journal**: Healthcare compliance news
- **Joint Commission**: Accreditation updates (placeholder)

To add more sources, edit `netlify/functions/scrape-news.js`

## 📧 Email Setup for Contact & Resources

### Using Gmail

1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other"
   - Copy the generated password

4. Add to Netlify Environment Variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=hello@ginete.co
   SMTP_PASS=[your-app-password]
   ```

### Using SendGrid (Alternative)

1. Sign up at sendgrid.com
2. Create API key
3. Update environment variables:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=[your-sendgrid-api-key]
   ```

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #00a896;
    /* ... more colors */
}
```

### Content
- **Team Member**: Update Jenny Terry's bio in `about.html` with actual LinkedIn info
- **Services**: Customize service descriptions in `services.html`
- **Resources**: Add actual eBook PDF links in `netlify/functions/gate-resource.js`

### Logo
Replace the text logo with an image:
```html
<a href="index.html" class="logo">
    <img src="path/to/logo.png" alt="Ginete Healthcare Consulting Group">
</a>
```

## 📱 Testing

### Local Development
```bash
npm install netlify-cli -g
netlify dev
```

Visit: http://localhost:8888

### Test Forms
1. Fill out contact form
2. Test resource downloads
3. Verify emails are sent
4. Check news aggregation

## 🔒 Security Checklist

- [x] HTTPS enabled
- [x] Security headers configured
- [x] Form validation implemented
- [x] Environment variables for sensitive data
- [x] CORS properly configured
- [x] Input sanitization on forms

## 📊 SEO Checklist

- [x] Meta descriptions on all pages
- [x] Proper heading hierarchy (H1, H2, H3)
- [x] Alt text for images
- [x] Semantic HTML5 markup
- [x] Mobile responsive
- [x] Fast loading times
- [x] XML sitemap (can be generated)
- [ ] Submit to Google Search Console
- [ ] Set up Google Analytics

## 🐛 Troubleshooting

### Forms Not Working
- Check environment variables are set in Netlify
- Verify SMTP credentials are correct
- Check browser console for errors

### News Not Loading
- Verify RSS feeds are accessible
- Check function logs in Netlify
- Ensure dependencies are installed

### Calendar Not Showing
- Verify Google Calendar schedule link
- Check calendar.js configuration
- Ensure public sharing is enabled

## 📞 Support

For questions or issues:
- Email: hello@ginete.co
- Website: https://ginete.co

## 📝 License

Copyright © 2025 Ginete Healthcare Consulting Group. All rights reserved.

---

**Next Steps:**
1. Deploy to Netlify
2. Configure domain (ginete.co)
3. Set up Google Calendar scheduling
4. Configure email (SMTP settings)
5. Add actual eBook PDFs
6. Update Jenny Terry's bio with LinkedIn info
7. Test all functionality
8. Submit to Google Search Console
9. Set up Google Analytics
