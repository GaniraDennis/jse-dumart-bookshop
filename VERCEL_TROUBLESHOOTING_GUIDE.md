# Vercel Connectivity Troubleshooting Guide

## Overview
This guide provides a comprehensive strategy to diagnose and resolve Vercel deployment connectivity issues for JSEdumart Bookshop.

---

## 1. DIAGNOSTIC CHECKLIST

### 1.1 Immediate Checks (5 minutes)
- [ ] Check if Vercel.com dashboard is accessible
- [ ] Check deployment URL accessibility (e.g., https://jse-dumart-bookshop.vercel.app)
- [ ] Check your internet connection (try ping 8.8.8.8)
- [ ] Clear browser cache and cookies
- [ ] Try accessing from different browser/device
- [ ] Check Vercel status page: https://www.vercel-status.com/

### 1.2 Deployment Status Checks (10 minutes)
- [ ] View deployment logs in Vercel Dashboard
- [ ] Check GitHub Actions build logs
- [ ] Verify environment variables are set correctly
- [ ] Check if deployment failed (red status) or succeeded (green status)
- [ ] Review build output for warnings/errors

---

## 2. ROOT CAUSE ANALYSIS

### 2.1 Deployment Errors
**Symptoms:**
- Build fails with red status in Vercel dashboard
- Error messages in deployment logs
- Application returns 500 error

**Common Causes:**
- Missing environment variables (DATABASE_URL, SUPABASE_URL, etc.)
- TypeScript compilation errors
- Node version incompatibility
- Missing dependencies in package.json
- API route errors causing build failure

**Quick Fix:**
```bash
# Verify environment variables
echo "NEXT_PUBLIC_SUPABASE_URL: $NEXT_PUBLIC_SUPABASE_URL"
echo "SUPABASE_SERVICE_ROLE_KEY: [SET]"

# Check Node version compatibility
node --version  # Should be 18+ for Next.js 16
```

### 2.2 DNS Configuration Issues
**Symptoms:**
- Domain takes too long to resolve
- "Cannot resolve host" error
- Browser shows "ERR_NAME_NOT_RESOLVED"

**Verification Steps:**
```bash
# Check DNS resolution
nslookup jsdumart.com
dig jsdumart.com

# Check Vercel's nameservers
nslookup -type=NS jsdumart.com
# Should show Vercel nameservers like ns1.vercel-dns.com
```

**Expected Output:**
```
jsdumart.com. 900 IN NS ns1.vercel-dns.com.
jsdumart.com. 900 IN NS ns2.vercel-dns.com.
jsdumart.com. 900 IN NS ns3.vercel-dns.com.
jsdumart.com. 900 IN NS ns4.vercel-dns.com.
```

### 2.3 Network/Firewall Issues
**Symptoms:**
- Vercel dashboard loads but deployment URL doesn't
- Connection timeout errors
- "net::ERR_CONNECTION_TIMED_OUT"

**Diagnosis:**
```bash
# Test connectivity to Vercel servers
curl -I https://jse-dumart-bookshop.vercel.app
# Should return 200, 301, or 307

# Check traceroute to Vercel CDN
tracert jse-dumart-bookshop.vercel.app

# Check if port 443 (HTTPS) is open
nc -zv jse-dumart-bookshop.vercel.app 443
```

### 2.4 Service Outage/Rate Limiting
**Symptoms:**
- All Vercel deployments are slow
- 429 Too Many Requests errors
- 503 Service Unavailable errors

**Check:**
- Visit https://www.vercel-status.com/
- Check Vercel Twitter: @vercel
- Check if accessing during maintenance window

---

## 3. STEP-BY-STEP RESOLUTION

### Step 1: Verify Deployment Status
```
1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select project: jse-dumart-bookshop
3. Check "Deployments" tab
4. Look for status: ✓ (green/success) or ✗ (red/failed)
```

**If Failed:**
- Click on failed deployment
- Check "Build Logs" tab
- Look for errors in:
  - Dependencies installation
  - TypeScript compilation
  - Build process
  - Deployment phase

### Step 2: Check and Validate Environment Variables

**Required Environment Variables for JSEdumart:**
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

**Validation:**
```
1. Vercel Dashboard → Settings → Environment Variables
2. Verify each variable has a value
3. Check for typos in variable names
4. Ensure sensitive keys are not in .env.local
```

### Step 3: Rebuild and Redeploy

**Option A: From Vercel Dashboard**
```
1. Go to Deployments tab
2. Click "Redeploy" on latest commit
3. Monitor build logs in real-time
4. Check deployment status
```

**Option B: From GitHub**
```bash
# Push new commit to trigger rebuild
git add .
git commit -m "fix: Trigger Vercel rebuild"
git push origin main
```

### Step 4: Verify DNS Resolution

**For Custom Domain (jsdumart.com):**
```
1. Vercel Dashboard → Settings → Domains
2. Verify domain is added and shows "Active"
3. Check nameservers at registrar match Vercel's:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
   - ns3.vercel-dns.com
   - ns4.vercel-dns.com
4. If different, update nameservers at domain registrar
5. Wait 24-48 hours for DNS propagation (TTL dependent)
```

**Verify with Tools:**
```bash
# Using nslookup
nslookup jsdumart.com

# Using dig
dig jsdumart.com

# Using online tools
https://mxtoolbox.com/
https://whatsmydns.net/
```

### Step 5: Clear Cache and Test Connectivity

**Browser Level:**
```
1. Hard refresh: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. Clear browser cache:
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Preferences → Privacy → Clear Data
3. Try incognito/private browsing mode
```

**DNS Level:**
```bash
# Flush DNS cache
# Windows (as Administrator):
ipconfig /flushdns

# macOS:
sudo dscacheutil -flushcache

# Linux:
sudo systemctl restart systemd-resolved
```

**Network Level:**
```bash
# Restart your router/modem
# Reconnect to WiFi
# Try mobile hotspot to test with different network
```

### Step 6: Test from Multiple Locations

**Online Tools:**
- https://downdetector.com/ - Check if services are down
- https://www.isitdownrightnow.com/ - Test specific URL
- https://tools.pingdom.com/ - Performance monitoring
- https://uptime.com/ - Global server availability

**Test Commands:**
```bash
# Simple connectivity test
ping jse-dumart-bookshop.vercel.app

# Get response headers
curl -I https://jse-dumart-bookshop.vercel.app

# Verbose output with timing
curl -w "\nLookup: %{time_namelookup}\nConnect: %{time_connect}\nTotal: %{time_total}\n" \
  https://jse-dumart-bookshop.vercel.app
```

---

## 4. COMMON ISSUES AND FIXES

### Issue: Build Fails with "Module not found"
**Cause:** Missing dependencies
**Fix:**
```bash
# Reinstall dependencies
pnpm install

# Rebuild
pnpm run build

# Verify build locally before pushing
```

### Issue: 500 Internal Server Error on Deployment
**Cause:** Runtime error or missing API
**Fix:**
1. Check server logs (Vercel Dashboard → Function Logs)
2. Verify all environment variables
3. Test API routes locally: `npm run dev`
4. Check Supabase database connection

### Issue: "Cannot connect to database" Error
**Cause:** Invalid database URL or connection issues
**Fix:**
```bash
# Verify database connection string
echo $POSTGRES_URL

# Test connection manually
psql $POSTGRES_URL -c "SELECT 1;"

# Check Supabase status: https://status.supabase.com/
```

### Issue: DNS Not Resolving Custom Domain
**Cause:** Incorrect nameservers or propagation delay
**Fix:**
1. Update nameservers at domain registrar
2. Wait 24-48 hours for propagation
3. Use online tools to verify nameserver change
4. Consider using Vercel's DNS management

### Issue: Intermittent Connectivity (Timeouts)
**Cause:** CDN edge location issues or network congestion
**Fix:**
1. Check Vercel status page
2. Try from different network (mobile hotspot)
3. Check if issue is regional
4. Contact Vercel support with error logs

### Issue: "Blank Page" on Load
**Cause:** Client-side JavaScript error or hydration mismatch
**Fix:**
1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for failed requests
4. Review build logs for warnings
5. Test locally: `pnpm run dev`

---

## 5. MONITORING AND PREVENTION

### Enable Monitoring
```
1. Vercel Dashboard → Settings → Monitoring
2. Enable Email Notifications for:
   - Deployment failures
   - Performance issues
3. Set up custom alerts
```

### Health Checks
Create a simple health check endpoint:
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date() })
}
```

Monitor with uptime service:
```bash
# Test every 5 minutes
curl https://jse-dumart-bookshop.vercel.app/api/health
```

### Log Analysis
Review deployment logs regularly for:
- Warning messages
- Build time trends
- Cold start patterns
- Error frequency

---

## 6. ADVANCED DIAGNOSTICS

### Enable Verbose Logging
```bash
# Build with debug output
DEBUG=* pnpm run build

