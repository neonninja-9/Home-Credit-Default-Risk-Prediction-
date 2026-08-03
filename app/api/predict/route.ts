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
