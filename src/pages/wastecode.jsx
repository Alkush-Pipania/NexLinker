import React, { useEffect, useState } from 'react';
import AuthButton from '../component/Authbutton';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import useUser from '../hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';
import MainSpinner from '../component/MainSpinner';
import Authvideo from '../assets/video/authbackground.mp4';
import { motion } from 'framer-motion';
import Login from '../assets/img/login.png';
import Listening from '../assets/img/listening.png'
import Dumbbell from '../assets/img/dumbbell.png'

const Authentication = () => {
  const { data, isLoading } = useUser();
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500); // Delay set to 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      navigate('/builder', { replace: true });
    }
  }, [isLoading, data, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsloading(false);
    }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 100); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  return (
    <div className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      {/* Video Background */}




      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.8, scale: 1 }}
        exit={{ opacity: 0, }}
        transition={{ duration: 2 }}
      >
        <img src={Dumbbell} alt="" className='z-50 w-[200px] absolute bottom-6 right-5 transform -rotate-45 lg:hidden ' />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.8, scale: 1 }}
        exit={{ opacity: 0, }}
        transition={{ duration: 3 }}
      >
        <img src={Listening} alt="" className='z-50 w-[200px] absolute top-5 left-10 transform -rotate-12 lg:hidden' />
      </motion.div>



      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full -z-10 object-cover"

      >

        <source src={Authvideo} type="video/mp4" />

      </video>

      {/* Authentication Content */}
      {isloading || isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <MainSpinner color="#69d636" size={20} />
        </div>
      ) : showContent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, }}
          transition={{ duration: 0.5 }}
          className="z-10 flex items-center justify-center absolute inset-0"
        >

          <Link
            className="text-white cursor-pointer font-bold text-xl absolute top-4 left-3 flex items-center group"
            to="/"
          >
            <svg
              className="mr-2 group-hover:text-gray-400 transition-colors duration-300"
              fill="currentColor"
              height="22"
              viewBox="0 0 22 22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                className="transition-all duration-300"
                height="2"
                width="10"
                x="7"
                y="10"
              ></rect>
              <path
                className="transition-all duration-300"
                d="M15.75 4H13L6 11L13 18H15.75L8.75 11L15.75 4Z"
              ></path>
            </svg>
            <h3 className="group-hover:text-gray-400 transition-colors duration-300">back</h3>
          </Link>
          <div
            style={{ backgroundColor: ' rgb(30,41,50)' }}

            className="flex bg-white flex-col items-center justify-between py-6 rounded-md px-5 gap-3"
          >
            <div className=" font-inter-bold text-2xl flex flex-col items-center  font-bold">
              <span className=' text-slate-300'>Login to</span>
              <span className='bg-gradient-to-r px-6 from-green-400 to-blue-500 text-transparent bg-clip-text'>NexLInker</span>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, }}
              transition={{ duration: 2 }}
            >
              <img src={Login} alt="" className="w-[200px]" />
            </motion.div>

            <div className="w-full lg:w-96 rounded-md flex flex-col items-center justify-start gap-4">

              <AuthButton
                Icon={FaGoogle}
                label={'Sign in with Google'}
                provider={'GoogleAuthProvider'}
              />

              <AuthButton
                Icon={FaGithub}
                label={'Sign in with GitHub'}
                provider={'GithubAuthProvider'}
              />


            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};



export default Authentication;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import 'tailwindcss/tailwind.css';

// const UnderConstruction = () => {
//   const navigate = useNavigate();

//   const handleBackClick = () => {
//     navigate(-1); // Navigate to the previous page
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-center p-8 bg-gray-800 rounded-lg shadow-lg"
//       >
//         <h1 className="text-4xl font-bold text-white mb-4">
//           We're Working on This Project
//         </h1>
//         <p className="text-lg text-gray-300 mb-6">
//           Our team is working hard to bring this project to life. Stay tuned, it will be available soon!
//         </p>
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           <svg
//             className="w-16 h-16 text-green-500 mx-auto mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1m-4 8h-1v-4h-1m0 0h-1v-4h1m1 0h1v4h-1m4-4h1v4h-1" />
//           </svg>
//           <p className="text-lg text-gray-400">
//             Thank you for your patience!
//           </p>
//         </motion.div>
//         <button
//           onClick={handleBackClick}
//           className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
//         >
//           Back
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default UnderConstruction;