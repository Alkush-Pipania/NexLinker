import React, { useState } from 'react'
import { AnimatePresence, delay, easeInOut, motion } from 'framer-motion'
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from "react-icons/bi"
import useUser from '../hooks/useUser'
import { saveToCollection, saveToFavourite } from '../api'
import useTemplate from '../hooks/useTemplate'
import { useNavigate } from 'react-router-dom'
const TemplateDesgin = ({ data, index }) => {
  const { data: user, refetch: userRefetch } = useUser();
  const { refetch: temp_reftch } = useTemplate();
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate();
  const addToCollection = async (e) => {
    e.stopPropagation();
    await saveToCollection(user, data);
    userRefetch();

  }
  const addToFavourite = async (e) => {
    e.stopPropagation();
    await saveToFavourite(user, data);
    temp_reftch();
  }
  const handleRouteNavigation = () =>{
    navigate(`resumeDetail/${data?._id}`,{replace:true})
  }
  return (
    <motion.div
      
      key={data?._id}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ delay: index * 0.3, ease: easeInOut }}
    >
      <div className="w-full h-[500px] 2xl:h-[700px] rounded-md bg-gray-200 overflow-hidden relative cursor-pointer" 
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
        <img src={data?.imageURL} className='w-full h-full object-cover' />
        <AnimatePresence>
          {isHovered && (
            <motion.div onClick={handleRouteNavigation}
            className='absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3  cursor-pointer'>
              <div className='flex flex-col items-end justify-start w-full gap-8'>
                <InnerBoxCard label={user?.collection?.includes(data?._id) ? "Added" : "Add"}
                  Icon={user?.collection?.includes(data?._id) ? BiSolidFolderPlus : BiFolderPlus}
                  onHandle={addToCollection} />
                <InnerBoxCard label={data?.favourite?.includes(user?.uid) ? "Added to favourite" : "want to add?"} Icon={data?.favourite?.includes(user?.uid) ? BiSolidHeart : BiHeart} onHandle={addToFavourite} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const InnerBoxCard = ({ label, Icon, onHandle }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div onClick={onHandle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative">
      <Icon className="text-txtPrimary text-base"></Icon>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ delay: 0.1 }}


            className='px-3 py-2 rounded-md bg-gray-200 absolute -left-44 '>
            <p className='text-sm whitespace-nowrap'>{label}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

}

export default TemplateDesgin