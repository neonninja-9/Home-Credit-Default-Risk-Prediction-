"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function BankDashboard() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Application Management</h1>
          <p className="text-white/60">Search and review customer loan applications.</p>
        </div>
        <div className="flex gap-2">
          <Input 
            placeholder="Search by Loan ID or Customer ID..." 
            className="w-full md:w-80 bg-canvas-dark border-white/10"
          />
          <Button variant="dark">Search</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
        
        <div className="grid gap-4">
          {[
            { id: "LND-8492-X", name: "John Doe", amount: "$10,000", risk: "Low", status: "Pending" },
            { id: "LND-3341-Y", name: "Jane Smith", amount: "$45,000", risk: "High", status: "Rejected" },
            { id: "LND-9921-Z", name: "Robert Johnson", amount: "$5,000", risk: "Medium", status: "Approved" },
          ].map((app) => (
            <Link key={app.id} href={`/bank/application/${app.id}`}>
              <Card className="p-4 md:p-6 bg-surface-dark border-white/10 hover:border-primary/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Loan ID</p>
                    <p className="font-mono text-white/90">{app.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Customer Name</p>
                    <p className="font-medium text-white/90">{app.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Amount</p>
                    <p className="font-medium text-white/90">{app.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Risk Model Prediction</p>
                    <p className={app.risk === "Low" ? "text-emerald-400 font-medium" : app.risk === "High" ? "text-rose-400 font-medium" : "text-amber-400 font-medium"}>
                      {app.risk} Risk
                    </p>
                  </div>
                </div>
                <div>
                  <Badge className={
                    app.status === "Pending" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" :
                    app.status === "Approved" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
                    "bg-rose-500/20 text-rose-300 border-rose-500/30"
                  }>
                    {app.status}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
