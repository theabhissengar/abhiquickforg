import { useState } from 'react';
import { FiCopy, FiMail } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import config from '../config';

export default function SecretSuccess({ secretId, secretContent }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${config.baseUrl}/s/${secretId}`;

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl text-center text-primary mb-8">QuickForget.com</h1>
      
      <div className="bg-[#FFE4B5] p-6 rounded-lg mb-8">
        <p className="text-gray-800 mb-4">
          Secret saved! Share this URL with anyone you would like to share this secret with:
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 p-2 border rounded bg-white"
          />
          <button
            onClick={emailSecret}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
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
          <p className="break-all">{secretContent}</p>
        </div>
      </div>
    </div>
  );
} 