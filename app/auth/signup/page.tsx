import { Suspense } from "react"
import { AuthCard } from "@/components/auth/AuthCard"

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void-canvas flex items-center justify-center text-white/50">Loading sign up...</div>}>
      <AuthCard initialMode="signup" />
    </Suspense>
  )
}
