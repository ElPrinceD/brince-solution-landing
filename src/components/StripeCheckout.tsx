import { useState, useEffect } from 'react';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLISHABLE_KEY, createPaymentIntent } from '../utils/stripe';

export interface PaymentIntentResponse {
  client_secret: string;
  payment_id?: number;
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface StripeCheckoutProps {
  amount: number;
  description: string;
  customerEmail: string;
  customerName?: string;
  leadId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const CheckoutForm = ({ amount, onSuccess, onCancel, clientSecret }: Pick<StripeCheckoutProps, 'amount' | 'onSuccess' | 'onCancel'> & { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(undefined);

    try {
      // Submit elements first (required by Stripe for deferred payment flow)
      const { error: submitError } = await elements.submit();
      
      if (submitError) {
        setError(submitError.message || 'Form validation failed');
        setIsProcessing(false);
        return;
      }

      // Confirm payment with the existing client secret
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
        setIsProcessing(false);
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl p-4">
          <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : `Pay £${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

export const StripeCheckout = (props: StripeCheckoutProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | undefined>(undefined);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Create payment intent when component mounts
    setIsInitializing(true);
    createPaymentIntent({
      amount: props.amount,
      currency: 'gbp',
      description: props.description,
      customer_email: props.customerEmail,
      customer_name: props.customerName,
      lead_id: props.leadId,
    })
      .then((data) => {
        const response = data as PaymentIntentResponse;
        setClientSecret(response.client_secret);
        setIsInitializing(false);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
        setInitError('Failed to initialize payment. Please try again.');
        setIsInitializing(false);
      });
  }, [props.amount, props.description, props.customerEmail, props.customerName, props.leadId]);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: 'stripe',
    },
  };

  if (initError) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl p-4">
          <p className="text-red-700 dark:text-red-400 text-sm font-medium">{initError}</p>
        </div>
        <button
          onClick={props.onCancel}
          className="mt-4 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (isInitializing || !clientSecret || !STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading payment form...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm {...props} clientSecret={clientSecret} />
    </Elements>
  );
};

