import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

export default function Success() {
  const router = useRouter();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const { session_id } = router.query;
    
    if (!session_id) {
      setStatus('error');
      return;
    }

    // Here you would typically verify the payment with your backend
    // For now, we'll just show a success message
    setStatus('success');
    toast.success('Payment successful! Your subscription is now active.');
  }, [router.query]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h1>
          <p className="text-gray-600 mb-4">There was an error processing your payment.</p>
          <button
            onClick={() => router.push('/pricing')}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
          >
            Return to Pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your subscription. Your account has been upgraded.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
} 