

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';

const UnderConstruction = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/"); // Navigate to the previous page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-gray-800 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          We're Working on This Project
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Our team is working hard to bring this project to life. Stay tuned, it will be available soon!
        </p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1" />
          </svg>
          <p className="text-lg text-gray-400">
            Thank you for your patience!
          </p>
        </motion.div>
        <button
          onClick={handleBackClick}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Back
        </button>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;

