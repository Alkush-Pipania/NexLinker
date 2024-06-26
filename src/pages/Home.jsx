import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Headermainpage from '../component/headermainpage';
import image from '../assets/resume-demo.png';
import { ClimbingBoxLoader } from 'react-spinners';
import useUser from '../hooks/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import humanwritng from '../assets/img/human-writing.jpg';
import downlodimg from '../assets/img/downloading.png';
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import Currenttime from '../hooks/Timew';
import indiaflag from '../assets/img/india-flag.png';
import { useInView } from 'react-intersection-observer';
import ScrollAnimation from '../hooks/ScrollAnimation';

const Home = () => {
  const { data, isloading, isError } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    }
  };

  const anotherlevel = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
  };

  const transitionStyle = {
    transition: 'background-color 0.1s, color 0.1s, box-shadow 0.1s',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000); // Random delay between 1-5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div id='home-page' className='m-0 p-0'>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClimbingBoxLoader color="#69d636" size={20} />
        </div>
      ) : (
        <motion.div
          key="main-content" // Ensure a unique key for the main content
          variants={anotherlevel}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <AnimatePresence>
            <motion.div
              key="header" // Ensure a unique key for each motion div
              className="w-full"
              variants={itemVariants}
              transition={{ ease: 'easeInOut' }}
            >
              <Headermainpage />
            </motion.div>
            <motion.div
              key="main-section" // Ensure a unique key for each motion div
              className="flex flex-col items-center justify-center mt-[80px] lg:mt-[200px] space-y-8 px-4"
              variants={itemVariants}
              transition={{ ease: 'easeInOut' }}
            >
              <motion.h3
                key="main-heading" // Ensure a unique key for each motion div
                className="text-4xl md:text-5xl text-center"
                variants={itemVariants}
                transition={{ ease: 'easeInOut' }}
              >
                Achieve Career Success with Our Easy-to-Use Resume Builder
              </motion.h3>
              <ScrollAnimation duration={0.5}>
                <motion.p
                  key="subheading" // Ensure a unique key for each motion div
                  className="text-lg md:text-xl text-center"
                  variants={itemVariants}
                  transition={{ ease: 'easeInOut' }}
                >
                  Your skills matter the most, not your degree
                </motion.p>
              </ScrollAnimation>
              <motion.div
                key="start-button" // Ensure a unique key for each motion div
                variants={itemVariants}
                transition={{ ease: 'easeInOut' }}
              >
                <Link
                  to={data ? "/builder" : "/auth"}
                  className="text-xl rounded-lg bg-headingstarting hover:bg-hoverheadingstarting px-4 py-2"
                >
                  Start building
                </Link>
              </motion.div>
              <motion.img
                key="resume-demo" // Ensure a unique key for each motion div
                src={image}
                alt="Resume Demo"
                className="w-48 lg:w-[30vw]"
                variants={itemVariants}
                transition={{ ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.div
              key="features-section" 
            >
              <div className='flex flex-col items-center bg-white text-black justify-center lg:py-[64px] py-8 ' id='iamnext'>
                <div className=" w-full flex flex-col items-center justify-center gap-2 " >
                  <motion.div key="features-heading" className="div">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <h3 className="uppercase font-feature-text">FEATURES</h3>
                      <h3 className='leading-framerxx tracking-frameryy text-framersize space-x-spacfra self-center text-center px-4'>Create your resume with just 2 steps</h3>
                      <ScrollAnimation duration={0.5}>
                        <motion.p className='lg:w-[740px] text-center inline-block px-8 '>Streamline your process of making your resume using the website which simplifies the process of making your resume</motion.p>
                      </ScrollAnimation>
                    </div>
                  </motion.div>
                  <motion.div key="feature-boxes">
                    <div className='flex items-center justify-center lg:gap-11 gap-7 pt-6 lg:flex-row flex-col'>
                      <Boxme
                        key="box-1" 
                        image={humanwritng}
                        heading={"Fill in the Blanks"}
                        para={"Take a moment to fill in all the relevant details of your education, work experience, skills, achievements, and create a comprehensive and compelling resume that showcases your qualifications and makes you stand out to potential employers."}
                      />
                      <Boxme
                        key="box-2" 
                        image={downlodimg}
                        heading={"Hit 'Download!'"}
                        para={"And yes, it's absolutely free! We take pride in providing a top-notch resume builder that doesn't hit you with a paywall. You can access all the features and benefits without spending a dime. So, create your resume in just two steps and kickstart your journey."}
                      />
                    </div>
                  </motion.div>
                </div>
                <ScrollAnimation duration={1.8}>
                  <motion.div key="explore-section">
                    <div className='flex flex-col justify-center items-center lg:w-[1109px] mt-[116px] gap-5 px-[32px] py-[64] mx-3 ' id='bluepotential'>
                      <h3 className="lg:text-4xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center pt-4 lg:pt-6 font-bold">About the dev</h3>
                      <p className="text-center lg:w-[529px]">I am a dedicated learner who loves creating new products. When I'm not sketching ideas, I'm either binge-watching Netflix or playing video games. Right now, I'm focused on learning and always open to connecting with others.</p>
                      <div></div>
                      <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={animationVariants}
                      >
                        <a style={transitionStyle} className='bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-3 text-white text-center' 
                        href="mailto:workofalkushpipania@gmail.com?subject=Contact&body=Hello,">let's talk
                        </a>
                      </motion.div>
                      <div className='lg:pb-4 pb-2'></div>
                    </div>
                  </motion.div>
                </ScrollAnimation>
              </div>
            </motion.div>
          </AnimatePresence>
          <Myfotterhome key="footer" />
        </motion.div>
      )}
    </div>
  );
};

