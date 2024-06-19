import React, { useState } from 'react';
import logo from '../assets/img/nexlinkerlogo.png';
import useUser from '../hooks/useUser';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PuffLoader } from 'react-spinners';
import { HiLogout } from 'react-icons/hi';
import { slideUpDownMenu } from '../animations';
import { auth } from '../config/firebase.config';
import { useQueryClient } from 'react-query';
import { adminIds } from '../utils/helpers';
import useFilter from '../hooks/useFilter';

const Header = () => {
  const { data: filterData } = useFilter();
  const { data, isLoading } = useUser();
  const [isMenu, setIsMenu] = useState(false);

  // Sign out functionality
  const queryClient = useQueryClient();
  const signOutUser = async () => {
    await auth.signOut().then(() => {
      queryClient.setQueryData('user', null);
    });
  };

  const handleSearchTerm = (e) => {
    queryClient.setQueryData("globalFilter", { ...queryClient.getQueryData("globalFilter"), searchTerm: e.target.value });
  };

  return (
    <header className="w-full flex justify-between  py-3 lg:px-8 border-b border-gray-300 bg-slate-700 z-50 lg:gap-12 fixed top-0">
      {/* logo */}
      <Link to="/builder" className='flex items-center gap-4 text-sm font-semibold group'>
        <img src={logo} className="w-11 h-auto object-contain" alt="rkg-resumebuilder" />
        <h3 className="text-headingcol group-hover:text-blue-500 transition ease-in-out delay-150 text-xl duration-300">NexLinker</h3>
      </Link>
      {/* input */}
      <div className="lg:flex-1 border border-gray-300  lg:px-4 py-1 rounded-b-md flex items-center justify-between bg-gray-100">
        <input
          value={filterData?.searchTerm || ""}
          onChange={handleSearchTerm}
          type="text"
          placeholder='Search here...'
          className='md:flex-1 lg:flex-1 text-center bg-transparent text-base outline-none lg:w-[] w-[150px] h-10 bg-gray-100 border-none'
        />
      </div>
      <div className='mr-2'>
        {/* profile section */}
        <AnimatePresence>
          {isLoading ? (
            <PuffLoader color='#498FCD' size={40} />
          ) : (
            <React.Fragment>
              {data ? (
                <motion.div className="relative" onClick={() => setIsMenu(!isMenu)}>
                  {data?.photoURL ? (
                    <div className='w-12 h-12 rounded-md relative flex cursor-pointer items-center justify-center'>
                      <img src={data?.photoURL} referrerPolicy="no-referrer" className='w-full rounded-full h-full object-cover' alt="Profile" />
                    </div>
                  ) : (
                    <div className='w-12 h-12 rounded-full relative flex cursor-pointer items-center justify-center bg-blue-700 shadow-md'>
                      <p className="uppercase text-lg text-white">{data?.email[0]}</p>
                    </div>
                  )}

                  {/* drop down menu */}
                  <AnimatePresence>
                    {isMenu && (
                      <motion.div
                        {...slideUpDownMenu}
                        transition={{
                          initial: { delay: 2 },
                          animate: { delay: 5 },
                          exit: { delay: 2 }
                        }}
                        onMouseLeave={() => setIsMenu(!isMenu)}
                        className='absolute px-4 py-3 rounded-md bg-black right-0 top-16 flex flex-col items-center justify-center w-64 pt-12 gap-3'
                      >
                        {data?.photoURL ? (
                          <div className='w-20 h-20 rounded-md relative flex flex-col cursor-pointer items-center justify-center'>
                            {/* dp */}
                            <img src={data?.photoURL} referrerPolicy="no-referrer" className='w-full rounded-full h-full object-cover' alt="Profile" />
                          </div>
                        ) : (
                          <div className='w-20 h-20 rounded-full relative flex cursor-pointer items-center justify-center bg-blue-700 shadow-md'>
                            <p className="uppercase text-lg text-white">{data?.email[0]}</p>
                          </div>
                        )}
                        {/* name */}
                        {data?.displayName && <p className="text-lg text-white"> {data?.displayName}</p>}

                        <div className="w-full flex-col flex gap-8 pt-6 items-start pb-3">
                          <Link className="text-txtLight text-base whitespace-nowrap" to={`/builder/profile/${data?.uid}`}>My account</Link>
                          {/* template feature for admin only */}
                          {adminIds.includes(data?.uid) && (
                            <Link className="text-txtLight text-base whitespace-nowrap" to={'/builder/template/create'}>Add New Template</Link>
                          )}
                          <div onClick={signOutUser}
                            className='w-full px-2 py-2 border-t cursor-pointer border-gray-300 items-center justify-between flex group'>
                            <p className='text-white'>Signout</p>
                            <HiLogout className='' />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <Link to="/auth">
                  <motion.div
                    className='px-4 py-2 rounded-md border border-gray-300 bg-gray-200 hover:scale-95 duration-150'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Login
                  </motion.div>
                </Link>
              )}
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
