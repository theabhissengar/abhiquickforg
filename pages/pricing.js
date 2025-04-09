import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for occasional secret sharing',
    features: [
      'Up to 5 secrets per month',
      '24-hour expiration',
      'Basic encryption',
      'No password protection',
      'No team features',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline',
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'Best for professionals and small teams',
    features: [
      'Unlimited secrets',
      'Custom expiration times',
      'Advanced encryption',
      'Password protection',
      'Basic team features',
      'Priority support',
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'primary',
    popular: true,
  },
  {
    name: 'Business',
    price: '$29.99',
    period: '/month',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Advanced team management',
      'Custom branding',
      'API access',
      '24/7 priority support',
      'SLA guarantee',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline',
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async (plan) => {
    if (plan === 'Free') {
      router.push('/create');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const { url, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }

      window.location.href = url;
    } catch (error) {
      toast.error('Failed to initiate checkout. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for you and your team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card relative ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.startsWith('No') ? (
                      <FiX className="w-5 h-5 text-red-500 mt-0.5 mr-2" />
                    ) : (
                      <FiCheck className="w-5 h-5 text-green-500 mt-0.5 mr-2" />
                    )}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md font-medium ${
                  plan.buttonVariant === 'primary'
                    ? 'bg-primary text-white hover:bg-secondary'
                    : 'border border-primary text-primary hover:bg-gray-50'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Processing...' : plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards and PayPal. For enterprise plans, we also accept bank transfers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 