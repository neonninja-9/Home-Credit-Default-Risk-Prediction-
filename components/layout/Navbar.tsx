"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import Magnet from "@/components/special-effects/magnet"
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
  { title: "Analytics", desc: "Live funnels, cohorts, and retention.", link: "http://localhost:3001" },
  { title: "Automation", desc: "Trigger workflows from events.", link: "http://localhost:3001/dashboard/automation" },
  { title: "Insights", desc: "AI recommendations for next steps.", link: "http://localhost:3001/dashboard/insights" },
  { title: "Reports", desc: "Share snapshots with stakeholders.", link: "http://localhost:3001/dashboard/reports" },
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

const highlightClassName = "bg-frosted-glass rounded-lg";

export function Navbar() {
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
          "pointer-events-auto text-bone flex items-center justify-between transition-all duration-500",
          "backdrop-blur-lg",
          isScrolled
            ? "bg-graphite/80 h-14 max-w-[1000px] w-[calc(100%-2rem)] rounded-2xl mt-4 border border-hairline px-6 lg:px-8 shadow-subtle"
            : "bg-transparent h-20 max-w-full w-full rounded-none mt-0 px-6 lg:px-24"
        )}
      >
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="font-display font-semibold text-xl tracking-tight mr-4 lg:mr-8 flex-shrink-0">
            <span className="inline-flex animate-text-shine bg-[linear-gradient(110deg,#b5b5b5,45%,#ffffff,55%,#b5b5b5)] bg-[length:200%_100%] bg-clip-text text-transparent repeat-infinite">
              CreditLens
            </span>
          </Link>

          {/* Desktop Nav - Motion Navigation Menu */}
          <div className="hidden lg:block">
            <MotionNavigationMenu
              viewportClassName="bg-graphite/50 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
            >
              <MotionNavigationMenuList highlightClassName="bg-frosted-glass rounded-md">
                <MotionNavigationMenuItem value="products">
                  <MotionNavigationMenuTrigger className="text-bone hover:opacity-80 data-[state=open]:opacity-80 hover:bg-graphite data-[state=open]:bg-graphite">Products</MotionNavigationMenuTrigger>
                  <MotionNavigationMenuContent highlightClassName={highlightClassName}>
                    <div className="grid w-[500px] grid-cols-[1fr_1.25fr] gap-2">
                      <MotionNavigationMenuLink
                        href="#"
                        className="bg-graphite rounded-lg min-h-44 justify-between p-4"
                      >
                        <span className="bg-void-canvas flex size-9 items-center justify-center rounded-lg border border-hairline">
                          <ChartNoAxesColumn className="size-4" />
                        </span>
                        <span className="space-y-1">
                          <span className="block text-sm font-medium">Command center</span>
                          <span className="text-slate block text-xs">
                            Monitor product growth, workflow health, and team output.
                          </span>
                        </span>
                      </MotionNavigationMenuLink>
                      <div className="grid grid-cols-2 gap-0.5">
                        {PRODUCTS.map((product) => (
                          <MotionNavigationMenuLink key={product.title} href={product.link}>
                            <span className="flex items-center justify-between gap-2 text-sm font-medium">
                              {product.title}
                              <ArrowUpRight className="size-3 text-slate" />
                            </span>
                            <span className="text-slate text-xs">
                              {product.desc}
                            </span>
                          </MotionNavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </MotionNavigationMenuContent>
                </MotionNavigationMenuItem>

                <MotionNavigationMenuItem value="solutions">
                  <MotionNavigationMenuTrigger className="text-bone hover:opacity-80 data-[state=open]:opacity-80 hover:bg-graphite data-[state=open]:bg-graphite">Solutions</MotionNavigationMenuTrigger>
                  <MotionNavigationMenuContent highlightClassName={highlightClassName}>
                    <div className="w-[380px] space-y-1">
                      <div className="text-slate px-2 py-2 text-xs font-medium">
                        Built for teams
                      </div>
                      {SOLUTIONS.map((solution) => (
                        <MotionNavigationMenuLink
                          key={solution.title}
                          href="#"
                          className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
                        >
                          <span className="bg-transparent flex size-8 items-center justify-center rounded-lg">
                            <solution.icon className="size-4.5 text-bone" />
                          </span>
                          <span className="space-y-0.5">
                            <span className="block text-sm font-medium">
                              For {solution.title.toLowerCase()}
                            </span>
                            <span className="text-slate block text-xs">
                              {solution.desc}
                            </span>
                          </span>
                        </MotionNavigationMenuLink>
                      ))}
                    </div>
                  </MotionNavigationMenuContent>
                </MotionNavigationMenuItem>

                <MotionNavigationMenuItem value="resources">
                  <MotionNavigationMenuTrigger className="text-bone hover:opacity-80 data-[state=open]:opacity-80 hover:bg-graphite data-[state=open]:bg-graphite">Resources</MotionNavigationMenuTrigger>
                  <MotionNavigationMenuContent highlightClassName={highlightClassName}>
                    <div className="grid w-[460px] grid-cols-2 gap-2">
                      <div className="space-y-0.5">
                        {RESOURCES.map((resource) => (
                          <MotionNavigationMenuLink key={resource.title} href="#">
                            <span className="flex items-center gap-2 text-sm font-medium">
                              <BookOpen className="size-3.5" />
                              {resource.title}
                            </span>
                            <span className="text-slate text-xs">
                              {resource.desc}
                            </span>
                          </MotionNavigationMenuLink>
                        ))}
                      </div>
                      <MotionNavigationMenuLink
                        href="#"
                        className="bg-graphite min-h-44 justify-between p-4"
                      >
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <Sparkles className="size-4" />
                          New release
                        </span>
                        <span className="text-slate text-xs">
                          Explore the latest workflow templates and API improvements.
                        </span>
                        <span className="text-xs font-medium">Read changelog</span>
                      </MotionNavigationMenuLink>
                    </div>
                  </MotionNavigationMenuContent>
                </MotionNavigationMenuItem>

                <MotionNavigationMenuItem>
                  <MotionNavigationMenuLink href="#features" className="flex h-9 items-center px-4 py-2 text-sm font-medium text-bone hover:bg-graphite rounded-md">
                    Features
                  </MotionNavigationMenuLink>
                </MotionNavigationMenuItem>

                <MotionNavigationMenuItem>
                  <MotionNavigationMenuLink href="#how-it-works" className="flex h-9 items-center px-4 py-2 text-sm font-medium text-bone hover:bg-graphite rounded-md">
                    How it works
                  </MotionNavigationMenuLink>
                </MotionNavigationMenuItem>
              </MotionNavigationMenuList>
            </MotionNavigationMenu>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/auth/login" className="text-sm font-semibold hover:text-primary transition-colors">Log in</Link>
          <Link href="/auth/signup">
            <Magnet padding={50} magnetStrength={3}>
              <Button variant="primary">Get started</Button>
            </Magnet>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-bone"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-void-canvas border-b border-hairline p-6 flex flex-col gap-6 lg:hidden">
            <Link href="#features" className="text-base font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link href="#how-it-works" className="text-base font-semibold" onClick={() => setIsMobileMenuOpen(false)}>How it works</Link>
            <div className="h-[1px] w-full bg-hairline-dark my-2"></div>
            <Link href="/auth/login" className="text-base font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
            <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <Magnet padding={30} magnetStrength={2}>
                <Button variant="primary" className="w-full">Get started</Button>
              </Magnet>
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}
