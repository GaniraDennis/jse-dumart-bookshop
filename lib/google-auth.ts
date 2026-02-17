/**
 * Google OAuth Utility
 * Handles Google Sign-In/Sign-Up functionality
 * 
 * Setup:
 * 1. Create a Google Cloud Project: https://console.cloud.google.com
 * 2. Create OAuth 2.0 credentials (Web application)
 * 3. Add authorized redirect URIs:
 *    - http://localhost:3000/auth/callback/google (dev)
 *    - https://yourdomain.com/auth/callback/google (production)
 * 4. Copy Client ID to your .env.local file
 */

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleAuthConfig) => void
          renderButton: (element: HTMLElement | null, options: GoogleButtonOptions) => void
          prompt: (callback?: (notification: any) => void) => void
        }
      }
    }
  }
}

interface GoogleAuthConfig {
  client_id: string
  callback: (response: GoogleAuthResponse) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
}

interface GoogleButtonOptions {
  type?: "standard" | "icon"
  theme?: "outline" | "filled_blue" | "filled_black"
  size?: "large" | "medium" | "small"
  text?: "signin_with" | "signup_with" | "signin" | "signup"
  locale?: string
}

interface GoogleAuthResponse {
  credential?: string
  clientId?: string
  select_by?: string
}

interface GoogleTokenPayload {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  locale: string
  iat: number
  exp: number
}

/**
 * Decode JWT token from Google (for demo purposes)
 * In production, validate this on your backend
 */
export function decodeGoogleToken(token: string): GoogleTokenPayload {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding Google token:", error)
    throw new Error("Failed to decode authentication token")
  }
}

/**
 * Initialize Google Sign-In SDK
 */
export function loadGoogleSignIn(callback: (response: GoogleAuthResponse) => void) {
  // Check if script is already loaded
  if (window.google?.accounts) {
    initializeGoogle(callback)
    return
  }

  const script = document.createElement("script")
  script.src = "https://accounts.google.com/gsi/client"
  script.async = true
  script.defer = true
  script.onload = () => {
    initializeGoogle(callback)
  }
  document.head.appendChild(script)
}

function initializeGoogle(callback: (response: GoogleAuthResponse) => void) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  if (!clientId) {
    console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable is not set")
    return
  }

  window.google?.accounts.id.initialize({
    client_id: clientId,
    callback: callback,
    auto_select: false,
    cancel_on_tap_outside: true,
  })
}

/**
 * Trigger Google Sign-In prompt
 */
export function triggerGoogleSignIn() {
  if (!window.google?.accounts.id) {
    console.error("Google Sign-In not loaded")
    return
  }
  // Programmatically show One Tap UI
  window.google.accounts.id.prompt()
}

/**
 * Render Google Sign-In button
 */
export function renderGoogleButton(
  elementId: string,
  options: GoogleButtonOptions = {}
) {
  const element = document.getElementById(elementId)
  if (!element) {
    console.error(`Element with ID "${elementId}" not found`)
    return
  }

  const defaultOptions: GoogleButtonOptions = {
    type: "standard",
    theme: "outline",
    size: "large",
    text: "signin_with",
    locale: "en",
    ...options,
  }

  window.google?.accounts.id.renderButton(element, defaultOptions)
}

/**
 * Parse Google authentication response
 */
export function parseGoogleResponse(response: GoogleAuthResponse) {
  if (!response.credential) {
    throw new Error("No credential received from Google")
  }

  const payload = decodeGoogleToken(response.credential)

  return {
    id: payload.sub,
    firstName: payload.given_name || payload.name.split(" ")[0],
    lastName: payload.family_name || payload.name.split(" ").slice(1).join(" "),
    email: payload.email,
    avatar: payload.picture,
  }
}

/**
 * Handle Google Sign-In/Sign-Up response
 */
export async function handleGoogleAuth(
  response: GoogleAuthResponse,
  onSuccess: (userData: any) => void,
  onError: (error: string) => void
) {
  try {
    const userData = parseGoogleResponse(response)
    onSuccess(userData)
  } catch (error) {
    onError(error instanceof Error ? error.message : "Authentication failed")
  }
}
