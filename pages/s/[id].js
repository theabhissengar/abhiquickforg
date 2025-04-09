import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SecretPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // If this is a view attempt (no content in query params), redirect to view page
      if (!router.query.content) {
        router.replace(`/view/${id}`);
      }
    }
  }, [id, router]);

  // If there's content in query params, this is the success page after creating a secret
  if (router.query.content) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl text-center text-blue-500 mb-8">QuickForget.com</h1>
        
        <div className="bg-[#FFE4B5] p-6 rounded-lg mb-8">
          <p className="text-gray-800 mb-4">
            Secret saved! Share this URL with anyone you would like to share this secret with:
          </p>
          <div className="bg-white p-2 rounded border mb-2">
            <code className="break-all">{`${window.location.origin}/s/${id}`}</code>
          </div>
          <div className="mt-2 text-gray-600 text-center">
            ↑ COPY and PASTE this URL!
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl mb-4">Shh, the secret is:</h2>
          <div className="bg-gray-200 p-4 rounded">
            <p className="break-all">{router.query.content}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading secret...</p>
      </div>
    </div>
  );
} 