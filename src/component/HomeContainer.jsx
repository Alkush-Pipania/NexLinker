import React from 'react'
import Filter from './Filter'
import { PulseLoader } from 'react-spinners';
import useTemplate from '../hooks/useTemplate'
import TemplateDesign from './TemplateDesgin';
import { AnimatePresence } from 'framer-motion';
const HomeContainer = () => {
  const { data:templates,isLoading: temp_loading,isError: temp_isError, refetch:temp_reftech } = useTemplate()

  if(temp_loading){
    return (
      
      <PulseLoader className='h-[100vh] m-auto' color="#36d7b7" />

    
    
    )
  }
    
  
  return (
    <div className="w-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start">
      {/* top suggestion */}
      <Filter />
      {/* templates */}
      {temp_isError?(
        <React.Fragment className="text-lg text-txtDark"><p>Something went wrong , try again later</p></React.Fragment>
      ):(<React.Fragment>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-2'>
          <RenderTemplate templates={templates}/>
          
        </div>
      </React.Fragment>)}

    </div>
    
  )
}

const RenderTemplate = ({ templates }) => {
  return (
    <React.Fragment>
      {templates && templates.length > 0 ? (
        <AnimatePresence>
          {templates.map((template, index) => (
            <TemplateDesign 
              key={template?._id}
              data={template}
              index={index}
            />
          ))}
        </AnimatePresence>
      ) : (
        <div><p>NO DATA FOUND</p></div>
      )}
    </React.Fragment>
  );
};

export default HomeContainer