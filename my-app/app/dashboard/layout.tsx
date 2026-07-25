"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  BarChart3, 
  Settings, 
  LogOut 
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, logout, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 0)
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!mounted || !isAuthenticated) {
    return null // or a loading spinner
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "New Prediction", href: "/dashboard/predictions/new", icon: FileText },
    { name: "History", href: "/dashboard/predictions", icon: History },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Profile", href: "/dashboard/profile", icon: Settings },
  ]

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-canvas-dark text-on-dark">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-hairline-dark bg-canvas-dark p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="mb-8">
            <h2 className="heading-sm mb-1">{user?.name}</h2>
            <p className="caption text-on-dark-mute">{user?.email}</p>
          </div>
          
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                              (item.href !== "/dashboard" && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg body-sm transition-colors ${
                    isActive 
                      ? "bg-surface-elevated text-primary font-medium" 
                      : "text-on-dark hover:bg-surface-elevated"
                  }`}
                >
                  <item.icon size={18} className={isActive ? "text-primary" : "text-on-dark-mute"} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div>
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg body-sm text-on-dark hover:bg-surface-elevated hover:text-accent-danger transition-colors w-full"
          >
            <LogOut size={18} className="text-on-dark-mute" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
  )
}
