"use client"

import { useAuth } from "@/context/AuthContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { FileText, TrendingUp, AlertTriangle } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="heading-lg mb-2">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="body-md text-on-dark-mute">
            Here&apos;s an overview of your recent risk assessments.
          </p>
        </div>
        <Link href="/dashboard/predictions/new">
          <Button variant="primary">New Prediction</Button>
        </Link>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card variant="glass" className="p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-on-dark-mute mb-2">
            <FileText size={18} />
            <span className="body-sm font-medium">Total Predictions</span>
          </div>
          <div className="display-md">0</div>
          <p className="caption text-on-dark-mute mt-2">Since you joined</p>
        </Card>
        
        <Card variant="glass" className="p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-on-dark-mute mb-2">
            <AlertTriangle size={18} className="text-accent-warning" />
            <span className="body-sm font-medium">High Risk Found</span>
          </div>
          <div className="display-md">0</div>
          <p className="caption text-on-dark-mute mt-2">Across all assessments</p>
        </Card>
        
        <Card variant="glass" className="p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-on-dark-mute mb-2">
            <TrendingUp size={18} className="text-accent-teal" />
            <span className="body-sm font-medium">Avg Default Prob.</span>
          </div>
          <div className="display-md">--%</div>
          <p className="caption text-on-dark-mute mt-2">Based on your history</p>
        </Card>
      </div>
      
      {/* Empty State placeholder for Phase 2 */}
      <div className="w-full mt-8 rounded-lg border border-hairline-dark bg-surface-elevated border-dashed p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-surface-soft flex items-center justify-center mb-6 text-on-dark-mute">
          <FileText size={32} />
        </div>
        <h3 className="heading-sm mb-2">No predictions yet</h3>
        <p className="body-sm text-on-dark-mute max-w-md mb-6">
          You haven&apos;t run any credit risk assessments yet. Create your first prediction to see analytics and history.
        </p>
        <Link href="/dashboard/predictions/new">
          <Button variant="outline-dark">Run a test prediction</Button>
        </Link>
      </div>
    </div>
  )
}
