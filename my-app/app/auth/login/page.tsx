import { Suspense } from "react"
import { AuthCard } from "@/components/auth/AuthCard"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void-canvas flex items-center justify-center text-white/50">Loading sign in...</div>}>
      <AuthCard initialMode="login" />
    </Suspense>
  )
}
