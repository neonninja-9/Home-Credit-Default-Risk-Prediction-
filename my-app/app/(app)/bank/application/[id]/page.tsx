"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  DollarSign,
  Briefcase,
  Home,
  Check,
  Clock,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function ApplicationReview() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;

  const [application, setApplication] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [decisionSuccess, setDecisionSuccess] = useState<string | null>(null);

  const fetchApplication = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/applications/${appId}`);
      if (res.ok) {
        const data = await res.json();
        setApplication(data);
        if (data.bankRemarks) {
          setRemarks(data.bankRemarks);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [appId]);

  const handleDecision = async (decision: "APPROVED" | "REJECTED") => {
    setUpdating(true);
    setDecisionSuccess(null);

    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: decision,
          bankRemarks: remarks,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setApplication(updated);
        setDecisionSuccess(`Application marked as ${decision}`);
        setTimeout(() => setDecisionSuccess(null), 4000);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit decision");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-white/50 text-sm">
        Loading application details from PostgreSQL...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-rose-400 font-semibold">Application not found for ID: {appId}</p>
        <Button onClick={() => router.push("/bank")} variant="outline-dark">
          Return to Applications Queue
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline-dark"
            className="px-3 text-white border-white/20 hover:bg-white/5"
            onClick={() => router.push("/bank")}
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Queue
          </Button>
          <div>
            <span className="text-xs text-white/50 block">Underwriting Dossier</span>
            <h1 className="text-2xl font-display font-bold text-white font-mono">
              {application.loanId || application.id}
            </h1>
          </div>
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
          {application.status === "PENDING" && <Clock className="w-4 h-4 mr-1.5" />}
          {application.status === "REJECTED" && <XCircle className="w-4 h-4 mr-1.5" />}
          {application.status}
        </Badge>
      </div>

      {decisionSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2 font-medium"
        >
          <Check className="w-4 h-4" /> {decisionSuccess}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Applicant Demographics & Financials */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Demographics Card */}
          <Card className="p-6 bg-surface-dark border-white/10 space-y-6 rounded-2xl">
            <h2 className="text-base font-semibold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-dusk-violet" />
              Applicant Profile & Household
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-white/50">Full Name</p>
                <p className="font-semibold text-white">{application.applicantName}</p>
              </div>
              <div>
                <p className="text-xs text-white/50">Age & Gender</p>
                <p className="font-medium text-white">{application.age} yrs • {application.gender === "M" ? "Male" : "Female"}</p>
              </div>
              <div>
                <p className="text-xs text-white/50">Marital Status</p>
                <p className="font-medium text-white">{application.maritalStatus}</p>
              </div>
              <div>
                <p className="text-xs text-white/50">Education</p>
                <p className="font-medium text-white">{application.education}</p>
              </div>
              <div>
                <p className="text-xs text-white/50">Employment</p>
                <p className="font-medium text-white">{application.employmentType} ({application.yearsEmployed} yrs)</p>
              </div>
              <div>
                <p className="text-xs text-white/50">Household Members</p>
                <p className="font-medium text-white">{application.familyMembers} members ({application.children} children)</p>
              </div>
            </div>

            <h2 className="text-base font-semibold text-white border-b border-white/10 pb-3 pt-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Financials & Loan Request
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-canvas-dark rounded-xl border border-white/5">
                <p className="text-xs text-white/50">Annual Income</p>
                <p className="font-bold text-white font-mono">${application.annualIncome?.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-canvas-dark rounded-xl border border-white/5">
                <p className="text-xs text-white/50">Requested Loan</p>
                <p className="font-bold text-emerald-400 font-mono">${application.loanAmount?.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-canvas-dark rounded-xl border border-white/5">
                <p className="text-xs text-white/50">Est. Annuity</p>
                <p className="font-bold text-white font-mono">${application.loanAnnuity?.toLocaleString()}/yr</p>
              </div>
              <div className="p-3 bg-canvas-dark rounded-xl border border-white/5">
                <p className="text-xs text-white/50">Goods Price</p>
                <p className="font-bold text-white font-mono">${application.goodsPrice?.toLocaleString()}</p>
              </div>
            </div>

            {/* Assets */}
            <div className="flex gap-4 pt-1">
              <span className={`text-xs px-3 py-1 rounded-full border ${application.ownRealty ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" : "bg-white/5 text-white/50 border-white/10"}`}>
                Real Estate: {application.ownRealty ? "Owner" : "None"}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full border ${application.ownCar ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" : "bg-white/5 text-white/50 border-white/10"}`}>
                Vehicle: {application.ownCar ? "Owner" : "None"}
              </span>
            </div>
          </Card>

          {/* SHAP Factors */}
          {application.shapValues && (
            <Card className="p-6 bg-surface-dark border-white/10 space-y-4 rounded-2xl">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent-teal" />
                SHAP Risk Factor Contribution
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.isArray(application.shapValues) &&
                  application.shapValues.map((shap: any, idx: number) => (
                    <div key={idx} className="p-3 bg-canvas-dark rounded-lg border border-white/5 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-medium text-white">{shap.feature}</p>
                        <p className="text-[11px] text-white/50">{shap.desc || shap.value}</p>
                      </div>
                      <span className={shap.impact === "negative" ? "text-emerald-400 font-mono" : "text-rose-400 font-mono"}>
                        {shap.impact === "negative" ? "Favorable" : "Risk Factor"}
                      </span>
                    </div>
                  ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right 1 Col: Model Assessment & Decisioning Desk */}
        <div className="space-y-6">
          {/* AI Recommendation Card */}
          <Card className="p-6 bg-surface-dark border-white/10 space-y-4 rounded-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-semibold text-white">AI Risk Verdict</h3>
              <Badge className={
                application.riskLevel === "Low" ? "bg-emerald-500/20 text-emerald-300" :
                application.riskLevel === "High" ? "bg-rose-500/20 text-rose-300" :
                "bg-amber-500/20 text-amber-300"
              }>
                {application.riskLevel} Risk
              </Badge>
            </div>

            <div>
              <p className="text-xs text-white/50 mb-1">Calculated Default Probability</p>
              <p className={`text-2xl font-bold font-mono ${
                application.riskLevel === "Low" ? "text-emerald-400" :
                application.riskLevel === "High" ? "text-rose-400" :
                "text-amber-400"
              }`}>
                {(application.defaultProbability * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-3 rounded-xl bg-canvas-dark border border-white/5">
              <p className="text-xs text-white/50 mb-1">System Recommendation</p>
              <p className="text-sm font-medium text-white">{application.recommendation}</p>
            </div>
          </Card>

          {/* Underwriting Action Desk */}
          <Card className="p-6 bg-surface-dark border-accent-teal/30 space-y-4 rounded-2xl shadow-xl">
            <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
              Loan Officer Decision
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs text-white/70">Officer Remarks & Notes</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add formal justification or underwriting remarks..."
                className="w-full bg-canvas-dark border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 min-h-[110px] focus:outline-none focus:border-accent-teal"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => handleDecision("APPROVED")}
                disabled={updating}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-void-canvas font-bold rounded-xl h-11 transition-all"
              >
                Approve Loan
              </Button>
              <Button
                onClick={() => handleDecision("REJECTED")}
                disabled={updating}
                variant="outline-dark"
                className="flex-1 text-rose-400 border-rose-500/40 hover:bg-rose-500/10 font-bold rounded-xl h-11 transition-all"
              >
                Reject Loan
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
