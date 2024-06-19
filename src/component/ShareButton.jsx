import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShareAlt } from 'react-icons/fa';

const ShareButton = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Hide popup after 2 seconds
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        <FaShareAlt className="mr-2" />
        Share
      </button>
      {isCopied && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-black text-white rounded-lg"
        >
          Link copied!
        </motion.div>
      )}
    </div>
  );
};

export default ShareButton;
