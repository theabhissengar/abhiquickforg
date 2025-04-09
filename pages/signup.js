import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiMail } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      toast.success('Successfully signed up!');
      router.push('/');
    } catch (error) {
      toast.error('Failed to sign up with Google');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-primary hover:text-primary-dark">
              sign in to your account
            </a>
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FiMail className="h-5 w-5 text-primary-dark group-hover:text-primary" />
            </span>
            {loading ? 'Signing up...' : 'Sign up with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup; 