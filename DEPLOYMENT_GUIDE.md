# JSEdumart Bookshop - Complete Deployment Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [Production Deployment](#production-deployment)
3. [Environment Setup](#environment-setup)
4. [Vercel Configuration](#vercel-configuration)
5. [DNS & Custom Domain](#dns--custom-domain)
6. [Monitoring & Health Checks](#monitoring--health-checks)
7. [Troubleshooting](#troubleshooting)
8. [Rollback Procedure](#rollback-procedure)

---

## Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm package manager
- GitHub account with access to repository
- Vercel account connected to GitHub
- Supabase project with database
- M-Pesa credentials

### Local Setup
```bash
# Clone repository
git clone https://github.com/ganywez/jse-dumart-bookshop.git
cd jse-dumart-bookshop

# Install dependencies
pnpm install

# Create .env.local file with local credentials
cp .env.example .env.local
# Edit .env.local with your local values

# Run development server
pnpm run dev
# Visit http://localhost:3000
```

### Verify Build Locally
```bash
# Build application (mimics Vercel build)
pnpm run build

# Start production server
pnpm start
# Should be accessible at http://localhost:3000
```

---

## Production Deployment

### Step 1: Set Environment Variables in Vercel

**Via Vercel Dashboard:**
```
1. Go to https://vercel.com/dashboard
2. Select project: jse-dumart-bookshop
3. Settings → Environment Variables
4. Add the following variables for Production:
```

**Required Variables:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_SECRET_KEY
SUPABASE_JWT_SECRET
POSTGRES_URL
POSTGRES_URL_NON_POOLING
MPESA_CONSUMER_KEY
MPESA_CONSUMER_SECRET
MPESA_SHORTCODE
MPESA_PASSKEY
```

**Via CLI:**
```bash
# If using Vercel CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... repeat for all variables
```

### Step 2: Deploy to Vercel

**Option A: Automatic (Recommended)**
```
1. Push to main branch: git push origin main
2. Vercel automatically detects and deploys
3. Wait for "Building" → "Ready" status
4. Check deployment logs if any issues
```

**Option B: Manual Redeploy**
```
1. Vercel Dashboard → Deployments
2. Find latest commit in list
3. Click "Redeploy" button
4. Monitor build logs
5. Wait for green checkmark
```

**Option C: Vercel CLI**
```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Check deployment status
vercel inspect
```

### Step 3: Verify Deployment

**Check Status:**
```bash
# Deployment URL should show green checkmark
https://vercel.com/dashboard/projects/jse-dumart-bookshop

# Access your site
https://jse-dumart-bookshop.vercel.app
```

**Verify Core Functionality:**
- [ ] Homepage loads
- [ ] Products display
- [ ] Sign-in/Sign-up works
- [ ] Shop page accessible
- [ ] Checkout works
- [ ] Admin dashboard loads

---

## Environment Setup

### Supabase Database

**1. Create Supabase Project**
```
1. Go to https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Save these variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - POSTGRES_URL
   - POSTGRES_URL_NON_POOLING
```

**2. Run Database Migrations**
```bash
# If using Supabase migrations
pnpm supabase db push

# Or manually run SQL in Supabase dashboard:
# - Create tables for products, users, orders
# - Set up authentication
# - Enable RLS policies
```

**3. Seed Initial Data**
```bash
# If seed script exists
pnpm run seed

# Or manually insert products via Supabase dashboard
```

### M-Pesa Integration

**Get Credentials:**
1. Register with Safaricom
2. Get consumer key and secret
3. Get shortcode and passkey
4. Set in Vercel environment variables:
   - MPESA_CONSUMER_KEY
   - MPESA_CONSUMER_SECRET
   - MPESA_SHORTCODE
   - MPESA_PASSKEY

**Test M-Pesa:**
```bash
# Local testing with dummy credentials
# Use test M-Pesa endpoints
# See: docs/MPESA_INTEGRATION.md
```

---

## Vercel Configuration

### Build Settings
```
Framework: Next.js
Build Command: pnpm run build
Output Directory: .next
Install Command: pnpm install
Node Version: 18.x (or higher)
```

### Regions
Default: Washington D.C., USA (iad1)

Vercel automatically replicates to global edges for low latency.

### Functions (Serverless)
- Max duration: 60 seconds per function
- Memory: 1024MB default
- Cold starts handled automatically

### Analytics
Monitor in Vercel Dashboard:
- Real User Monitoring (RUM)
- Web Vitals
- Performance metrics
- Error tracking

---

## DNS & Custom Domain

### Set Custom Domain

**1. In Vercel Dashboard:**
```
Settings → Domains
Add Domain: jsdumart.com
```

**2. Update Domain Registrar Nameservers:**

Replace current nameservers with Vercel's:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

**3. Wait for DNS Propagation:**
```bash
# Check propagation
nslookup jsdumart.com
dig jsdumart.com

# Use online tools:
# - https://mxtoolbox.com/
# - https://whatsmydns.net/
```

### DNS Records (If Manual Setup Needed)

```
Type: CNAME
Name: jsdumart.com
Value: cname.vercel-dns.com

Type: CNAME (for www)
Name: www.jsdumart.com
Value: cname.vercel-dns.com
```

---

## Monitoring & Health Checks

### Health Check Endpoint
```bash
# Check deployment health
curl https://jse-dumart-bookshop.vercel.app/api/health

# Response:
{
  "status": "healthy",
  "message": "All systems operational",
  "responseTime": "45ms",
  "database": "connected",
  "productsCount": 16,
  "timestamp": "2024-03-10T12:00:00.000Z"
}
```

### Set Up Uptime Monitoring

**Option 1: Vercel Monitoring**
```
1. Vercel Dashboard → Settings → Monitoring
2. Enable Email Notifications
3. Set thresholds for alerts
```

**Option 2: Third-Party Services**
- https://uptime.com/ - Free uptime monitoring
- https://uptimerobot.com/ - URL monitoring
- https://www.pingdom.com/ - Performance monitoring

### View Logs

**Deployment Logs:**
```
Vercel Dashboard → Deployments → [Select deployment] → Logs
```

**Runtime Logs:**
```
Vercel Dashboard → Deployments → [Select deployment] → Function Logs
```

**View in Real-Time:**
```bash
vercel logs --prod
```

### Performance Metrics

**Web Vitals (in Vercel Dashboard):**
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

**Targets:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

## Troubleshooting

### Build Fails with Red Status

**Check Logs:**
```
1. Click failed deployment
2. Scroll to "Build" section
3. Look for error message
4. Common issues:
   - Missing env variables
   - TypeScript errors
   - Dependency conflicts
```

**Fix and Redeploy:**
```bash
# Fix locally
# Test with: pnpm run build

# Commit and push
git add .
git commit -m "fix: [describe fix]"
git push origin main

# Vercel automatically redeploys
```

### Deployment Shows Green But URL Doesn't Load

**DNS Issue:**
```bash
# Check DNS resolution
nslookup jse-dumart-bookshop.vercel.app

# Should resolve to Vercel IP
# If not, update nameservers
```

**Cache Issue:**
```bash
# Clear browser cache
# Hard refresh: Ctrl+Shift+Delete

# Clear DNS cache
# Windows: ipconfig /flushdns
# macOS: sudo dscacheutil -flushcache
```

### Blank Page or JavaScript Errors

**Check Console:**
```
1. Open DevTools: F12
2. Check Console tab for errors
3. Look for hydration mismatch errors
4. Check Network tab for failed requests
```

**Common Fixes:**
```bash
# Rebuild locally to verify
pnpm run build

# Clear cache
rm -rf .next

# Rebuild and test
pnpm start
```

### Database Connection Error

**Verify Credentials:**
```bash
# Check env variables are set
echo $POSTGRES_URL
echo $NEXT_PUBLIC_SUPABASE_URL

# Test connection
psql $POSTGRES_URL -c "SELECT 1;"
```

**Check Supabase Status:**
- https://status.supabase.com/
- Verify database is running
- Check for ongoing maintenance

### Slow Performance

**Check Metrics:**
```
Vercel Dashboard → Analytics → Web Vitals
Look for:
- High LCP (Largest Contentful Paint)
- High FID (First Input Delay)
- High CLS (Cumulative Layout Shift)
```

**Optimization Steps:**
1. Optimize images (use next/image)
2. Split large bundles
3. Enable caching headers
4. Optimize database queries
5. Remove unused dependencies

---

## Rollback Procedure

If deployment has critical issues:

### Step 1: Immediate Rollback
```
1. Vercel Dashboard → Deployments
2. Find last green deployment
3. Click "Promote to Production"
4. Site reverts to working version
```

### Step 2: Investigate Issue
```bash
# Review recent changes
git log --oneline -5

# Check build logs
# Identify which change caused issue
```

### Step 3: Fix Locally
```bash
# Create fix branch
git checkout -b fix/[issue-name]

# Make corrections
# Test thoroughly: pnpm run build && pnpm start

# Commit with detailed message
git commit -m "fix: [detailed description of fix]"

# Push to GitHub
git push origin fix/[issue-name]

# Create Pull Request for review
```

### Step 4: Redeploy
```bash
# After PR approved and merged
git push origin main

# Vercel automatically deploys
# Monitor deployment logs
```

---

## Deployment Checklist (Before Every Push)

- [ ] Run tests: `pnpm test` (if tests exist)
- [ ] Build locally: `pnpm run build` (should succeed)
- [ ] Start production build: `pnpm start` (should work)
- [ ] No TypeScript errors: `pnpm tsc --noEmit`
- [ ] No console errors in dev: `pnpm run dev`
- [ ] Test critical pages locally
- [ ] Clear .next cache: `rm -rf .next`
- [ ] Verify environment variables in Vercel
- [ ] Commit message is descriptive
- [ ] Push to main branch

## Post-Deployment Checklist

- [ ] Deployment status is green ✓
- [ ] Website is accessible
- [ ] No JavaScript errors in console
- [ ] All pages load correctly
- [ ] Database is responding
- [ ] Images load properly
- [ ] Forms submit successfully
- [ ] Admin functions work
- [ ] Performance is acceptable (< 3s load time)

---

## Emergency Contacts & Resources

**Vercel Support:**
- Dashboard → Help → Contact Support
- Status: https://www.vercel-status.com/

**Supabase Support:**
- Dashboard → Help → Contact Support
- Status: https://status.supabase.com/

**Documentation:**
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs

---

## Additional Resources

- [VERCEL_TROUBLESHOOTING_GUIDE.md](./VERCEL_TROUBLESHOOTING_GUIDE.md) - Detailed troubleshooting
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Verification checklist
- [next.config.js](./next.config.js) - Vercel-optimized Next.js config
- [vercel.json](./vercel.json) - Vercel deployment settings

---

**Last Updated:** March 10, 2024
**Version:** 1.0
**Maintained By:** JSEdumart Team