# Run dev server with verbose logging
DEBUG=* pnpm run dev
```

### Check Next.js Configuration
```typescript
// next.config.js validation
1. Verify all redirects/rewrites are valid
2. Check image optimization settings
3. Ensure API routes are properly configured
4. Validate environment variable usage
```

### Performance Profiling
```
1. Use Vercel Analytics dashboard
2. Check Web Vitals:
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)
3. Identify slow API routes
4. Optimize database queries
```

---

## 7. CONTACT VERCEL SUPPORT

If issues persist after following this guide:

**Via Vercel Dashboard:**
1. Click avatar → Help → Contact Support
2. Provide:
   - Deployment URL and project name
   - Specific error messages (with timestamps)
   - Steps to reproduce
   - Environment details
   - Attached build logs

**Required Information:**
- Vercel Project ID: `prj_uIq58UFvaAXKgZtxpOdbHIrt0IPf`
- GitHub Repository: `ganywez/jse-dumart-bookshop`
- Branch: `v0/ganywez-9312-940dfc34`
- Last successful deployment timestamp
- Current deployment URL
- Error screenshots/logs

---

## 8. QUICK REFERENCE COMMANDS

```bash
# Check deployment status
curl -I https://jse-dumart-bookshop.vercel.app

# Verify DNS
nslookup jse-dumart-bookshop.vercel.app

