"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function StatusCheck() {
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-display font-bold tracking-tight text-white">Check Application Status</h1>
        <p className="text-white/60">Enter your Loan ID or Customer ID to view your current status.</p>
      </div>

      <Card className="p-6 bg-surface-dark border-white/10">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <Input 
            required 
            placeholder="Enter Loan ID or Customer ID (e.g. LND-8492-X)" 
            className="flex-1 bg-canvas-dark border-white/10 text-white" 
          />
          <Button type="submit" className="md:w-32">Search</Button>
        </form>
      </Card>

      {searched && (
        <Card className="p-6 bg-surface-dark border-white/10 space-y-6">
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-sm text-white/50 mb-1">Loan ID: LND-8492-X</p>
              <h2 className="text-2xl font-bold text-white">Application Details</h2>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Pending</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-white/50">Requested Amount</p>
              <p className="font-medium text-white">$10,000</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Date Applied</p>
              <p className="font-medium text-white">Oct 24, 2023</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-white/50">Bank Remarks</p>
              <p className="font-medium text-white/80 italic">Awaiting staff review.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
