"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useParams, useRouter } from "next/navigation";
import { predictCustomerRisk } from "@/actions/predictRisk";

export default function ApplicationReview() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;

  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);

    // Mock customer data for prediction
    const mockCustomerData = {
      SK_ID_CURR: parseInt(appId.replace(/[^0-9]/g, '')) || 100002,
      NAME_CONTRACT_TYPE: "Cash loans",
      CODE_GENDER: "M",
      AMT_INCOME_TOTAL: 50000.0,
      AMT_CREDIT: 10000.0,
      AMT_ANNUITY: 500.0,
      DAYS_EMPLOYED: -1825,
      // Add other features required by the backend
    };

    const response = await predictCustomerRisk(mockCustomerData);
    
    if (response.success) {
      setPrediction(response.data);
    } else {
      setError(response.error || "Failed to run prediction");
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="outline-dark" className="px-3" onClick={() => router.back()}>
          ← Back
        </Button>
        <h1 className="text-2xl font-display font-bold text-white">Application Review: <span className="font-mono text-primary">{appId}</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer Details */}
        <Card className="p-6 bg-surface-dark border-white/10 lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Customer Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/50">Full Name</p>
              <p className="font-medium text-white">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Age</p>
              <p className="font-medium text-white">30</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Employment</p>
              <p className="font-medium text-white">Salaried (5 Years)</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Annual Income</p>
              <p className="font-medium text-white">$50,000</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2 pt-4">Loan Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/50">Requested Amount</p>
              <p className="font-medium text-white">$10,000</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Annuity</p>
              <p className="font-medium text-white">$500/mo</p>
            </div>
          </div>
        </Card>

        {/* ML Prediction & Actions */}
        <div className="space-y-6">
          <Card className="p-6 bg-surface-dark border-white/10 flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold text-white">Model Prediction</h2>
              <Button 
                onClick={handlePredict} 
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-white text-xs px-3 py-1 h-auto border-none"
              >
                {loading ? 'Running...' : 'Run Analysis'}
              </Button>
            </div>
            
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-rose-400 text-sm">
                {error}
              </div>
            )}

            {!prediction && !error && !loading && (
              <div className="text-center py-4 text-white/50 text-sm">
                Run analysis to see the risk score.
              </div>
            )}

            {prediction && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Risk Score</span>
                  <span className={`font-bold ${prediction.risk === 'High' ? 'text-rose-400' : prediction.risk === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {(prediction.probability * 100).toFixed(2)}% ({prediction.risk})
                  </span>
                </div>
                
                <div className="pt-2">
                  <p className="text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Recommendation</p>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {prediction.recommendation || "Proceed with standard review."}
                  </p>
                </div>

                {prediction.shap_values && (
                  <div className="pt-2 border-t border-white/10 mt-2">
                    <p className="text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Key SHAP Contributors</p>
                    <div className="space-y-2">
                      {prediction.shap_values.slice(0, 3).map((shap: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-white/70">{shap.feature}</span>
                          <span className={shap.value > 0 ? "text-rose-400" : "text-emerald-400"}>
                            {shap.value > 0 ? "+" : ""}{shap.value.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>

          <Card className="p-6 bg-surface-dark border-white/10 flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Staff Decision</h2>
            <textarea 
              className="w-full bg-canvas-dark border border-white/10 rounded-md p-3 text-sm text-white placeholder-white/30 min-h-[100px] focus:outline-none focus:border-primary/50"
              placeholder="Add review remarks here..."
            />
            <div className="flex gap-3">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white border-none">Approve</Button>
              <Button variant="outline-dark" className="flex-1 text-rose-500 border-rose-500/30 hover:bg-rose-500/10">Reject</Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
