import React, { useState } from 'react'
import { MdLayersClear } from 'react-icons/md'
import {AnimatePresence,motion} from 'framer-motion'
import { FiltersData } from '../utils/helpers'
import  useFilter  from '../hooks/useFilter'
import { useQueryClient } from 'react-query'

const Filter = () => {
  const [ismousehover, setIsMouseHover] = useState(false);
  const { data: filterData, isLoading, isError, refetch} = useFilter()

  const queryclient = useQueryClient();
  const handleFilterValue = (value) =>{
    // const previousState = queryclient.getQueryData("globalFilter");
    // const updatedState = {...previousState,searchTerm : value}
    // queryclient.setQueryData("globalFilter",updatedState)
    queryclient.setQueryData("globalFilter",{...queryclient.getQueryData("globalFilter"),searchTerm:value})
  }
   const clearit = () =>{
    queryclient.setQueryData("globalFilter",{...queryclient.getQueryData("globalFilter"),searchTerm:""})
   }
  return (
    <div className=" w-full flex items-center justify-start py-4 gap-3">
      <div className="border-gray-300 rounded-md px-3 py-2  mb-2 cursor-pointer group-hover:shadow-md bg-gray-200 relative" onMouseEnter={()=>{setIsMouseHover(true)}} onMouseLeave={()=>{setIsMouseHover(false)}}>
        <MdLayersClear className="text-xl" />
        <AnimatePresence>
          {ismousehover && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={clearit}
            className='absolute -top-8 -left-1 bg-white shadow-md rounded-md px-2 py-1'>
             <p className="whitespace-nowrap text-xs">Clear all</p>
           </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full flex items-center justify-start overflow-scroll gap-6 scrollbar-none">
        {FiltersData && FiltersData.map((item)=>(
          <div
           onClick={()=> handleFilterValue(item.value)}
          key={item.id} className={`border border-gray-300 rounded-md px-2 py-2 text-white cursor-pointer hover:shadow-md ${filterData?.searchTerm === item.value? (" bg-gray-500 text-white") :("bg-gray-400") }`} {...(filterData?.searchTerm === item.value && { onClick: clearit })}>
            <p className="text-sm whitespace-nowrap">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter