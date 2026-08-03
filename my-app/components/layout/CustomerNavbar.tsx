"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut } from "lucide-react"

const CUSTOMER_LINKS = [
  { href: "/customer", label: "Home" },
  { href: "/customer/eligibility", label: "Eligibility" },
  { href: "/customer/status", label: "Applications" },
]

export function CustomerNavbar() {
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
            ? "bg-graphite/80 h-14 max-w-[1050px] w-[calc(100%-2rem)] rounded-2xl mt-4 border border-hairline px-6 lg:px-8 shadow-subtle"
            : "bg-transparent h-20 max-w-full w-full rounded-none mt-0 px-6 lg:px-20"
        )}
      >
        <div className="flex items-center gap-6">
          <Link href="/customer" className="flex items-center gap-2.5">
            <span className="font-display font-bold text-lg tracking-tight inline-flex animate-text-shine bg-[linear-gradient(110deg,#b5b5b5,45%,#ffffff,55%,#b5b5b5)] bg-[length:200%_100%] bg-clip-text text-transparent repeat-infinite">
              CreditLens
            </span>
          </Link>

          {/* Desktop Nav Items with Sliding Hover Pill */}
          <div
            className="hidden md:flex items-center gap-0.5 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {CUSTOMER_LINKS.map((link, idx) => {
              const isActive = pathname === link.href
              const isHovered = hoveredIndex === idx

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 z-10",
                    isActive ? "text-bone" : "text-bone/60 hover:text-bone"
                  )}
                >
                  {isHovered && (
                    <motion.div
                      layoutId="customer-nav-hover-pill"
                      className="absolute inset-0 bg-frosted-glass rounded-lg z-[-1]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                    />
                  )}

                  {isActive && !isHovered && (
                    <motion.div
                      layoutId="customer-nav-active-pill"
                      className="absolute inset-0 bg-frosted-glass rounded-lg z-[-2] border border-white/5"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Desktop Sign Out */}
        <div className="hidden md:flex items-center">
          <Button
            variant="outline-dark"
            onClick={logout}
            className="hover:bg-frosted-glass text-xs h-9 rounded-lg border-hairline/60"
          >
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
            className="pointer-events-auto fixed top-24 left-4 right-4 bg-graphite/95 backdrop-blur-xl border border-hairline rounded-2xl p-6 flex flex-col space-y-4 shadow-2xl z-40 md:hidden text-bone"
          >
            <div className="flex flex-col space-y-1">
              {CUSTOMER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "bg-frosted-glass text-bone"
                      : "text-bone/70 hover:text-bone hover:bg-frosted-glass"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-hairline">
              <Button
                variant="outline-dark"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  logout()
                }}
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
