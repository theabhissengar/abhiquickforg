import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiCopy, FiMail } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import config from '../../config';

export default function SuccessPage() {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const router = useRouter();
  const { id, content } = router.query;

  useEffect(() => {
    if (id) {
      setShareUrl(`${config.baseUrl}/s/${id}`);
    }
  }, [id]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const emailSecret = () => {
    const emailUrl = `mailto:?subject=I've shared a secret with you&body=You can view my secret here: ${shareUrl}`;
    window.location.href = emailUrl;
  };

  if (!shareUrl) {
    // Return a loading state or null during SSR
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl text-center text-primary mb-8">QuickForget.com</h1>
      
      <div className="bg-[#FFE4B5] p-6 rounded-lg mb-8">
        <p className="text-gray-800 mb-4">
          Secret saved! Share this URL with anyone you would like to share this secret with:
        </p>
        <div className="relative">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="w-full p-2 border rounded bg-white pr-24"
            onClick={(e) => e.target.select()}
          />
          <button
            onClick={emailSecret}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700 text-sm"
          >
            email this link
          </button>
        </div>
        <div className="mt-2 text-gray-600 text-center">
          ↑ COPY and PASTE this URL!
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl mb-4">Shh, the secret is:</h2>
        <div className="bg-gray-200 p-4 rounded">
          <p className="break-all">{content}</p>
        </div>
      </div>
    </div>
  );
}

// Disable server-side rendering for this page
export const getServerSideProps = () => {
  return {
    props: {},
  };
};