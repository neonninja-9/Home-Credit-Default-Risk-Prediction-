import { Suspense } from "react"
import { AuthCard } from "@/components/auth/AuthCard"

export default function Register() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void-canvas flex items-center justify-center text-white/50">Loading registration...</div>}>
      <AuthCard initialMode="signup" />
    </Suspense>
  )
}
