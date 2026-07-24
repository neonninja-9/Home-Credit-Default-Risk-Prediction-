"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { Menu, X, ArrowUpRight, BookOpen, Building2, ChartNoAxesColumn, Rocket, Sparkles, Users } from "lucide-react"
import { useState, useEffect } from "react"
import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuLink,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
} from "@/components/ui/motion-navigation-menu"

const PRODUCTS = [
  { title: "Analytics", desc: "Live funnels, cohorts, and retention." },
  { title: "Automation", desc: "Trigger workflows from events." },
  { title: "Insights", desc: "AI recommendations for next steps." },
  { title: "Reports", desc: "Share snapshots with stakeholders." },
];

const SOLUTIONS = [
  { title: "Startups", desc: "Launch dashboards without building infra.", icon: Rocket },
  { title: "Agencies", desc: "Manage every client workspace from one view.", icon: Users },
  { title: "Enterprise", desc: "SAML, audit logs, SLAs, and permissions.", icon: Building2 },
];

const RESOURCES = [
  { title: "Documentation", desc: "Guides and API reference." },
  { title: "Changelog", desc: "What shipped this month." },
  { title: "Blog", desc: "Engineering and product notes." },
];

const highlightClassName = "bg-white/10 rounded-lg";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
          "pointer-events-auto text-on-dark flex items-center justify-between transition-all duration-500",
          "bg-canvas-dark/40 backdrop-blur-lg",
          isScrolled 
            ? "h-14 max-w-[1000px] w-[calc(100%-2rem)] rounded-full mt-4 px-6 lg:px-8 shadow-2xl shadow-black/50" 
            : "h-20 max-w-full w-full rounded-none mt-0 px-6 lg:px-24"
        )}
      >
        <div className="flex items-center">
        <Link href="/" className="font-display font-semibold text-xl tracking-tight mr-8">
          CreditLens
        </Link>
        
        {/* Desktop Nav - Motion Navigation Menu */}
        <div className="hidden lg:block">
          <MotionNavigationMenu
            viewportClassName="bg-canvas-dark/60 backdrop-blur-xl border border-hairline-dark rounded-xl shadow-2xl"
          >
            <MotionNavigationMenuList highlightClassName="bg-white/10 rounded-md">
              
              {!isAuthenticated ? (
                <>
                  <MotionNavigationMenuItem value="products">
                    <MotionNavigationMenuTrigger className="text-on-dark hover:text-primary hover:bg-surface-elevated">Products</MotionNavigationMenuTrigger>
                    <MotionNavigationMenuContent highlightClassName={highlightClassName}>
                      <div className="grid w-[500px] grid-cols-[1fr_1.25fr] gap-2">
                        <MotionNavigationMenuLink
                          href="#"
                          className="bg-surface-elevated rounded-lg min-h-44 justify-between p-4"
                        >
                          <span className="bg-canvas-dark flex size-9 items-center justify-center rounded-lg border border-hairline-dark">
                            <ChartNoAxesColumn className="size-4" />
                          </span>
                          <span className="space-y-1">
                            <span className="block text-sm font-medium">Command center</span>
                            <span className="text-on-dark-mute block text-xs">
                              Monitor product growth, workflow health, and team output.
                            </span>
                          </span>
                        </MotionNavigationMenuLink>
                        <div className="grid grid-cols-2 gap-0.5">
                          {PRODUCTS.map((product) => (
                            <MotionNavigationMenuLink key={product.title} href="#">
                              <span className="flex items-center justify-between gap-2 text-sm font-medium">
                                {product.title}
                                <ArrowUpRight className="size-3 text-on-dark-mute" />
                              </span>
                              <span className="text-on-dark-mute text-xs">
                                {product.desc}
                              </span>
                            </MotionNavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </MotionNavigationMenuContent>
                  </MotionNavigationMenuItem>

                  <MotionNavigationMenuItem value="solutions">
                    <MotionNavigationMenuTrigger className="text-on-dark hover:text-primary hover:bg-surface-elevated">Solutions</MotionNavigationMenuTrigger>
                    <MotionNavigationMenuContent highlightClassName={highlightClassName}>
                      <div className="w-[380px] space-y-1">
                        <div className="text-on-dark-mute px-2 py-2 text-xs font-medium">
                          Built for teams
                        </div>
                        {SOLUTIONS.map((solution) => (
                          <MotionNavigationMenuLink
                            key={solution.title}
                            href="#"
                            className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
                          >
                            <span className="bg-transparent flex size-8 items-center justify-center rounded-lg">
                              <solution.icon className="size-4.5 text-on-dark" />
                            </span>
                            <span className="space-y-0.5">
                              <span className="block text-sm font-medium">
                                For {solution.title.toLowerCase()}
                              </span>
                              <span className="text-on-dark-mute block text-xs">
                                {solution.desc}
                              </span>
                            </span>
                          </MotionNavigationMenuLink>
                        ))}
                      </div>
                    </MotionNavigationMenuContent>
                  </MotionNavigationMenuItem>
                  
                  <MotionNavigationMenuItem value="resources">
                    <MotionNavigationMenuTrigger className="text-on-dark hover:text-primary hover:bg-surface-elevated">Resources</MotionNavigationMenuTrigger>
                    <MotionNavigationMenuContent highlightClassName={highlightClassName}>
                      <div className="grid w-[460px] grid-cols-2 gap-2">
                        <div className="space-y-0.5">
                          {RESOURCES.map((resource) => (
                            <MotionNavigationMenuLink key={resource.title} href="#">
                              <span className="flex items-center gap-2 text-sm font-medium">
                                <BookOpen className="size-3.5" />
                                {resource.title}
                              </span>
                              <span className="text-on-dark-mute text-xs">
                                {resource.desc}
                              </span>
                            </MotionNavigationMenuLink>
                          ))}
                        </div>
                        <MotionNavigationMenuLink
                          href="#"
                          className="bg-surface-elevated min-h-44 justify-between p-4"
                        >
                          <span className="flex items-center gap-2 text-sm font-medium">
                            <Sparkles className="size-4" />
                            New release
                          </span>
                          <span className="text-on-dark-mute text-xs">
                            Explore the latest workflow templates and API improvements.
                          </span>
                          <span className="text-xs font-medium">Read changelog</span>
                        </MotionNavigationMenuLink>
                      </div>
                    </MotionNavigationMenuContent>
                  </MotionNavigationMenuItem>

                  <MotionNavigationMenuItem>
                    <MotionNavigationMenuLink href="#features" className="flex h-9 items-center px-4 py-2 text-sm font-medium text-on-dark hover:bg-surface-elevated rounded-md">
                      Features
                    </MotionNavigationMenuLink>
                  </MotionNavigationMenuItem>
                  
                  <MotionNavigationMenuItem>
                    <MotionNavigationMenuLink href="#how-it-works" className="flex h-9 items-center px-4 py-2 text-sm font-medium text-on-dark hover:bg-surface-elevated rounded-md">
                      How it works
                    </MotionNavigationMenuLink>
                  </MotionNavigationMenuItem>
                </>
              ) : (
                <>
                  <MotionNavigationMenuItem>
                    <MotionNavigationMenuLink href="/dashboard" className="flex h-9 items-center px-4 py-2 text-sm font-medium text-on-dark hover:bg-surface-elevated rounded-md">
                      Dashboard
                    </MotionNavigationMenuLink>
                  </MotionNavigationMenuItem>
                  
                  <MotionNavigationMenuItem>
                    <MotionNavigationMenuLink href="/dashboard/predictions" className="flex h-9 items-center px-4 py-2 text-sm font-medium text-on-dark hover:bg-surface-elevated rounded-md">
                      Predictions
                    </MotionNavigationMenuLink>
                  </MotionNavigationMenuItem>
                  
                  <MotionNavigationMenuItem>
                    <MotionNavigationMenuLink href="/dashboard/analytics" className="flex h-9 items-center px-4 py-2 text-sm font-medium text-on-dark hover:bg-surface-elevated rounded-md">
                      Analytics
                    </MotionNavigationMenuLink>
                  </MotionNavigationMenuItem>
                </>
              )}
            </MotionNavigationMenuList>
          </MotionNavigationMenu>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="button-sm hover:text-primary transition-colors">Log in</Link>
            <Link href="/register">
              <Button variant="primary">Get started</Button>
            </Link>
          </>
        ) : (
          <Button variant="outline-dark" onClick={logout}>Log out</Button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden text-on-dark"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-canvas-dark border-b border-hairline-dark p-6 flex flex-col gap-6 lg:hidden">
          {!isAuthenticated ? (
            <>
              <Link href="#features" className="button-md" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
              <Link href="#how-it-works" className="button-md" onClick={() => setIsMobileMenuOpen(false)}>How it works</Link>
              <div className="h-[1px] w-full bg-hairline-dark my-2"></div>
              <Link href="/login" className="button-md" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">Get started</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="button-md" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <Link href="/dashboard/predictions" className="button-md" onClick={() => setIsMobileMenuOpen(false)}>Predictions</Link>
              <Link href="/dashboard/analytics" className="button-md" onClick={() => setIsMobileMenuOpen(false)}>Analytics</Link>
              <div className="h-[1px] w-full bg-hairline-dark my-2"></div>
              <Button variant="outline-dark" className="w-full" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>Log out</Button>
            </>
          )}
        </div>
      )}
    </nav>
    </div>
  )
}
