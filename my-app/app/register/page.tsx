"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { ArrowLeft } from "lucide-react"

export default function Register() {
  const [name, setName] = useState("")
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to register")
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
      <div className="w-full max-w-[440px] my-12">
        <Link href="/" className="inline-flex items-center text-on-dark-mute hover:text-on-dark transition-colors mb-8 caption">
          <ArrowLeft size={16} className="mr-2" /> Back to home
        </Link>
        
        <Card variant="glass" className="w-full p-8 md:p-10 border border-hairline-dark">
          <h1 className="heading-lg mb-2">Create an account</h1>
          <p className="body-md text-on-dark-mute mb-8">
            Start making confident lending decisions today.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              required
              disabled={loading}
              className="bg-surface-elevated border-hairline-dark text-on-dark placeholder:text-on-dark-mute"
            />
            
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
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
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
          
          <div className="mt-8 text-center caption text-on-dark-mute">
            Already have an account?{" "}
            <Link href="/login" className="text-on-dark hover:underline">
              Log in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
