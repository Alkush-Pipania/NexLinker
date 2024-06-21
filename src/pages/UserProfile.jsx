import React from 'react';
import useUser from '../hooks/useUser';
import { motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';

const UserProfile = () => {
  const { data: user, isLoading } = useUser();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClimbingBoxLoader color="#69d636" size={20} />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-start justify-center">
      <div className=" mt-11">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User Profile" className=' rounded-md w-28' />
        ) : (
          <div className="w-28 h-28 rounded-md relative flex cursor-pointer items-center justify-center bg-blue-500 shadow-md">
            <p className="uppercase text-lg text-white">{user?.email[0]}</p>
          </div>
        )}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          {user.displayName || 'Guest'}
        </motion.h3>
        
        
      </div>
    </div>
    
  );
};

export default UserProfile;
