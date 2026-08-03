"use client"

import React, { createContext, useContext } from "react"
import { SessionProvider, useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const user = session?.user ? { 
    id: session.user.id || "", 
    name: session.user.name || "", 
    email: session.user.email || "" 
  } : null

  const login = (newUser: User, token: string) => {
    // Handled by NextAuth signIn
  }

  const logout = async () => {
    await signOut({ redirect: false })
    router.push("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: status === "authenticated", 
      isLoading: status === "loading",
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