const Boxme = ({ image, heading, para }) => {
  return (
    <motion.div
      key={heading} // Ensure a unique key for each Boxme component
    >
      <div className='lg:w-[532px] w-[359px] font-inter-bold gap-4 flex flex-col justify-center items-center px-4 py-5 rounded-lg miniwhite'>
        <motion.img
          key={`img-${heading}`} // Ensure a unique key for each motion div
          src={image}
          className='lg:w-[461px] w-[322px] rounded-lg'
        />
        <ScrollAnimation duration={0.5}>
          <motion.div key={`text-${heading}`}>
            <h3 className='text-2xl font-bold text-start'>{heading}</h3>
            <p className='leading-7'>{para}</p>
          </motion.div>
        </ScrollAnimation>
      </div>
    </motion.div>
  );
}

const Myfotterhome = () => {
  return (
    <AnimatePresence>
      <motion.div key="footer-content">
        <div className='w-full text-white gap-4 px-[70px] py-[40px] lg:gap-[70px] flex flex-col fottercolor lg:px-[100px] lg:pt-[70px] lg:pb-[30px]'>
          <div className="flex lg:gap-[135px] gap-8 items-center">
            <div className='text-start w-[150px] text-xl flex flex-col items-start justify-center'>
              <p>Connect with us on social media</p>
              
              <div className='flex gap-3 pt-2'>
                <a className='px-2 py-2 rounded-lg cursor-pointer group hover:bg-blue-400 lasticon' target="_blank" href='https://www.instagram.com/al_ways_kush/'> <CiInstagram className='group-hover:text-red-400 group-hover:scale-120' /></a>
                <a className='px-2 py-2 rounded-lg cursor-pointer group hover:bg-blue-400 lasticon group' target="_blank" href='https://www.linkedin.com/in/alkush-pipania-49269929b/'> <FaLinkedinIn className='group-hover:scale-120' /></a>
                <a className='px-2 py-2 rounded-lg cursor-pointer group hover:bg-blue-400 lasticon group' target="_blank" href='https://x.com/AlkushPipania'><FaXTwitter className='group-hover:scale-120 group-hover:text-black' /></a>
              </div>
              
            </div>
            <div className='flex flex-col justify-start items-start text-nowrap'>
              <div className="uppercase">
                <h3 className='footdiff'>support</h3>
                <ul>
                  <li className='hover:text-blue-300 cursor-pointer'>faq</li>
                  <li>contact us</li>
                  <li className='text-wrap'>terms of service</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className='flex flex-col item-center gap-2'>
              <div className='flex items-center gap-4'>
                <img src={indiaflag} className='w-[35px]' alt="" />
                <h3 className='hover:text-blue-300 cursor-pointer'>India</h3>
              </div>
              <Currenttime />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;
