"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useParams, useRouter } from "next/navigation";

export default function ApplicationReview() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="outline-dark" className="px-3" onClick={() => router.back()}>
          ← Back
        </Button>
        <h1 className="text-2xl font-display font-bold text-white">Application Review: <span className="font-mono text-primary">{appId}</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer Details */}
        <Card className="p-6 bg-surface-dark border-white/10 lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Customer Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/50">Full Name</p>
              <p className="font-medium text-white">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Age</p>
              <p className="font-medium text-white">30</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Employment</p>
              <p className="font-medium text-white">Salaried (5 Years)</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Annual Income</p>
              <p className="font-medium text-white">$50,000</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2 pt-4">Loan Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/50">Requested Amount</p>
              <p className="font-medium text-white">$10,000</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Annuity</p>
              <p className="font-medium text-white">$500/mo</p>
            </div>
          </div>
        </Card>

        {/* ML Prediction & Actions */}
        <div className="space-y-6">
          <Card className="p-6 bg-surface-dark border-white/10 flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Model Prediction</h2>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Risk Score</span>
              <span className="font-bold text-emerald-400">12% (Low)</span>
            </div>
            
            <div className="pt-2">
              <p className="text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Key SHAP Contributors</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Income Ratio</span>
                  <span className="text-emerald-400">-0.24</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Years Employed</span>
                  <span className="text-emerald-400">-0.15</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-surface-dark border-white/10 flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Staff Decision</h2>
            <textarea 
              className="w-full bg-canvas-dark border border-white/10 rounded-md p-3 text-sm text-white placeholder-white/30 min-h-[100px] focus:outline-none focus:border-primary/50"
              placeholder="Add review remarks here..."
            />
            <div className="flex gap-3">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white border-none">Approve</Button>
              <Button variant="outline-dark" className="flex-1 text-rose-500 border-rose-500/30 hover:bg-rose-500/10">Reject</Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
