// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (

    <div className=''>

      <div className='flex flex-col items-center justify-center h-screen bg-slate-200  text-2xl text-white'>
       <div className='flex flex-col items-center justify-center px-4 py-6 rounded-md border border-blue-700 bg-blue-400 text-2xl text-white'>
       <h1 className='text-black'>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className=' cursor-pointer bg-purple-600 px-2 py-2 hover:bg-purple-700 text-slate-300 hover:scale-105 transition duration-150  hover:text-white rounded-lg mt-5' to={'/'}>back to the Page</Link>
       </div>
    </div>
      </div>
      
  );
};

export default NotFound;
