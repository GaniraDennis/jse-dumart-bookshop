# Google OAuth Setup Guide for JSEdumart

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account
3. Click "Select a Project" → "New Project"
4. Enter project name: "JSEdumart Bookstore"
5. Click "Create"

## Step 2: Enable Google+ API

1. In the Cloud Console, search for "Google+ API"
2. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to **Credentials** (left sidebar)
2. Click **"+ Create Credentials"** → **"OAuth client ID"**
3. Choose **"Web application"**
4. Under "Authorized redirect URIs", add:
   ```
   http://localhost:3000/
   http://localhost:3000/auth/signin
   http://localhost:3000/auth/signup
   ```
5. For production, also add:
   ```
   https://jsedumart.co.ke/
   https://jsedumart.co.ke/auth/signin
   https://jsedumart.co.ke/auth/signup
   ```
6. Click "Create"
7. Copy the **Client ID** (you'll need this)

## Step 4: Configure Your Application

1. Create a `.env.local` file in the project root:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and paste your Google Client ID:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
   ```

3. Update the site URL if needed:
   ```
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

## Step 5: Test Google Sign-In

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Go to http://localhost:3000/auth/signin or /auth/signup

3. Click "Sign in with Google" or "Sign up with Google"

4. You should see the Google authentication popup

### Quick Debug Checklist

Open browser DevTools (F12) and check:

1. **Console Tab**: Look for any errors with "Google" in the message
2. **Check if Client ID is loaded**:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
   ```
3. **Check if Google library is loaded**:
   ```javascript
   console.log(window.google?.accounts)
   ```
4. **Network Tab**: Search for `gsi/client` - should be a successful script load
5. **If you see "No credential received"**: 
   - Check your `.env.local` file exists and has the correct Client ID
   - Restart the dev server (Ctrl+C, then `pnpm dev`)
   - Hard refresh browser (Ctrl+Shift+R)

## Important Notes

### Security Considerations

- **Never share your Client Secret** - it's only for server-side authentication
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is safe to expose (it's meant to be public)
- The credential in the JWT is decoded on the client side in this implementation
- For production with sensitive data, validate the JWT token on your backend server

### Adding Server-Side Validation

For production apps, add server-side token verification:

```typescript
// pages/api/auth/google-callback.ts
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
}
```

### Troubleshooting

#### "No credential received from Google"
- **Most likely cause**: `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is not set or incorrect
- **Solution**: 
  1. Check that `.env.local` has `NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id`
  2. Restart your dev server: `Ctrl+C` then `pnpm dev`
  3. Verify in browser console (F12) that the ID is loaded
  4. Make sure you copied the full Client ID including `.apps.googleusercontent.com`

#### "Google is not defined"
- Make sure the Google CDN script is loading (check browser console, Network tab)
- Verify NEXT_PUBLIC_GOOGLE_CLIENT_ID is set
- Try a hard refresh (Ctrl+Shift+R on Windows)

#### Redirect URI mismatch error
- Check that your redirect URIs in Google Console match your app URL
- Don't forget the protocol (http:// or https://)
- Include trailing slash: `http://localhost:3000/`
- Copy-paste directly from Google Console to avoid whitespace issues
- Wait 5-10 minutes for Google to apply credential changes

#### CORS errors
- Google OAuth2 handles CORS automatically
- If you see CORS errors, ensure you're using the official Google script from `accounts.google.com/gsi/client`

#### Development vs Production
- You may need separate OAuth credentials for dev and prod
- Local development: use http://localhost:3000
- Production: use your actual domain (https://yourdomain.com)

## How Google Sign-In Works in This App

1. **User clicks "Sign in with Google"**
2. Google OAuth2 popup appears
3. User authenticates with their Google account
4. Google returns a JWT token (credential)
5. Token is decoded to extract user info (firstName, lastName, email, picture)
6. User is logged in with `loginWithGoogle()` method
7. App stores user data in auth context state
8. User is redirected to home page

## Supported User Information

When users sign in with Google, we capture:

- `given_name` → firstName
- `family_name` → lastName  
- `email` → email
- `picture` → avatar (profile picture URL)
- `sub` → id (unique Google ID)

## Connecting to Your Backend

In your production API, you can:

1. Store Google user data securely
2. Create user sessions/tokens
3. Link Google accounts to existing accounts
4. Sync user information

Example backend endpoint:

```typescript
// pages/api/auth/google.ts
export async function POST(req: Request) {
  const { credential } = await req.json();
  
  // Verify token on server side
  const payload = await verifyGoogleToken(credential);
  
  // Create or find user in database
  const user = await findOrCreateUser({
    email: payload.email,
    firstName: payload.given_name,
    lastName: payload.family_name,
    googleId: payload.sub,
  });
  
  // Create session/JWT
  const token = generateAuthToken(user);
  
  return { token, user };
}
```

## Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for Web](https://developers.google.com/identity/gsi/web)
- [Google Identity Services Library](https://accounts.google.com/gsi/client)

## Next Steps

1. Complete the setup steps above
2. Test sign-in/sign-up with a test Google account
3. Connect to your backend database
4. Add session management for persistent authentication
5. Deploy to production with your domain

---

Need help? Visit the JSEdumart repository or contact support.
