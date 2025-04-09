import { useState } from 'react';
import { FiLock, FiClock, FiEye, FiCopy, FiMail } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import config from '../config';

export default function CreateSecret() {
  const [secret, setSecret] = useState('');
  const [views, setViews] = useState(1);
  const [hours, setHours] = useState(1);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSecret, setCreatedSecret] = useState(null);
  const router = useRouter();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('URL copied to clipboard!');
  };

  const formatExpirationDate = (hours) => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + parseInt(hours));
    return expirationDate.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/secrets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: secret,
          maxViews: parseInt(views),
          expiresIn: parseInt(hours),
          password: password || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const secretUrl = `${config.baseUrl}/s/${data.id}`;
      const expirationDate = formatExpirationDate(hours);

      setCreatedSecret({
        url: secretUrl,
        content: secret,
        views: views,
        expiration: expirationDate
      });

      toast.success('Secret created successfully!');
      
    } catch (error) {
      console.error('Error creating secret:', error);
      toast.error(error.message || 'Failed to create secret. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createdSecret) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-4xl text-center text-blue-500 mb-8">QuickForget.com</h1>
          
          <div className="bg-[#FFE4B5] p-6 rounded-lg mb-8">
            <p className="text-gray-800 mb-4">
              Secret saved! Share this URL with anyone you would like to share this secret with:
            </p>
            <div className="relative">
              <input
                type="text"
                value={createdSecret.url}
                readOnly
                className="w-full p-2 border rounded bg-white pr-24"
                onClick={(e) => e.target.select()}
              />
              <button
                onClick={() => copyToClipboard(createdSecret.url)}
                className="absolute right-24 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-1 rounded"
                title="Copy to clipboard"
              >
                <FiCopy />
              </button>
              <button
                onClick={() => window.location.href=`mailto:?subject=I have shared a secret with you&body=You can view my secret here: ${createdSecret.url}`}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700 text-sm"
              >
                email this link
              </button>
            </div>
            <div className="mt-4 text-gray-600 text-sm">
              This secret will be forgotten in {hours} hours ({createdSecret.expiration}) or after it is viewed {views} more time(s).
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl mb-4">Shh, the secret is:</h2>
            <div className="bg-gray-200 p-4 rounded">
              <p className="break-all">{createdSecret.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Create a Secure Secret</h1>
          <p className="text-gray-600">
            Share sensitive information securely with self-destructing messages
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-2">
                Your Secret
              </label>
              <textarea
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                placeholder="Enter your secret message here..."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="views" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Views
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="views"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    className="w-full p-2 border rounded pr-10"
                    min="1"
                    required
                  />
                  <FiEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-2">
                  Expires After (Hours)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full p-2 border rounded pr-10"
                    min="1"
                    required
                  />
                  <FiClock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password Protection (Optional)
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded pr-10"
                  placeholder="Enter a password to protect your secret"
                />
                <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating Secret...' : 'Create Secret'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}