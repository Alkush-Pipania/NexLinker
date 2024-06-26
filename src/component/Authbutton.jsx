import React from 'react';
import { auth } from '../config/firebase.config';
import { GoogleAuthProvider, GithubAuthProvider, signInWithRedirect } from 'firebase/auth';


const Authbutton = ({ Icon, label, provider }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();

  const handleClick = async () => {
    try {
      switch (provider) {
        case 'GoogleAuthProvider':
          await signInWithRedirect(auth, googleAuthProvider);
          break;
        case 'GithubAuthProvider':
          await signInWithRedirect(auth, githubAuthProvider);
          break;
        default:
          throw new Error('Unsupported provider');
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  

  return (
    <div 
    onClick={handleClick}
    className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-white font-bold py-2 px-4 rounded flex items-center justify-center">
     <Icon className="h-5 w-5 mr-2"/>
      {label}
    </div>
    
  );
};

export default Authbutton;





// <div
    //   onClick={handleClick}
    //   className="mt-3 flex items-center justify-between gap-3 px-3 py-3 rounded-full hover:shadow-md cursor-pointer font-inter-bold bg-slate-300 font-light hover:text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300 ease-in-out group"
    // >
    //   
    //   <p className="">{label}</p>
    //   {/* <FaChevronRight className="group-hover:text-amber-500 text-base " /> */}
    // </div>