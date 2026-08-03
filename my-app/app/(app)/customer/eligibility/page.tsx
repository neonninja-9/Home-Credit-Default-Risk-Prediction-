"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export default function EligibilityCheck() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push("/customer/prediction");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-3xl font-display font-bold tracking-tight text-white">Eligibility Check</h1>
        <p className="text-white/60">Enter your personal and financial details to check your risk profile.</p>
      </div>

      <Card className="p-6 md:p-8 bg-surface-dark border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white border-b border-white/10 pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/80">Full Name</label>
                <Input required placeholder="John Doe" className="bg-canvas-dark border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/80">Age</label>
                <Input required type="number" placeholder="30" className="bg-canvas-dark border-white/10" />
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-white border-b border-white/10 pb-2 mt-6">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/80">Annual Income</label>
                <Input required type="number" placeholder="50000" className="bg-canvas-dark border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/80">Requested Loan Amount</label>
                <Input required type="number" placeholder="10000" className="bg-canvas-dark border-white/10" />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full py-6 text-lg" disabled={loading}>
            {loading ? "Analyzing Profile..." : "Evaluate Risk Profile"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
