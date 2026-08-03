"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut, ShieldCheck, Building2, Layers } from "lucide-react"

const BANK_LINKS = [
  { href: "/bank", label: "Applications Queue" },
]

export function BankNavbar() {
  const { logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto text-bone flex items-center justify-between transition-all duration-500",
          "backdrop-blur-lg",
          isScrolled
            ? "bg-black/80 h-14 max-w-[1050px] w-[calc(100%-2rem)] rounded-2xl mt-4 border border-accent-teal/20 px-6 lg:px-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-transparent h-20 max-w-full w-full rounded-none mt-0 px-6 lg:px-20"
        )}
      >
        <div className="flex items-center gap-3">
          <Link href="/bank" className="flex items-center gap-2.5 mr-4">
            <div className="w-8 h-8 rounded-lg bg-accent-teal/20 border border-accent-teal/40 flex items-center justify-center text-accent-teal">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg tracking-tight text-bone leading-none">
                CreditLens
              </span>
              <span className="text-[10px] text-accent-teal font-mono uppercase tracking-wider leading-tight">
                Underwriting
              </span>
            </div>
          </Link>



          {/* Desktop Nav Items with Sliding Hover Pill */}
          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {BANK_LINKS.map((link, idx) => {
              const isActive = pathname === link.href || (link.href !== "/bank" && pathname.startsWith(link.href))
              const isHovered = hoveredIndex === idx

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 z-10",
                    isActive ? "text-bone font-semibold" : "text-bone/70 hover:text-bone"
                  )}
                >
                  {/* Sliding hover pill across items */}
                  {isHovered && (
                    <motion.div
                      layoutId="bank-nav-hover-pill"
                      className="absolute inset-0 bg-accent-teal/15 border border-accent-teal/20 rounded-md z-[-1]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                    />
                  )}

                  {/* Active item highlight when not hovering over another item */}
                  {isActive && !isHovered && (
                    <motion.div
                      layoutId="bank-nav-active-pill"
                      className="absolute inset-0 bg-accent-teal/10 rounded-md z-[-2] border border-accent-teal/30"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Desktop Officer Status & Logout Button */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-dark/80 border border-white/10 text-xs text-bone/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Officer Live</span>
          </div>
          <Button variant="outline-dark" onClick={logout} className="hover:bg-frosted-glass text-xs h-9">
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            Sign Out
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-bone p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed top-24 left-4 right-4 bg-black/95 backdrop-blur-xl border border-accent-teal/30 rounded-2xl p-6 flex flex-col space-y-4 shadow-2xl z-40 md:hidden text-bone"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate font-medium">Bank Officer Portal</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-accent-teal/20 text-accent-teal font-semibold">Underwriter</span>
            </div>

            <div className="flex flex-col space-y-2">
              {BANK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "bg-accent-teal/20 text-bone border border-accent-teal/30"
                      : "text-bone/70 hover:text-bone hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button
                variant="outline-dark"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  logout()
                }}
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut className="size-4" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
