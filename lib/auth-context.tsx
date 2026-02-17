"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  isEmailVerified?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>
  verifyEmail: (email: string, code: string) => Promise<boolean>
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>
  confirmPasswordReset: (email: string, code: string, newPassword: string) => Promise<boolean>
  logout: () => void
  checkEmailExists: (email: string) => Promise<boolean>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock database of users
const mockUsers: Map<string, User & { password: string; emailVerified: boolean }> = new Map()

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const checkEmailExists = useCallback(async (email: string): Promise<boolean> => {
    // Check if email is already registered
    await new Promise((r) => setTimeout(r, 300))
    return mockUsers.has(email.toLowerCase())
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000))
    
    const userData = mockUsers.get(email.toLowerCase())
    if (!userData) {
      throw new Error("User not found")
    }
    
    if (userData.password !== password) {
      throw new Error("Invalid password")
    }
    
    if (!userData.emailVerified) {
      throw new Error("Email not verified. Please check your inbox for verification link.")
    }

    setUser({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      isEmailVerified: true,
    })
    return true
  }, [])

  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; message: string }> => {
    await new Promise((r) => setTimeout(r, 1000))
    
    const emailLower = data.email.toLowerCase()
    
    // Check if user already exists
    if (mockUsers.has(emailLower)) {
      return {
        success: false,
        message: "This email is already registered. Please sign in instead."
      }
    }

    const newUser = {
      id: "usr-" + Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      emailVerified: false,
    }

    mockUsers.set(emailLower, newUser)

    // Simulate sending verification email
    console.log(`Verification email sent to ${data.email}`)
    console.log(`Verification code: 123456`) // Mock code

    return {
      success: true,
      message: `Verification email sent to ${data.email}. Please check your inbox.`
    }
  }, [])

  const verifyEmail = useCallback(async (email: string, code: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000))
    
    const userData = mockUsers.get(email.toLowerCase())
    if (!userData) {
      throw new Error("Email not found")
    }

    // Mock verification - in production, validate against sent code
    if (code !== "123456") {
      throw new Error("Invalid verification code")
    }

    userData.emailVerified = true
    mockUsers.set(email.toLowerCase(), userData)

    setUser({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      isEmailVerified: true,
    })

    return true
  }, [])

  const resetPassword = useCallback(async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((r) => setTimeout(r, 1000))
    
    const userData = mockUsers.get(email.toLowerCase())
    if (!userData) {
      // Don't reveal if email exists or not (security)
      return {
        success: true,
        message: "If this email exists, a reset link has been sent."
      }
    }

    console.log(`Password reset email sent to ${email}`)
    console.log(`Reset code: 654321`) // Mock code

    return {
      success: true,
      message: "If this email exists, a reset link has been sent."
    }
  }, [])

  const confirmPasswordReset = useCallback(async (email: string, code: string, newPassword: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000))
    
    const userData = mockUsers.get(email.toLowerCase())
    if (!userData) {
      throw new Error("Email not found")
    }

    // Mock verification
    if (code !== "654321") {
      throw new Error("Invalid reset code")
    }

    userData.password = newPassword
    mockUsers.set(email.toLowerCase(), userData)

    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        verifyEmail,
        resetPassword,
        confirmPasswordReset,
        logout,
        checkEmailExists,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}