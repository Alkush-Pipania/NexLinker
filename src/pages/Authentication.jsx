
import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase.config';  // Make sure this is the correct path to your firebase config
import useUser from '../hooks/useUser';  // Custom hook to get user data
import { FaGoogle } from 'react-icons/fa';

const Authentication = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate('/builder', { replace: true });
    }
  }, [isLoading, data, navigate]);

  const handleGoogleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, googleAuthProvider);
    } catch (err) {
      console.error('Error during sign-in:', err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Login to Your App</h1>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        <FaGoogle className="mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default Authentication;
