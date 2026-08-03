import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileCheck2,
  Clock,
} from "lucide-react";

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      {/* Welcome Banner */}
      <div className="flex flex-col space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-dusk-violet/15 text-dusk-violet border border-dusk-violet/30 w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Customer Self-Service Hub</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
          Welcome to CreditLens
        </h1>
        <p className="text-white/60 max-w-xl text-sm">
          Access instant loan risk assessments, explore credit terms transparently, and track your active applications in real time.
        </p>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Check Eligibility Card */}
        <Card className="p-6 md:p-8 flex flex-col justify-between space-y-6 bg-surface-dark/90 border border-white/10 hover:border-dusk-violet/60 transition-all duration-300 rounded-2xl shadow-xl group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-dusk-violet/20 border border-dusk-violet/40 flex items-center justify-center text-dusk-violet group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Check Loan Eligibility</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Enter your employment and financial details to get an instant AI risk score, custom loan terms, and SHAP explainability insights.
              </p>
            </div>
          </div>

          <Link href="/customer/eligibility" className="w-full">
            <Button className="w-full h-12 bg-dusk-violet hover:bg-dusk-violet/90 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-dusk-violet/20">
              <span>Start Eligibility Check</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>

        {/* Track Application Status Card */}
        <Card className="p-6 md:p-8 flex flex-col justify-between space-y-6 bg-surface-dark/90 border border-white/10 hover:border-accent-teal/60 transition-all duration-300 rounded-2xl shadow-xl group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-accent-teal/20 border border-accent-teal/40 flex items-center justify-center text-accent-teal group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Track Application Status</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Already submitted an application? Look up your unique Loan ID (e.g. <span className="font-mono text-white/80">HC-849204</span>) to check underwriter remarks and approval status.
              </p>
            </div>
          </div>

          <Link href="/customer/status" className="w-full">
            <Button
              variant="outline-dark"
              className="w-full h-12 text-white border-white/20 hover:border-accent-teal hover:bg-accent-teal/10 font-medium rounded-xl flex items-center justify-center gap-2"
            >
              <span>Track Existing Application</span>
              <Search className="w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-xl bg-surface-dark/50 border border-white/5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-semibold text-white">Transparent AI Risk Scoring</h4>
            <p className="text-[11px] text-white/50">Full SHAP feature explanations for credit decisions</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-dark/50 border border-white/5 flex items-start gap-3">
          <FileCheck2 className="w-5 h-5 text-dusk-violet flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-semibold text-white">Fast Underwriting Pipeline</h4>
            <p className="text-[11px] text-white/50">Instant initial checks followed by rapid bank officer review</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-dark/50 border border-white/5 flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-semibold text-white">Real-Time Application Tracking</h4>
            <p className="text-[11px] text-white/50">Monitor loan approval status anytime using your Loan ID</p>
          </div>
        </div>
      </div>
    </div>
  );
}
