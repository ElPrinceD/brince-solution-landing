// Stripe configuration
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://brincesolutions.com/api' : 'http://localhost:8000/api');

export interface CreatePaymentIntentData {
  amount: number;
  currency?: string;
  description?: string;
  customer_email?: string;
  customer_name?: string;
  lead_id?: number;
}

export const createPaymentIntent = async (data: CreatePaymentIntentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/create-intent/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      } else {
        // If not JSON, it's likely an HTML error page
        throw new Error(`Server error (${response.status}): ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error: any) {
    if (error.message) {
      throw error;
    }
    throw new Error('Failed to connect to payment server. Please check your connection.');
  }
};

