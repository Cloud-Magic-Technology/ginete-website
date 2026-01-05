# Quick Deployment Guide - Ginete Website

## 🚀 Fastest Path to Production (Netlify - Recommended)

### Step 1: Install Prerequisites
```bash
# Install Node.js if you haven't already
# Download from: https://nodejs.org/

# Install Git if you haven't already
# Download from: https://git-scm.com/
```

### Step 2: Upload to GitHub
```bash
cd ginete-website
git init
git add .
git commit -m "Initial Ginete website"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/ginete-website.git
git push -u origin main
```

### Step 3: Deploy to Netlify (5 minutes)

1. **Sign Up**: Go to https://www.netlify.com (free tier is perfect)

2. **Import Project**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your `ginete-website` repository
   - Click "Deploy site"

3. **Configure Environment Variables** (IMPORTANT):
   - Go to: Site settings → Environment variables
   - Add these variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=hello@ginete.co
   SMTP_PASS=[Your Gmail App Password - see below]
   ```

4. **Get Gmail App Password**:
   - Go to Google Account → Security
   - Enable 2-Factor Authentication if not already
   - Go to "App passwords"
   - Generate password for "Mail" / "Other"
   - Copy and use as SMTP_PASS

5. **Set Custom Domain**:
   - In Netlify: Site settings → Domain management
   - Click "Add custom domain"
   - Enter: `ginete.co`
   - Follow DNS instructions to point domain to Netlify

### Step 4: Configure Google Calendar

1. Go to Google Calendar: https://calendar.google.com
2. Click gear icon → Settings
3. Click "Create" → "Appointment schedule"
4. Set your availability (e.g., Mon-Fri 9am-5pm)
5. Configure booking settings
6. Copy the scheduling link
7. Edit `js/calendar.js` in your repository
8. Replace `YOUR_SCHEDULE_ID` with your actual ID from the link
9. Commit and push changes

### Step 5: Test Everything

Visit your site and test:
- ✅ Contact form submission
- ✅ Resource download (eBook gating)
- ✅ News aggregation loading
- ✅ Calendar scheduling link
- ✅ All page navigation

## 🎯 Essential Customizations

### 1. Update Team Member (Priority: HIGH)
Edit `about.html`:
- Add Jenny Terry's LinkedIn URL
- Update bio with real information
- Add professional photo if available

### 2. Add Real eBook PDFs (Priority: HIGH)
Upload your eBook PDFs and update links in:
`netlify/functions/gate-resource.js`

### 3. Update Any Placeholder Content
Search for "placeholder" in all files and update with real content

## 📧 Email Testing Checklist

After deployment, test:
1. Contact form → Should receive email at hello@ginete.co
2. Resource download → User should receive eBook email
3. Check spam folders if emails aren't arriving

## 🔧 Troubleshooting

**Forms not working?**
- Check environment variables are saved in Netlify
- Verify Gmail App Password is correct
- Check Netlify function logs for errors

**News not loading?**
- Check browser console for errors
- Verify internet connection
- RSS feeds may be temporarily unavailable

**Domain not working?**
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct in domain registrar
- Use Netlify's DNS checker tool

## 📞 Need Help?

Contact Chris at Cloud Magic Technology Group for support.

---

**Estimated Total Time to Deploy: 30-60 minutes**

That includes:
- 10 min: GitHub setup and push
- 5 min: Netlify deployment
- 10 min: Environment variables
- 10 min: Custom domain setup
- 5-10 min: Google Calendar setup
- 10-15 min: Testing and verification
