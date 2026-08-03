import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Zap,
  FileCheck2,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      {/* Welcome */}
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="text-white/50 text-[15px] leading-relaxed">
          Check your loan eligibility instantly with AI-powered risk assessment, or track the status of existing applications.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Eligibility Card */}
        <Card className="group relative overflow-hidden p-7 md:p-8 flex flex-col justify-between gap-8 bg-graphite border border-hairline hover:border-dusk-violet/50 transition-all duration-300 rounded-2xl">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-dusk-violet/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative">
            <div className="w-11 h-11 rounded-xl bg-dusk-violet/15 border border-dusk-violet/30 flex items-center justify-center text-dusk-violet group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1.5">Check Eligibility</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Get an instant risk score, personalized loan terms, and transparent SHAP-based explanations for your application.
              </p>
            </div>
          </div>

          <Link href="/customer/eligibility" className="w-full relative">
            <Button className="w-full h-11 bg-dusk-violet hover:bg-dusk-violet/90 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-md shadow-dusk-violet/15 text-[14px]">
              Start Assessment
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>

        {/* Track Status Card */}
        <Card className="group relative overflow-hidden p-7 md:p-8 flex flex-col justify-between gap-8 bg-graphite border border-hairline hover:border-accent-teal/50 transition-all duration-300 rounded-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent-teal/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative">
            <div className="w-11 h-11 rounded-xl bg-accent-teal/15 border border-accent-teal/30 flex items-center justify-center text-accent-teal group-hover:scale-105 transition-transform duration-300">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1.5">Track Application</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Look up your Loan ID to view real-time underwriting status, officer remarks, and decision outcomes.
              </p>
            </div>
          </div>

          <Link href="/customer/status" className="w-full relative">
            <Button
              variant="outline-dark"
              className="w-full h-11 text-white border-hairline hover:border-accent-teal/60 hover:bg-accent-teal/[0.06] font-medium rounded-xl flex items-center justify-center gap-2 text-[14px]"
            >
              Search by Loan ID
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </div>

      {/* Info Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
            title: "Explainable Decisions",
            desc: "Full SHAP feature breakdowns for every risk score",
          },
          {
            icon: <TrendingUp className="w-4 h-4 text-dusk-violet" />,
            title: "90%+ Model Accuracy",
            desc: "LightGBM trained on Home Credit default history",
          },
          {
            icon: <Clock className="w-4 h-4 text-amber-400" />,
            title: "Live Status Updates",
            desc: "Track decisions from submission through approval",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 p-4 rounded-xl bg-graphite/60 border border-hairline/50"
          >
            <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
            <div>
              <h4 className="text-[13px] font-semibold text-white">{item.title}</h4>
              <p className="text-[11px] text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
