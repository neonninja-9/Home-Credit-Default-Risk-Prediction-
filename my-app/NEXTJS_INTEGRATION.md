# Next.js Integration Guide

This guide explains how to connect your Next.js application to the Dockerized Python backend API you just built for the **Home Credit Default Risk Prediction** model.

## 1. Environment Variable Setup
First, define the URL of your Python backend in your Next.js `.env.local` file. This makes it easy to switch between local development and production.

```env
# .env.local
NEXT_PUBLIC_PREDICTION_API_URL=http://localhost:8000/predict
```

---

## 2. Option A: Using Server Actions (Next.js 14+)
If you are using the Next.js App Router, the cleanest way to interact with the API is through a Server Action.

Create a file named `actions/predictRisk.ts`:

```typescript
'use server'

export async function predictCustomerRisk(customerData: any) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_PREDICTION_API_URL;
    
    if (!backendUrl) throw new Error("API URL is missing");

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
    
  } catch (error: any) {
    console.error("Prediction failed:", error);
    return { success: false, error: error.message };
  }
}
```

You can then call this action directly from your React Server or Client Components!

---

## 3. Option B: Using an API Route (App Router)
If you prefer to route traffic through a Next.js API handler first, create `app/api/predict/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const customerData = await request.json();
    
    const backendResponse = await fetch(process.env.NEXT_PUBLIC_PREDICTION_API_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData),
    });

    if (!backendResponse.ok) {
      return NextResponse.json({ error: "Backend prediction failed" }, { status: 500 });
    }

    const result = await backendResponse.json();
    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

---

## 4. Frontend Component Example
Here is how you might call the API (or Server Action) from a client component when a user submits a form.

```tsx
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
    <div className="p-4 bg-white rounded shadow-md">
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
```
