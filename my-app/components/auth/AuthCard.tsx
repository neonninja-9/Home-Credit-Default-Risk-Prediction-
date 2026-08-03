"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Mail, ArrowLeft } from "lucide-react"

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

interface AuthCardProps {
  initialMode?: "login" | "signup"
}

// Fluid spring configuration for buttery smooth natural motion
const springTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
  mass: 0.8,
}

const textTransition = {
  duration: 0.24,
  ease: [0.16, 1, 0.3, 1] as const,
}

export function AuthCard({ initialMode = "login" }: AuthCardProps) {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  const toggleMode = (newMode: "login" | "signup") => {
    setError("")
    setMode(newMode)
    window.history.pushState(null, "", newMode === "login" ? "/auth/login" : "/auth/signup")
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message || "Something went wrong")
        }

        const signInRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (signInRes?.error) {
          throw new Error(signInRes.error)
        }

        router.push("/customer")
        router.refresh()
      } else {
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
      }
    } catch (err: any) {
      setError(mode === "login" ? "Invalid email or password" : (err.message || "Registration failed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-void-canvas selection:bg-dusk-violet selection:text-white">
      {/* Back to landing page button */}
      <Link
        href="/"
        className="fixed top-6 left-6 sm:top-8 sm:left-8 inline-flex items-center gap-2 text-sm text-slate hover:text-bone transition-all duration-200 py-2 px-3.5 rounded-ui bg-graphite/40 hover:bg-graphite/80 border border-hairline/60 hover:border-hairline backdrop-blur-md group z-50 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to home</span>
      </Link>

      {/* Outer Card with smooth layout expansion */}
      <motion.div
        layout
        transition={{
          layout: springTransition,
        }}
        className="w-full max-w-[448px] mx-auto rounded-cards p-8 sm:p-9 bg-graphite border border-hairline text-bone shadow-[0_16px_56px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Animated Header */}
        <motion.div layout="position" transition={springTransition} className="relative mb-8 text-center min-h-[64px] flex flex-col justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {mode === "login" ? (
              <motion.div
                key="login-header"
                initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                transition={textTransition}
                className="space-y-2"
              >
                <h1 className="text-3xl font-display font-bold tracking-tight text-bone">
                  Welcome back
                </h1>
                <p className="text-sm text-slate">
                  Enter your email to sign in to your account
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="signup-header"
                initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                transition={textTransition}
                className="space-y-2"
              >
                <h1 className="text-3xl font-display font-bold tracking-tight text-bone">
                  Create an account
                </h1>
                <p className="text-sm text-slate">
                  Enter your email below to create your account
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Form with clean gaps and margins */}
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
          
          {/* Full Name field with spring-based slide & height animation */}
          <AnimatePresence initial={false}>
            {mode === "signup" && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0, y: -10, filter: "blur(4px)" }}
                animate={{ opacity: 1, height: "auto", y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, height: 0, y: -10, filter: "blur(4px)" }}
                transition={{
                  height: springTransition,
                  opacity: { duration: 0.25 },
                  y: springTransition,
                  filter: { duration: 0.2 },
                }}
                className="overflow-hidden"
              >
                <div className="w-full py-0.5">
                  <Input
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={mode === "signup"}
                    className="w-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email input with smooth position tracking */}
          <motion.div layout="position" transition={springTransition} className="w-full py-0.5">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </motion.div>

          {/* Password input with smooth position tracking */}
          <motion.div layout="position" transition={springTransition} className="w-full py-0.5">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-red-500">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button with smooth position tracking and tap feel */}
          <motion.div layout="position" transition={springTransition} className="w-full pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full transition-transform active:scale-[0.98]"
              disabled={loading}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mode + (loading ? "-loading" : "-idle")}
                  initial={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 6, filter: "blur(2px)" }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {loading
                    ? mode === "login"
                      ? "Signing in..."
                      : "Creating account..."
                    : mode === "login"
                    ? "Sign in"
                    : "Sign up"}
                </motion.span>
              </AnimatePresence>
            </Button>
          </motion.div>
        </form>

        {/* Divider with position tracking */}
        <motion.div layout="position" transition={springTransition} className="relative my-7 w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-hairline" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-graphite px-2 text-slate">Or continue with</span>
          </div>
        </motion.div>

        {/* Social Auth Buttons with position tracking */}
        <motion.div layout="position" transition={springTransition} className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outline" type="button" onClick={() => signIn("github")} className="w-full transition-transform active:scale-[0.98]">
            <GithubIcon className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline" type="button" onClick={() => signIn("google")} className="w-full transition-transform active:scale-[0.98]">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </motion.div>

        {/* Toggle Switcher with position tracking */}
        <motion.div layout="position" transition={springTransition} className="mt-8 text-center text-sm text-slate w-full min-h-[24px] flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {mode === "login" ? (
              <motion.p
                key="toggle-login"
                initial={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 4, filter: "blur(2px)" }}
                transition={textTransition}
              >
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => toggleMode("signup")}
                  className="text-dusk-violet hover:underline underline-offset-4 font-medium transition-colors cursor-pointer"
                >
                  Sign up
                </button>
              </motion.p>
            ) : (
              <motion.p
                key="toggle-signup"
                initial={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 4, filter: "blur(2px)" }}
                transition={textTransition}
              >
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => toggleMode("login")}
                  className="text-dusk-violet hover:underline underline-offset-4 font-medium transition-colors cursor-pointer"
                >
                  Sign in
                </button>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}
