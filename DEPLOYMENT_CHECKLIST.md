# JSEdumart Deployment Verification Checklist

## Pre-Deployment Verification (Do This Before Every Push)

### Code Quality
- [ ] Run TypeScript compiler: `pnpm tsc --noEmit`
- [ ] Check for build warnings: `pnpm run build`
- [ ] Verify no console errors in dev: `pnpm run dev`
- [ ] Test all critical pages locally
- [ ] Clear .next cache: `rm -rf .next`

### Environment & Configuration
- [ ] All required environment variables are set in Vercel
- [ ] No sensitive keys in committed code
- [ ] `.env.local` is in `.gitignore`
- [ ] Next.js config is valid
- [ ] Package.json dependencies are locked to versions

### Database & APIs
- [ ] Database connection string is valid
- [ ] Supabase tables are created and accessible
- [ ] API routes work in development
- [ ] M-Pesa API credentials are valid
- [ ] All API endpoints respond correctly

### Frontend & UI
- [ ] All pages load without hydration errors
- [ ] FontAwesome icons render correctly
- [ ] Responsive design works on mobile (320px, 768px, 1024px)
- [ ] All images have proper alt text
- [ ] No broken links or routes

### Authentication & Security
- [ ] Sign-in functionality works locally
- [ ] Sign-up creates users correctly
- [ ] Protected routes redirect unauthenticated users
- [ ] Admin pages require authentication
- [ ] Password validation works
- [ ] Session management is secure

## Post-Deployment Verification (After Each Deploy)

### Immediate Checks (First 5 minutes)
- [ ] Check Vercel deployment status (green checkmark)
- [ ] Verify deployment URL is accessible
- [ ] Check homepage loads without errors
- [ ] Open browser DevTools → Console (no red errors)
- [ ] Open browser DevTools → Network (all requests 2xx/3xx status)

### Functional Testing (Next 15 minutes)
- [ ] Homepage loads and displays products
- [ ] Sign-in page loads and validates input
- [ ] Sign-up page works and creates accounts
- [ ] Shop page requires authentication and redirects
- [ ] Can add products to cart
- [ ] Checkout process works
- [ ] Admin dashboard loads
- [ ] Can view products in admin
- [ ] Search functionality works
- [ ] Filters work correctly

### Performance & User Experience
- [ ] Page load time < 3 seconds
- [ ] Navigation is responsive (no lag)
- [ ] Mobile layout displays correctly
- [ ] Images load properly
- [ ] Forms are responsive
- [ ] Loading states show correctly

### Error Handling
- [ ] 404 pages display correctly
- [ ] Error boundaries catch errors
- [ ] API errors are handled gracefully
- [ ] Form validation shows error messages
- [ ] Network errors display user-friendly messages

### Analytics & Monitoring
- [ ] Check Vercel Analytics dashboard
- [ ] Review Web Vitals (LCP, FID, CLS)
- [ ] Check error logs for exceptions
- [ ] Monitor function durations
- [ ] Review deployment size

## Critical Issues Checklist

### If Deployment Shows Red (Failed)
- [ ] Check build logs for error messages
- [ ] Look for dependency resolution errors
- [ ] Check for TypeScript compilation errors
- [ ] Verify environment variables are set
- [ ] Look for API route errors
- [ ] Check for out-of-memory issues
- [ ] Review recent code changes
- [ ] Compare with last successful build

### If Deployment Shows Green But URL Doesn't Load
- [ ] Verify DNS is pointing to Vercel nameservers
- [ ] Check if domain is added in Vercel settings
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Try incognito/private browsing
- [ ] Try different device/network
- [ ] Check browser console for JavaScript errors
- [ ] Verify Vercel status page (not down)
- [ ] Check if behind firewall/VPN

### If Pages Load But Show Errors
- [ ] Check browser console for error messages
- [ ] Look for hydration mismatch errors
- [ ] Verify all environment variables
- [ ] Check API routes are responding
- [ ] Verify database connection
- [ ] Look for missing dependencies
- [ ] Check for image loading errors
- [ ] Review server logs in Vercel

### If Pages Load Blank or Partially
- [ ] Check Network tab in DevTools
- [ ] Look for failed CSS/JS requests
- [ ] Verify FontAwesome CDN is loading
- [ ] Check image CDN is accessible
- [ ] Look for 404 errors on assets
- [ ] Verify no JavaScript errors in console
- [ ] Check if using suppressHydrationWarning correctly
- [ ] Review CSS is loading properly

## Environment Variables Verification

### Required Variables (Production)
```
NEXT_PUBLIC_SUPABASE_URL = [YOUR_SUPABASE_URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [YOUR_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY = [YOUR_SERVICE_ROLE_KEY]
POSTGRES_URL = [YOUR_DATABASE_URL]
POSTGRES_URL_NON_POOLING = [YOUR_DATABASE_URL_NON_POOLING]
MPESA_CONSUMER_KEY = [YOUR_MPESA_KEY]
MPESA_CONSUMER_SECRET = [YOUR_MPESA_SECRET]
MPESA_SHORTCODE = [YOUR_SHORTCODE]
MPESA_PASSKEY = [YOUR_PASSKEY]
```

### Verification Steps
1. Vercel Dashboard → Settings → Environment Variables
2. Confirm each variable has a value
3. Check no trailing/leading spaces
4. Verify values match your Supabase/M-Pesa credentials
5. Confirm Preview environment has same variables

## Performance Baseline

### Expected Metrics (Good)
- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **Page Load Time:** < 3s
- **Time to Interactive:** < 5s
- **Total Bundle Size:** < 500KB

### Acceptable Metrics (Okay)
- **LCP:** 2.5s - 4s
- **FID:** 100ms - 300ms
- **CLS:** 0.1 - 0.25
- **Page Load:** 3s - 5s
- **Bundle Size:** 500KB - 1MB

### Poor Metrics (Action Needed)
- **LCP:** > 4s
- **FID:** > 300ms
- **CLS:** > 0.25
- **Page Load:** > 5s
- **Bundle Size:** > 1MB

Monitor in Vercel Analytics Dashboard and optimize if needed.

## Rollback Procedure

If deployment causes critical issues:

1. **Immediate:** Go to Vercel Dashboard → Deployments
2. **Select:** Last known good deployment (green status)
3. **Click:** "Promote to Production"
4. **Verify:** Site is accessible and working
5. **Notify:** Team of rollback
6. **Investigate:** Root cause of failure
7. **Fix:** Code locally and test thoroughly
8. **Redeploy:** When ready

## Sign-Off

- **Deployed By:** [Name]
- **Deployment Date:** [Date/Time]
- **Version:** [Git commit hash]
- **Environment:** Production/Staging
- **Status:** ✓ All checks passed / ⚠ Issues found
- **Notes:** [Any issues or concerns]

---

**Next Steps if Issues Found:**
1. Review VERCEL_TROUBLESHOOTING_GUIDE.md
2. Check deployment logs
3. Verify environment variables
4. Test locally: `pnpm run dev`
5. Fix issues and commit
6. Redeploy to Vercel
7. Re-run this checklist

