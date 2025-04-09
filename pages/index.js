import { useState } from 'react';
import Link from 'next/link';
import { FiLock, FiClock, FiEye, FiShield } from 'react-icons/fi';

export default function Home() {
  const [secret, setSecret] = useState('');
  const [views, setViews] = useState(1);
  const [hours, setHours] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement secret creation
    console.log({ secret, views, hours });
  };

  const features = [
    {
      icon: <FiLock className="w-8 h-8" />,
      title: 'End-to-End Encryption',
      description: 'Your secrets are encrypted before they leave your browser.',
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: 'Self-Destructing',
      description: 'Secrets automatically delete after viewing or time expiration.',
    },
    {
      icon: <FiEye className="w-8 h-8" />,
      title: 'View Count Control',
      description: 'Set how many times your secret can be viewed before deletion.',
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Secure Sharing',
      description: 'Share sensitive information with confidence and peace of mind.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Share Secrets Securely
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create self-destructing messages that automatically delete after being viewed or after a set time period.
            </p>
            <Link href="/create" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Create a Secret
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Create Form */}
      {/* <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Create a Secret</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Secret
                </label>
                <textarea
                  id="secret"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="input-field h-32"
                  placeholder="Enter your secret message here..."
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="views" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Views
                  </label>
                  <input
                    type="number"
                    id="views"
                    value={views}
                    onChange={(e) => setViews(parseInt(e.target.value))}
                    className="input-field"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-2">
                    Expires After (Hours)
                  </label>
                  <input
                    type="number"
                    id="hours"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    className="input-field"
                    min="1"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">
                Create Secret
              </button>
            </form>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose QuickForget?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 