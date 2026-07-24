"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { ArrowLeft } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to log in")
      }
      
      login(data.user, data.token)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-canvas-dark text-on-dark min-h-full">
      <div className="w-full max-w-[440px]">
        <Link href="/" className="inline-flex items-center text-on-dark-mute hover:text-on-dark transition-colors mb-8 caption">
          <ArrowLeft size={16} className="mr-2" /> Back to home
        </Link>
        
        <Card variant="glass" className="w-full p-8 md:p-10 border border-hairline-dark">
          <h1 className="heading-lg mb-2">Welcome back</h1>
          <p className="body-md text-on-dark-mute mb-8">
            Log in to access your risk prediction dashboard.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@creditlens.com"
              required
              disabled={loading}
              className="bg-surface-elevated border-hairline-dark text-on-dark placeholder:text-on-dark-mute"
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              className="bg-surface-elevated border-hairline-dark text-on-dark placeholder:text-on-dark-mute"
            />
            
            {error && (
              <div className="p-4 rounded-md bg-accent-danger/20 border border-accent-danger/50 text-accent-danger body-sm">
                {error}
              </div>
            )}
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-full mt-2" 
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>
          
          <div className="mt-8 text-center caption text-on-dark-mute">
            Don't have an account?{" "}
            <Link href="/register" className="text-on-dark hover:underline">
              Create one
            </Link>
          </div>
          
          {/* Demo hint */}
          <div className="mt-8 p-4 rounded-md bg-surface-elevated border border-hairline-dark text-center caption text-on-dark-mute">
            <strong>Demo credentials:</strong><br />
            demo@creditlens.com / password123
          </div>
        </Card>
      </div>
    </div>
  )
}
