"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { href: "/customer", label: "Portal" },
  { href: "/customer/eligibility", label: "Check Eligibility" },
  { href: "/bank", label: "Bank Review" },
]

export function AppNavbar() {
  const { logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
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
            ? "bg-graphite/80 h-14 max-w-[1000px] w-[calc(100%-2rem)] rounded-2xl mt-4 border border-hairline px-6 lg:px-8 shadow-subtle"
            : "bg-transparent h-20 max-w-full w-full rounded-none mt-0 px-6 lg:px-24"
        )}
      >
        <div className="flex items-center gap-1">
          <Link href="/customer" className="font-display font-semibold text-xl tracking-tight mr-6 flex-shrink-0">
            <span className="inline-flex animate-text-shine bg-[linear-gradient(110deg,#b5b5b5,45%,#ffffff,55%,#b5b5b5)] bg-[length:200%_100%] bg-clip-text text-transparent repeat-infinite">
              CreditLens
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "text-bone bg-frosted-glass"
                    : "text-bone/70 hover:text-bone hover:bg-frosted-glass"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <Button variant="outline-dark" onClick={logout}>Log out</Button>
        </div>
      </nav>
    </div>
  )
}
