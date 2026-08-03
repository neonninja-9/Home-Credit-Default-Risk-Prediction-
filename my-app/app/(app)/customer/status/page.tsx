"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  User,
  DollarSign,
  Calendar,
  Building2,
  AlertCircle,
} from "lucide-react";

function StatusContent() {
  const searchParams = useSearchParams();
  const [loanIdInput, setLoanIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchStatus = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setNotFound(false);

    try {
      const res = await fetch(`/api/applications/${id.trim()}`);
      if (!res.ok) {
        setNotFound(true);
        setApplication(null);
        return;
      }
      const data = await res.json();
      setApplication(data);
    } catch (err) {
      console.error(err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const paramId = searchParams.get("loanId");
    if (paramId) {
      setLoanIdInput(paramId);
      fetchStatus(paramId);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (loanIdInput) {
      fetchStatus(loanIdInput);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header */}
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
          Track Your Application
        </h1>
        <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
          Enter your Loan ID (e.g. <span className="font-mono text-white/80">HC-849204</span>) to view your current review status and underwriter remarks.
        </p>
      </div>

      {/* Search Input Box */}
      <Card className="p-6 bg-surface-dark border border-white/10 rounded-2xl shadow-xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              required
              value={loanIdInput}
              onChange={(e) => setLoanIdInput(e.target.value)}
              placeholder="Enter Loan ID (e.g. HC-849204)"
              className="pl-10 bg-canvas-dark border-white/10 text-white font-mono h-11"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="sm:w-36 h-11 bg-dusk-violet hover:bg-dusk-violet/90 text-white font-medium rounded-xl"
          >
            {loading ? "Searching..." : "Track Status"}
          </Button>
        </form>
      </Card>

      {/* Not Found Alert */}
      {notFound && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 flex items-center gap-3 text-sm"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">No application found for Loan ID &ldquo;{loanIdInput}&rdquo;</p>
            <p className="text-xs text-rose-300/80">Please check the ID and try again, or check your eligibility to submit a new application.</p>
          </div>
        </motion.div>
      )}

      {/* Application Status Card */}
      <AnimatePresence>
        {application && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <Card className="p-6 md:p-8 bg-surface-dark border border-white/15 rounded-2xl shadow-2xl space-y-6">
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-white/50">Loan Reference:</span>
                    <span className="font-mono text-sm font-semibold text-white bg-white/5 px-2 py-0.5 rounded">
                      {application.loanId}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{application.applicantName}</h2>
                </div>

                <Badge
                  className={`text-sm px-4 py-1.5 rounded-full border font-semibold ${
                    application.status === "APPROVED"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : application.status === "REJECTED"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  }`}
                >
                  {application.status === "APPROVED" && <CheckCircle2 className="w-4 h-4 mr-1.5" />}
                  {application.status === "PENDING" && <Clock className="w-4 h-4 mr-1.5 animate-spin" />}
                  {application.status === "REJECTED" && <XCircle className="w-4 h-4 mr-1.5" />}
                  {application.status === "PENDING" ? "Underwriting Review Pending" : application.status}
                </Badge>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-canvas-dark border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Loan Amount</span>
                  </div>
                  <p className="text-lg font-bold text-white font-mono">
                    ${application.loanAmount?.toLocaleString()}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-canvas-dark border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <DollarSign className="w-3.5 h-3.5 text-dusk-violet" />
                    <span>Est. Annuity</span>
                  </div>
                  <p className="text-lg font-bold text-white font-mono">
                    ${application.loanAnnuity?.toLocaleString()}/yr
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-canvas-dark border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Application Date</span>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {new Date(application.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-canvas-dark border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Risk Profile</span>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {application.riskLevel} Risk ({(application.defaultProbability * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>

              {/* Bank Remarks Section */}
              <div className="p-4 rounded-xl bg-canvas-dark/80 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="flex items-center gap-1.5 font-medium text-white/70">
                    <Building2 className="w-3.5 h-3.5 text-accent-teal" />
                    Bank Underwriter Remarks
                  </span>
                  {application.reviewedAt && (
                    <span>Reviewed {new Date(application.reviewedAt).toLocaleDateString()}</span>
                  )}
                </div>
                <p className="text-sm text-white/90 italic">
                  {application.bankRemarks || "Your application is currently queued for loan officer review. Check back soon for updates."}
                </p>
                {application.reviewedBy && (
                  <p className="text-[11px] text-white/40">Reviewing Officer: {application.reviewedBy}</p>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StatusCheck() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-white/50 text-sm">Loading application status...</div>}>
      <StatusContent />
    </Suspense>
  );
}
