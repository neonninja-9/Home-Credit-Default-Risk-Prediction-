"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn, getSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Mail, ArrowLeft, User, Building2, ShieldCheck, Sparkles, Lock, Eye, EyeOff } from "lucide-react"

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

type RoleType = "CUSTOMER" | "BANK_OFFICER"

const spring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 30,
  mass: 0.7,
}

const fadeSlide = {
  duration: 0.22,
  ease: [0.16, 1, 0.3, 1] as const,
}

export function AuthCard({ initialMode = "login" }: AuthCardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [role, setRole] = useState<RoleType>("CUSTOMER")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const roleParam = searchParams.get("role")?.toLowerCase()
    if (roleParam === "bank" || roleParam === "bank_officer" || roleParam === "officer") {
      setRole("BANK_OFFICER")
    } else if (roleParam === "customer") {
      setRole("CUSTOMER")
    }
  }, [searchParams])

  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  const toggleMode = (newMode: "login" | "signup") => {
    setError("")
    setMode(newMode)
    const roleQuery = role === "BANK_OFFICER" ? "?role=bank" : ""
    window.history.pushState(null, "", (newMode === "login" ? "/auth/login" : "/auth/signup") + roleQuery)
  }

  const handleRoleChange = (newRole: RoleType) => {
    setError("")
    setRole(newRole)
    const roleQuery = newRole === "BANK_OFFICER" ? "?role=bank" : ""
    window.history.pushState(null, "", (mode === "login" ? "/auth/login" : "/auth/signup") + roleQuery)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const targetUrl = role === "BANK_OFFICER" ? "/bank" : "/customer"

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
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

        router.push(targetUrl)
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

        const session = await getSession()
        const userRole = (session?.user as any)?.role || role
        const destination = userRole === "BANK_OFFICER" ? "/bank" : "/customer"

        router.push(destination)
        router.refresh()
      }
    } catch (err: any) {
      let msg = err.message || "An error occurred"
      if (msg === "CredentialsSignin") {
        msg = "Invalid email or password. If you haven't registered this email, please sign up."
      }
      setError(msg)
    } finally {
      setLoading(false)
    }
  }


  const isBank = role === "BANK_OFFICER"
  const accentColor = isBank ? "accent-teal" : "dusk-violet"

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 bg-void-canvas selection:bg-dusk-violet selection:text-white">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          key={role}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] ${
            isBank
              ? "bg-accent-teal/[0.06]"
              : "bg-dusk-violet/[0.06]"
          }`}
        />
      </div>

      {/* Back to landing */}
      <Link
        href="/"
        className="fixed top-6 left-6 sm:top-8 sm:left-8 inline-flex items-center gap-2 text-sm text-slate hover:text-bone transition-all duration-200 py-2 px-3.5 rounded-ui bg-graphite/40 hover:bg-graphite/80 border border-hairline/60 hover:border-hairline backdrop-blur-md group z-50 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to home</span>
      </Link>

      {/* Main card */}
      <motion.div
        layout
        transition={{ layout: spring }}
        className="relative w-full max-w-[440px] mx-auto overflow-hidden"
      >
        {/* Brand mark */}
        <motion.div
          layout="position"
          transition={spring}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-block">
            <span className="font-display font-bold text-xl tracking-tight inline-flex animate-text-shine bg-[linear-gradient(110deg,#b5b5b5,45%,#ffffff,55%,#b5b5b5)] bg-[length:200%_100%] bg-clip-text text-transparent">
              CreditLens
            </span>
          </Link>
        </motion.div>

        {/* Card body */}
        <motion.div
          layout
          transition={{ layout: spring }}
          className="rounded-[20px] border border-hairline bg-graphite p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        >
          {/* ── Role Switcher ── */}
          <motion.div layout="position" transition={spring} className="mb-7">
            <div className="flex p-1 bg-void-canvas/60 rounded-xl border border-hairline/60 relative">
              <button
                type="button"
                onClick={() => handleRoleChange("CUSTOMER")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-[13px] font-medium rounded-[10px] transition-colors duration-200 relative z-10 ${
                  !isBank ? "text-bone" : "text-slate hover:text-bone/80"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Customer</span>
                {!isBank && (
                  <motion.div
                    layoutId="active-role-pill"
                    transition={spring}
                    className="absolute inset-0 bg-dusk-violet/20 border border-dusk-violet/40 rounded-[10px] -z-10"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("BANK_OFFICER")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-[13px] font-medium rounded-[10px] transition-colors duration-200 relative z-10 ${
                  isBank ? "text-bone" : "text-slate hover:text-bone/80"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Bank Staff</span>
                {isBank && (
                  <motion.div
                    layoutId="active-role-pill"
                    transition={spring}
                    className="absolute inset-0 bg-accent-teal/15 border border-accent-teal/35 rounded-[10px] -z-10"
                  />
                )}
              </button>
            </div>
          </motion.div>

          {/* ── Heading ── */}
          <motion.div
            layout="position"
            transition={spring}
            className="mb-7 text-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${mode}-${role}`}
                initial={{ opacity: 0, y: -6, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 6, filter: "blur(5px)" }}
                transition={fadeSlide}
                className="space-y-2"
              >
                <h1 className="text-[26px] sm:text-[28px] font-display font-bold tracking-tight text-bone leading-tight">
                  {mode === "login"
                    ? isBank ? "Officer Sign In" : "Welcome back"
                    : isBank ? "Officer Registration" : "Create your account"
                  }
                </h1>
                <p className="text-[13px] text-slate leading-relaxed max-w-[300px] mx-auto">
                  {mode === "login"
                    ? isBank
                      ? "Access the underwriting dashboard to review loan applications."
                      : "Sign in to check eligibility, track applications, and more."
                    : isBank
                      ? "Set up your officer credentials to begin reviewing applications."
                      : "Get started with instant AI-powered loan eligibility checks."
                  }
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Form ── */}
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* Name (signup only) */}
            <AnimatePresence initial={false}>
              {mode === "signup" && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0, y: -8, filter: "blur(3px)" }}
                  animate={{ opacity: 1, height: "auto", y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, height: 0, y: -8, filter: "blur(3px)" }}
                  transition={{
                    height: spring,
                    opacity: { duration: 0.2 },
                    y: spring,
                    filter: { duration: 0.15 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1.5">
                    <label htmlFor="auth-name" className="block text-[12px] font-medium text-smoke uppercase tracking-wider">
                      Full name
                    </label>
                    <Input
                      id="auth-name"
                      name="name"
                      placeholder={isBank ? "e.g. Sarah Jenkins" : "e.g. John Doe"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={mode === "signup"}
                      className="w-full bg-void-canvas/80 border-hairline/80 focus-visible:border-dusk-violet focus-visible:ring-1 focus-visible:ring-dusk-violet text-bone placeholder:text-slate/50 text-sm h-11 rounded-xl"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <motion.div layout="position" transition={spring}>
              <div className="space-y-1.5">
                <label htmlFor="auth-email" className="block text-[12px] font-medium text-smoke uppercase tracking-wider">
                  Email address
                </label>
                <Input
                  id="auth-email"
                  name="email"
                  type="email"
                  placeholder={isBank ? "officer@bank.com" : "you@example.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-void-canvas/80 border-hairline/80 focus-visible:border-dusk-violet focus-visible:ring-1 focus-visible:ring-dusk-violet text-bone placeholder:text-slate/50 text-sm h-11 rounded-xl"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div layout="position" transition={spring}>
              <div className="space-y-1.5">
                <label htmlFor="auth-password" className="block text-[12px] font-medium text-smoke uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="auth-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-void-canvas/80 border-hairline/80 focus-visible:border-dusk-violet focus-visible:ring-1 focus-visible:ring-dusk-violet text-bone placeholder:text-slate/50 text-sm h-11 rounded-xl pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-bone transition-colors p-0.5"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.97 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 text-[13px] text-rose-300 bg-rose-950/40 border border-rose-800/40 rounded-xl text-center leading-relaxed">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.div layout="position" transition={spring} className="pt-1">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full font-semibold h-12 rounded-xl transition-all duration-300 shadow-lg text-[15px] ${
                  isBank
                    ? "bg-accent-teal hover:bg-accent-teal/90 text-void-canvas shadow-accent-teal/15"
                    : "bg-dusk-violet hover:bg-dusk-violet/90 text-white shadow-dusk-violet/20"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className="inline-flex items-center gap-2"
                    >
                      <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Processing…
                    </motion.span>
                  ) : (
                    <motion.span
                      key={`${mode}-${role}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                    >
                      {mode === "login"
                        ? isBank ? "Sign in to Bank Portal" : "Sign in"
                        : isBank ? "Create Officer Account" : "Create account"
                      }
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>

          {/* ── Divider ── */}
          <motion.div layout="position" transition={spring} className="my-7">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-hairline/60" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-graphite px-4 text-[11px] uppercase tracking-widest text-slate/80">
                  or
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Social logins ── */}
          <motion.div layout="position" transition={spring}>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => signIn("github", { callbackUrl: isBank ? "/bank" : "/customer" })}
                className="bg-void-canvas/50 border-hairline/70 hover:bg-void-canvas hover:border-slate/30 text-bone h-11 rounded-xl transition-all duration-200 text-[13px] font-medium"
              >
                <GithubIcon className="mr-2 h-4 w-4 fill-current" />
                GitHub
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => signIn("google", { callbackUrl: isBank ? "/bank" : "/customer" })}
                className="bg-void-canvas/50 border-hairline/70 hover:bg-void-canvas hover:border-slate/30 text-bone h-11 rounded-xl transition-all duration-200 text-[13px] font-medium"
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </motion.div>

          {/* ── Footer mode toggle ── */}
          <motion.div layout="position" transition={spring} className="mt-8 text-center">
            <AnimatePresence mode="wait" initial={false}>
              {mode === "login" ? (
                <motion.p
                  key="to-signup"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="text-[13px] text-slate"
                >
                  New to CreditLens?{" "}
                  <button
                    type="button"
                    onClick={() => toggleMode("signup")}
                    className={`font-semibold hover:text-white underline underline-offset-4 decoration-hairline/50 hover:decoration-bone transition-all duration-200 cursor-pointer ${
                      isBank ? "text-accent-teal" : "text-dusk-violet"
                    }`}
                  >
                    Create an account
                  </button>
                </motion.p>
              ) : (
                <motion.p
                  key="to-login"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="text-[13px] text-slate"
                >
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => toggleMode("login")}
                    className={`font-semibold hover:text-white underline underline-offset-4 decoration-hairline/50 hover:decoration-bone transition-all duration-200 cursor-pointer ${
                      isBank ? "text-accent-teal" : "text-dusk-violet"
                    }`}
                  >
                    Sign in
                  </button>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Trust line beneath card */}
        <motion.p
          layout="position"
          transition={spring}
          className="text-center text-[11px] text-slate/60 mt-6 leading-relaxed"
        >
          Secured with end-to-end encryption · Your data is never shared
        </motion.p>
      </motion.div>
    </div>
  )
}