# Test database connection
psql $POSTGRES_URL -c "SELECT 1;"

# Build locally
pnpm install && pnpm run build

# Run development server
pnpm run dev

# Check Node version
node --version

# Verify npm/pnpm
pnpm --version

# Clear .next cache and rebuild
rm -rf .next && pnpm run build

# Check for TypeScript errors
pnpm tsc --noEmit
```

---

## 9. DEPLOYMENT CONFIGURATION (JSEdumart Specifics)

### Current Configuration
- **Framework:** Next.js 16.1.6
- **Runtime:** Node.js (18+)
- **Package Manager:** pnpm
- **Database:** Supabase PostgreSQL
- **Build Command:** `pnpm run build`
- **Start Command:** `next start`

### Vercel Settings Verification
```
1. Framework: Next.js ✓
2. Build Command: next build ✓
3. Output Directory: .next ✓
4. Install Command: pnpm install ✓
5. Node Version: 18.x or higher
```

### Environment Setup
```
Production Env Variables: ✓ All set
Preview Env Variables: ✓ All set
Development: Use .env.local (not tracked)
```

---

## 10. RESOLUTION FLOWCHART

```
Is Vercel dashboard accessible?
├─ NO → Check internet connection, firewall
│       Try VPN, different network
│       Contact ISP
└─ YES → Check deployment status
        ├─ RED (Failed) → Check build logs
        │                 Fix TypeScript/dependency errors
        │                 Verify environment variables
        │                 Redeploy
        └─ GREEN (Success) → Check deployment URL
                            ├─ Accessible → ✓ Working fine
                            │             Test all pages
                            │             Check performance
                            └─ Not accessible
                                ├─ Custom domain issues
                                │  Check DNS nameservers
                                │  Verify domain in Vercel
                                │  Wait for propagation
                                └─ URL accessible but blank
                                   Check browser console
                                   Look for JavaScript errors
                                   Rebuild and redeploy
```

---

## Summary

This guide provides a systematic approach to diagnosing and resolving Vercel connectivity issues. Start with immediate checks, then proceed through deployment status, environment variables, DNS configuration, and network testing. Most issues fall into these categories:

1. **Build Failures** - Fix code/dependencies, verify env vars
2. **DNS Issues** - Update nameservers, wait for propagation
3. **Network Problems** - Test connectivity, check firewall
4. **Service Issues** - Monitor Vercel status page, contact support

Use the diagnostic checklist and resolution steps to methodically identify and fix the issue. Always collect detailed logs and error messages before contacting support.
