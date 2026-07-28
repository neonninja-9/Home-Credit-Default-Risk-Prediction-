"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { useState } from "react";

export default function PredictionResult() {
  const [applied, setApplied] = useState(false);

  return (
    <div className="max-w-4xl mx-auto flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Risk Assessment</h1>
          <p className="text-white/60">Based on the provided information, here is the model's prediction.</p>
        </div>
        {!applied ? (
          <Button onClick={() => setApplied(true)} className="bg-primary hover:bg-primary-hover px-8">
            Apply for Loan
          </Button>
        ) : (
          <Badge className="bg-accent-teal text-white border-none py-2 px-4 text-sm">
            Application Submitted
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 col-span-1 bg-surface-dark border-white/10 flex flex-col items-center justify-center text-center space-y-2">
          <p className="text-sm font-medium text-white/60 uppercase tracking-wider">Risk Level</p>
          <p className="text-4xl font-bold text-emerald-400">Low</p>
          <p className="text-sm text-white/40 mt-2">Default Probability: 12%</p>
        </Card>

        <Card className="p-6 col-span-1 md:col-span-2 bg-surface-dark border-white/10 space-y-4">
          <h3 className="text-lg font-semibold text-white">SHAP Explanation</h3>
          <p className="text-white/60 text-sm">
            The following factors contributed to the low risk prediction:
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Income to Loan Ratio</span>
              <span className="text-sm text-emerald-400">-0.24 (Decreases Risk)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Years Employed</span>
              <span className="text-sm text-emerald-400">-0.15 (Decreases Risk)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Age Group</span>
              <span className="text-sm text-rose-400">+0.05 (Increases Risk)</span>
            </div>
          </div>
        </Card>
      </div>

      {applied && (
        <Card className="p-6 bg-accent-teal/10 border-accent-teal/30 flex flex-col items-center text-center space-y-4">
          <h3 className="text-xl font-semibold text-white">Success!</h3>
          <p className="text-white/70">
            Your application has been submitted and is currently <span className="font-semibold text-accent-teal">Pending</span>.
          </p>
          <div className="p-4 bg-canvas-dark rounded-md border border-white/10 inline-block mt-2">
            <p className="text-sm text-white/50 mb-1">Your Loan ID</p>
            <p className="text-lg font-mono text-white tracking-widest">LND-8492-X</p>
          </div>
          <Link href="/customer">
            <Button variant="outline-dark" className="mt-4">Return to Dashboard</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
