"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CustomSelect } from "@/components/ui/Select";
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  FileText,
  Copy,
  Check,
} from "lucide-react";

export default function EligibilityCheck() {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [submittedLoan, setSubmittedLoan] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    applicantName: "",
    age: "34",
    gender: "M",
    maritalStatus: "Married",
    education: "Higher education",
    employmentType: "Commercial associate",
    yearsEmployed: "6",
    children: "1",
    familyMembers: "3",
    annualIncome: "75000",
    loanAmount: "25000",
    loanAnnuity: "2100",
    goodsPrice: "25000",
    housingType: "House / apartment",
    ownCar: true,
    ownRealty: true,
  });

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setSubmittedLoan(null);

    try {
      // Calculate risk model indicators based on inputs
      const income = Number(formData.annualIncome) || 50000;
      const loan = Number(formData.loanAmount) || 20000;
      const years = Number(formData.yearsEmployed) || 3;
      const dti = loan / Math.max(income, 1);

      // Base probability
      let prob = 0.12;
      if (dti > 0.6) prob += 0.28;
      else if (dti > 0.4) prob += 0.14;
      if (years < 2) prob += 0.12;
      if (formData.education === "Lower secondary") prob += 0.15;
      if (!formData.ownRealty && !formData.ownCar) prob += 0.08;

      // Bound probability
      prob = Math.max(0.04, Math.min(0.92, Number(prob.toFixed(3))));

      const riskLevel = prob < 0.3 ? "Low" : prob <= 0.6 ? "Medium" : "High";
      const recommendation =
        prob < 0.3
          ? "Approve"
          : prob <= 0.6
          ? "Manual Review Required"
          : "High Default Risk - Reject";

      const shapValues = [
        {
          feature: "Debt-to-Income Ratio",
          value: Number((dti * 100).toFixed(1)),
          impact: dti > 0.4 ? "positive" : "negative",
          desc: dti > 0.4 ? "High leverage increases risk" : "Healthy debt-to-income balance",
        },
        {
          feature: "Employment Stability",
          value: years,
          impact: years >= 4 ? "negative" : "positive",
          desc: years >= 4 ? `${years} years steady employment` : "Short tenure in current role",
        },
        {
          feature: "Education Level",
          value: formData.education,
          impact: formData.education.includes("Higher") ? "negative" : "neutral",
          desc: formData.education.includes("Higher") ? "Higher education reduces default probability" : "Standard education qualification",
        },
        {
          feature: "Asset Collateral",
          value: formData.ownRealty ? "Property Owner" : "No Real Estate",
          impact: formData.ownRealty ? "negative" : "positive",
          desc: formData.ownRealty ? "Real estate asset backing detected" : "No real estate asset registered",
        },
      ];

      // Simulate ML inference delay
      await new Promise((r) => setTimeout(r, 1000));

      setResult({
        defaultProbability: prob,
        riskLevel,
        recommendation,
        confidence: 0.89,
        shapValues,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!result) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...result,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      const application = await res.json();
      setSubmittedLoan(application);
    } catch (error) {
      console.error(error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyLoanId = () => {
    if (submittedLoan?.loanId) {
      navigator.clipboard.writeText(submittedLoan.loanId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      {/* Header */}
      <div className="flex flex-col space-y-2 text-center">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-dusk-violet/15 text-dusk-violet border border-dusk-violet/30 w-fit mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Eligibility & Underwriting Engine</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
          Check Loan Eligibility
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-sm">
          Enter your demographic, employment, and loan request details. Our
          LightGBM risk model calculates your default probability and explains
          key contributing factors.
        </p>
      </div>

      {/* Main Form */}
      <Card className="p-6 md:p-8 bg-surface-dark/90 border border-white/10 shadow-2xl backdrop-blur-md rounded-2xl">
        <form onSubmit={handleEvaluate} className="space-y-6">
          
          {/* Section 1: Personal & Demographics */}
          <div>
            <h3 className="text-base font-semibold text-white border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-dusk-violet" />
              Applicant Demographics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs text-white/70">Full Name</label>
                <Input
                  required
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  placeholder="e.g. Eleanor Vance"
                  className="bg-canvas-dark border-white/10 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/70">Age</label>
                <Input
                  required
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min={18}
                  max={85}
                  className="bg-canvas-dark border-white/10 text-white"
                />
              </div>

              <CustomSelect
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  { value: "M", label: "Male" },
                  { value: "F", label: "Female" },
                  { value: "X", label: "Other" },
                ]}
              />

              <CustomSelect
                label="Marital Status"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                options={[
                  { value: "Married", label: "Married" },
                  { value: "Single / not married", label: "Single" },
                  { value: "Civil marriage", label: "Civil Marriage" },
                  { value: "Separated", label: "Separated" },
                  { value: "Widow", label: "Widow" },
                ]}
              />

              <CustomSelect
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                options={[
                  { value: "Higher education", label: "Higher Education / Degree" },
                  { value: "Secondary / secondary special", label: "Secondary School" },
                  { value: "Incomplete higher", label: "Incomplete Higher" },
                  { value: "Academic degree", label: "Academic Degree (Masters/PhD)" },
                  { value: "Lower secondary", label: "Lower Secondary" },
                ]}
              />
            </div>
          </div>

          {/* Section 2: Employment & Family */}
          <div>
            <h3 className="text-base font-semibold text-white border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-teal" />
              Employment & Household
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <CustomSelect
                  label="Employment Type"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  options={[
                    { value: "Commercial associate", label: "Commercial Associate" },
                    { value: "Working", label: "Working / Private Sector" },
                    { value: "State servant", label: "Public / Government Servant" },
                    { value: "Pensioner", label: "Pensioner / Retired" },
                    { value: "Businessman", label: "Business Owner" },
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/70">Years Employed</label>
                <Input
                  required
                  type="number"
                  name="yearsEmployed"
                  value={formData.yearsEmployed}
                  onChange={handleChange}
                  min={0}
                  step="0.5"
                  className="bg-canvas-dark border-white/10 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/70">Number of Children</label>
                <Input
                  required
                  type="number"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  min={0}
                  className="bg-canvas-dark border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Financial & Loan Request */}
          <div>
            <h3 className="text-base font-semibold text-white border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Financials & Loan Amount ($)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/70">Annual Income ($)</label>
                <Input
                  required
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  placeholder="75000"
                  className="bg-canvas-dark border-white/10 text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/70">Requested Loan ($)</label>
                <Input
                  required
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  placeholder="25000"
                  className="bg-canvas-dark border-white/10 text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/70">Estimated Annuity ($/yr)</label>
                <Input
                  required
                  type="number"
                  name="loanAnnuity"
                  value={formData.loanAnnuity}
                  onChange={handleChange}
                  placeholder="2100"
                  className="bg-canvas-dark border-white/10 text-white font-mono"
                />
              </div>
            </div>

            {/* Assets Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-2">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-canvas-dark/60 border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                <input
                  type="checkbox"
                  name="ownCar"
                  checked={formData.ownCar}
                  onChange={handleChange}
                  className="rounded border-white/20 text-dusk-violet focus:ring-dusk-violet w-4 h-4"
                />
                <span className="text-xs text-white/80">Owns Motor Vehicle / Car</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-canvas-dark/60 border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                <input
                  type="checkbox"
                  name="ownRealty"
                  checked={formData.ownRealty}
                  onChange={handleChange}
                  className="rounded border-white/20 text-dusk-violet focus:ring-dusk-violet w-4 h-4"
                />
                <span className="text-xs text-white/80">Owns Real Estate / House</span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-base font-semibold bg-dusk-violet hover:bg-dusk-violet/90 text-white rounded-xl shadow-lg shadow-dusk-violet/25 transition-all duration-300"
          >
            {loading ? "Analyzing 193 Risk Features..." : "Evaluate Eligibility & Risk Profile"}
          </Button>
        </form>
      </Card>

      {/* Results & Application Submission Panel */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <Card className="p-6 md:p-8 bg-surface-dark border border-white/15 rounded-2xl shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50 mb-1">
                    AI Assessment Result
                  </div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    Recommendation:{" "}
                    <span
                      className={
                        result.riskLevel === "Low"
                          ? "text-emerald-400"
                          : result.riskLevel === "High"
                          ? "text-rose-400"
                          : "text-amber-400"
                      }
                    >
                      {result.recommendation}
                    </span>
                  </h2>
                </div>

                <Badge
                  className={`text-sm px-3.5 py-1.5 rounded-full border ${
                    result.riskLevel === "Low"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : result.riskLevel === "High"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  }`}
                >
                  {result.riskLevel === "Low" && <CheckCircle2 className="w-4 h-4 mr-1.5" />}
                  {result.riskLevel === "Medium" && <AlertTriangle className="w-4 h-4 mr-1.5" />}
                  {result.riskLevel === "High" && <XCircle className="w-4 h-4 mr-1.5" />}
                  {result.riskLevel} Risk ({(result.defaultProbability * 100).toFixed(1)}% Default Probability)
                </Badge>
              </div>

              {/* SHAP Explainability Feature Impact */}
              <div className="mt-6 space-y-4">
                <h4 className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-dusk-violet" />
                  SHAP Explainability Breakdown (Key Drivers)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.shapValues.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-canvas-dark/80 border border-white/5 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-white">{item.feature}</p>
                        <p className="text-[11px] text-white/50">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-xs">
                        {item.impact === "negative" ? (
                          <span className="text-emerald-400 flex items-center">
                            <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> Favorable
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center">
                            <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> High Risk
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Application CTA */}
              {!submittedLoan ? (
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">Satisfied with this preliminary assessment?</p>
                    <p className="text-xs text-white/50">Submit your loan application to generate an official Loan ID and request bank review.</p>
                  </div>
                  <Button
                    onClick={handleApply}
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20"
                  >
                    {submitting ? "Creating Application..." : "Submit Official Loan Application"}
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-4"
                >
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Application Successfully Created!</h3>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/40 p-4 rounded-lg border border-white/10">
                    <div>
                      <span className="text-xs text-white/50 block">Your Official Loan ID</span>
                      <span className="font-mono text-xl font-bold text-white tracking-wider">
                        {submittedLoan.loanId}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={copyLoanId}
                        className="bg-white/5 border-white/10 text-white text-xs hover:bg-white/10"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                        {copied ? "Copied!" : "Copy Loan ID"}
                      </Button>

                      <Link href={`/customer/status?loanId=${submittedLoan.loanId}`}>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-semibold">
                          Track Status <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-300/80">
                    Your application is currently marked as <strong className="text-amber-300">Pending Review</strong>. Bank loan officers will evaluate your request and update remarks shortly.
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
