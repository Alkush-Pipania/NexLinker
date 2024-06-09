import React, { useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../assets/img/Resume builder2.png';
import { AnimatePresence ,motion } from 'framer-motion';
import '../index.css';

const HeaderMainPage = () => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div className="flex w-full  items-center justify-between pt-4 md:pt-6 pr-2 lg:pr-4  pl-2 overflow-hidden sm:gap-3 maihoonheader">
      <Link to={"/"} className='flex items-center gap-2 md:gap-4 lg:text-lg text-sm font-semibold group'>
        <h3  className="group-hover:text-yellow-400  text-red-500 transition text-[30px]  ease-in-out lg:pl-4 delay-150 mr-2 duration-300  text-nowrap" id='nexlinker'>NexLinker</h3>
      </Link>
      <div className="flex space-x-4 md:space-x-8 items-center">

       <a
         onMouseEnter={()=> setIsHovered(true)}
         onMouseLeave={()=> setIsHovered(false)}
        href="https://github.com/Alkush-Pipania/NexLinker" target="_blank"><FaGithub className=" text-3xl text-blue-400 hover:text-blue-500" /></a>
       <AnimatePresence>
        {isHovered && (
          <div className='absolute'>
            <motion.div
          initial={{opacity:0 , scale:0.85}}
          animate={{opacity:1 , scale:1}}
          exit={{opacity:0 , scale:0.85}}
          transition={{delay:0.1}}
          className='relative top-10 right-16  bg-findpeer px-1 py-[3px] rounded-md hidden lg:block '
        >
          <p>open source</p>
        </motion.div>
          </div>
          
        )}
       </AnimatePresence>

        
        <h3 className="lg:text-lg whitespace-nowrap cursor-pointer lg:hover:bg-findpeer lg:py-2 lg:px-2 rounded-md">Find Your Peer</h3>
        <Link to="/" className="bg-yellow-400 text-black rounded-lg lg:px-4 lg:py-2 px-[3px]   py-2 text-sm lg:text-lg whitespace-nowrap hover:bg-yellow-500 ">Create resume</Link>
      </div>
    </div>
  );
};

export default HeaderMainPage;

