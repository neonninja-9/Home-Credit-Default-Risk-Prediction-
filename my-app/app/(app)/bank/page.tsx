"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { CustomSelect } from "@/components/ui/Select";
import { motion } from "framer-motion";
import {
  Search,
  Building2,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  ArrowUpRight,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

export default function BankDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.set("search", searchTerm);
      if (statusFilter !== "ALL") queryParams.set("status", statusFilter);
      if (riskFilter !== "ALL") queryParams.set("riskLevel", riskFilter);

      const res = await fetch(`/api/applications?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, riskFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApplications();
  };

  // KPI Calculations
  const totalApps = applications.length;
  const pendingCount = applications.filter((a) => a.status === "PENDING").length;
  const highRiskCount = applications.filter((a) => a.riskLevel === "High").length;
  const approvedCount = applications.filter((a) => a.status === "APPROVED").length;
  const approvalRate = totalApps > 0 ? Math.round((approvedCount / totalApps) * 100) : 0;

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-teal/15 text-accent-teal border border-accent-teal/30 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Institutional Underwriting Desk</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white">
            Loan Applications Queue
          </h1>
          <p className="text-white/60 text-sm">
            Review incoming credit applications, inspect SHAP risk explanations, and issue underwriting decisions.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Loan ID or Name..."
              className="pl-9 bg-canvas-dark border-white/10 text-white text-sm h-10"
            />
          </div>
          <Button type="submit" className="bg-accent-teal hover:bg-accent-teal/90 text-void-canvas font-semibold h-10 px-4">
            Search
          </Button>
        </form>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface-dark/90 border-white/10 rounded-xl space-y-1">
          <span className="text-xs text-white/50 flex items-center justify-between">
            <span>Total In Queue</span>
            <FileSpreadsheet className="w-4 h-4 text-accent-teal" />
          </span>
          <p className="text-2xl font-bold text-white font-mono">{totalApps}</p>
        </Card>

        <Card className="p-4 bg-surface-dark/90 border-white/10 rounded-xl space-y-1">
          <span className="text-xs text-white/50 flex items-center justify-between">
            <span>Pending Review</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </span>
          <p className="text-2xl font-bold text-amber-400 font-mono">{pendingCount}</p>
        </Card>

        <Card className="p-4 bg-surface-dark/90 border-white/10 rounded-xl space-y-1">
          <span className="text-xs text-white/50 flex items-center justify-between">
            <span>High Risk Flagged</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </span>
          <p className="text-2xl font-bold text-rose-400 font-mono">{highRiskCount}</p>
        </Card>

        <Card className="p-4 bg-surface-dark/90 border-white/10 rounded-xl space-y-1">
          <span className="text-xs text-white/50 flex items-center justify-between">
            <span>Approval Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </span>
          <p className="text-2xl font-bold text-emerald-400 font-mono">{approvalRate}%</p>
        </Card>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-dark/60 p-3 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs w-[180px]">
            <span className="text-white/50 shrink-0">Status:</span>
            <CustomSelect
              name="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              theme="teal"
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "PENDING", label: "Pending Review" },
                { value: "APPROVED", label: "Approved" },
                { value: "REJECTED", label: "Rejected" },
              ]}
            />
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-1.5 text-xs w-[180px]">
            <span className="text-white/50 shrink-0">Risk Level:</span>
            <CustomSelect
              name="riskFilter"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              theme="teal"
              options={[
                { value: "ALL", label: "All Risk Levels" },
                { value: "Low", label: "Low Risk (<30%)" },
                { value: "Medium", label: "Medium Risk (30-60%)" },
                { value: "High", label: "High Risk (>60%)" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-white/40 text-sm">
            Loading applications from PostgreSQL...
          </div>
        ) : applications.length === 0 ? (
          <Card className="p-8 text-center bg-surface-dark border-white/10 rounded-xl">
            <p className="text-white/60 text-sm">No applications found matching your criteria.</p>
          </Card>
        ) : (
          applications.map((app) => (
            <Link key={app.id} href={`/bank/application/${app.loanId || app.id}`}>
              <Card className="p-4 md:p-5 bg-surface-dark/80 hover:bg-surface-dark border border-white/10 hover:border-accent-teal/50 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer rounded-xl group shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                  <div>
                    <p className="text-[11px] text-white/50 mb-0.5">Loan ID</p>
                    <p className="font-mono text-sm font-semibold text-white group-hover:text-accent-teal transition-colors">
                      {app.loanId || app.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/50 mb-0.5">Applicant Name</p>
                    <p className="font-medium text-sm text-white/90">{app.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/50 mb-0.5">Requested Amount</p>
                    <p className="font-medium text-sm text-white/90 font-mono">
                      ${app.loanAmount?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/50 mb-0.5">Model Prediction</p>
                    <p
                      className={`text-sm font-semibold ${
                        app.riskLevel === "Low"
                          ? "text-emerald-400"
                          : app.riskLevel === "High"
                          ? "text-rose-400"
                          : "text-amber-400"
                      }`}
                    >
                      {app.riskLevel} Risk ({(app.defaultProbability * 100).toFixed(1)}%)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between md:justify-end">
                  <Badge
                    className={`text-xs px-3 py-1 rounded-full border ${
                      app.status === "PENDING"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : app.status === "APPROVED"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                    }`}
                  >
                    {app.status}
                  </Badge>

                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accent-teal group-hover:text-void-canvas transition-colors text-white/60">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
