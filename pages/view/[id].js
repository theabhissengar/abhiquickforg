import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

export default function ViewSecret() {
  const router = useRouter();
  const { id } = router.query;
  const [secret, setSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [error, setError] = useState(null);

  const fetchSecret = async (password = '') => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/secrets/${id}?password=${password}`);
      const data = await response.json();

      if (response.ok) {
        setSecret(data);
        setRequiresPassword(false);
      } else if (response.status === 401 && data.requiresPassword) {
        setRequiresPassword(true);
      } else {
        throw new Error(data.error || 'Failed to fetch secret');
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSecret();
    }
  }, [id]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    await fetchSecret(password);
  };

  if (!id) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (loading) {
    return <div className="container mx-auto p-4">Loading secret...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (requiresPassword) {
    return (
      <div className="container mx-auto p-4">
        <form onSubmit={handlePasswordSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              This secret is password protected
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            View Secret
          </button>
        </form>
      </div>
    );
  }

  if (!secret) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No secret found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Secret Content</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {secret.content}
          </pre>
        </div>
        <div className="text-sm text-gray-600">
          <p>Views: {secret.views} of {secret.maxViews}</p>
          <p>Expires at: {new Date(secret.expiresAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
} 