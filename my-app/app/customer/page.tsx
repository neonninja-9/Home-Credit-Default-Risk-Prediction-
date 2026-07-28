import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-display font-bold tracking-tight text-white">Customer Portal</h1>
        <p className="text-white/60">Manage your loan applications and check your eligibility.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col items-start space-y-4 bg-surface-dark border-white/10 hover:border-primary/50 transition-colors">
          <h2 className="text-xl font-semibold text-white">Check Eligibility</h2>
          <p className="text-white/60 flex-1">
            New customer? Check your loan eligibility using our advanced AI models before you apply.
          </p>
          <Link href="/customer/eligibility" className="w-full">
            <Button className="w-full">Start Eligibility Check</Button>
          </Link>
        </Card>

        <Card className="p-6 flex flex-col items-start space-y-4 bg-surface-dark border-white/10 hover:border-accent-teal/50 transition-colors">
          <h2 className="text-xl font-semibold text-white">Check Application Status</h2>
          <p className="text-white/60 flex-1">
            Already applied? Enter your Loan ID or Customer ID to check the current status of your application.
          </p>
          <Link href="/customer/status" className="w-full">
            <Button variant="outline-dark" className="w-full text-white border-white/20 hover:bg-white/5">
              Check Status
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
