import React from 'react'


const Findpeer = () => {
  return (
    <div
    className="w-full h-screen flex flex-col justify-start items-start " id='findpeer'
    >
      <div className='flex justify-start items-center pt-5 px-6 text-3xl font-bold ' id='peerhead'>
       <h3> Find peer</h3>
      </div>
      <div className='lg:mt-[332px] mt-[219px] lg:ml-[215px]'>
        <h3 className=' text-4xl ml-[114px] font-bold font-cominsoon'>
          <span className='dark1'>Com</span>
          <span className='dark2'>ing</span>
          <span className='dark3'> soon</span>
          <span className='dark4'>...</span>
           </h3>
        <p className='lg:w-[450px] ml-[113px] mr-6 mt-2 text-gray-200'>
        find peer is designed to help you discover students who share your values, intelligence, sense of humor, skills, and mindset. Whether you're looking for a study buddy, a project partner, or a new friend with similar interests, PeerMatch will make it happen.
        </p>
      </div>
      

    </div>
  )
}

export default Findpeer