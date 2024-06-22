import React, { useEffect, useState } from 'react';
import AuthButton from '../component/Authbutton';
import { FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import useUser from '../hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';
import nexlinker from '../assets/img/nexlinkerlogo.png';

import { BarLoader } from 'react-spinners'
const Authentication = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      navigate('/builder', { replace: true });
    }
  }, [isLoading, data, navigate]);

  if (!showContent || isLoading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
      <BarLoader color='#ffffff' size ={25}/>
    </div>
    ); // Show loading spinner while content is loading
  }

  return (
    <div className="flex h-screen w-full">
      {/* back */}
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


      <div className="lg:w-[650px] w-full flex flex-col justify-center items-center bg-black text-white px-8 py-4">
        <div className="max-w-md w-full">
          <Link to="/" className="mb-8 flex gap-3 items-center">
            <img src={nexlinker} alt="Nexlinker" className="w-14 h-auto" />
            <h3 className="font-inter-bold font-bold text-3xl text-gray-100 group-hover:text-white">
              Nexlinker
            </h3>
          </Link>
          <h1 className="text-3xl font-bold mb-4">Log in to your account</h1>
          <p className="text-sm mb-8">to begin your journey 🚀</p>
          <div className="flex flex-col gap-2 mb-4">
            <AuthButton
              Icon={FcGoogle}
              label="Google"
              provider="GoogleAuthProvider"
            />
            <AuthButton
              Icon={FiGithub}
              label="Github"
              provider="GithubAuthProvider"
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-[1260px] bg-authcolor relative">
        <div className="flex flex-col absolute bottom-4 font-semibold text-white justify-end items-start p-7 w-full">
          <p className="font-inter-bold">
            "Any intelligent fool can make things bigger, more complex, and more
            violent. It takes a touch of genius - and a lot of courage - to move
            in the opposite direction."
          </p>
          <h3 className="text-sm font-inter-bold mt-2">Albert Einstein</h3>
        </div>
      </div>
    </div>
  );
};

export default Authentication;



// import Authvideo from '../assets/video/authbackground.mp4';
// import { motion } from 'framer-motion';
// import Login from '../assets/img/login.png';
// import Listening from '../assets/img/listening.png'
// import Dumbbell from '../assets/img/dumbbell.png'