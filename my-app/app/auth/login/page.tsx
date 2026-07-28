"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Mail } from "lucide-react"

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.4 5.4 0 0 0-.1 3.8A5.4 5.4 0 0 0 2 12.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
)

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        throw new Error(res.error)
      }

      router.push("/customer")
      router.refresh()
    } catch (err: any) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className="px-4 py-12">
      <Card variant="feature-dark" style={{ width: '100%', maxWidth: '448px', display: 'flex', flexDirection: 'column' }} className="mx-auto p-8 border-white/10">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight text-white">Welcome back</h1>
          <p className="text-sm text-white/60">Enter your email to sign in to your account</p>
        </div>
        <form onSubmit={onSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column' }} className="space-y-4">
          <div className="w-full space-y-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="w-full"
            />
          </div>
          <div className="w-full space-y-2">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" variant="primary" className="w-full mt-2" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="relative my-8 w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface-elevated px-2 text-white/60">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outline-light" onClick={() => signIn("github")} className="w-full">
            <GithubIcon className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline-light" onClick={() => signIn("google")} className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-white/60 w-full">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  )
}
