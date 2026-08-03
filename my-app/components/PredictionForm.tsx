'use client'

import { useState } from 'react';
import { predictCustomerRisk } from '@/actions/predictRisk';

export default function PredictionForm() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Collect all the required 193 features here
    const mockCustomerData = {
      SK_ID_CURR: 100002,
      NAME_CONTRACT_TYPE: "Cash loans",
      CODE_GENDER: "M",
      AMT_INCOME_TOTAL: 202500.0,
      // ... Add all other features required by LightGBM
    };

    // Call the server action
    const response = await predictCustomerRisk(mockCustomerData);
    
    if (response.success) {
      setResult(response.data);
    } else {
      alert("Error: " + response.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md text-black">
      <h2 className="text-xl font-bold mb-4">Check Loan Eligibility</h2>
      
      <button 
        onClick={handleSubmit} 
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Predicting...' : 'Get Prediction'}
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded">
          <p><strong>Risk Level:</strong> {result.risk}</p>
          <p><strong>Recommendation:</strong> {result.recommendation}</p>
          <p><strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
