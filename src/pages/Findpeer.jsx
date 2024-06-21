import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';

const Findpeer = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000); // Random delay between 1-5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center bg-black h-screen">
          <ClimbingBoxLoader color="#69d636" size={20} />
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col justify-start items-start" id="findpeer">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-start items-center pt-5 px-6 text-3xl font-bold"
            id="peerhead"
          >
            <h3>Find peer</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:mt-[332px] mt-[219px] lg:ml-[215px]"
          >
            <h3 className="text-4xl ml-[114px] font-bold font-cominsoon">
              <span className="dark1">Com</span>
              <span className="dark2">ing</span>
              <span className="dark3">soon</span>
              <span className="dark4">...</span>
            </h3>
            <p className="lg:w-[450px] ml-[113px] mr-6 mt-2 text-gray-200">
              Find peer is designed to help you discover students who share your values, intelligence, sense of humor, skills, and mindset. Whether you're looking for a study buddy, a project partner, or a new friend with similar interests, PeerMatch will make it happen.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Findpeer;
