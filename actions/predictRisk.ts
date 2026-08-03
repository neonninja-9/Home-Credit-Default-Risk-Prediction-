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
