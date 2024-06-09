import React from 'react'
import { RiseLoader } from 'react-spinners'

const MainSpinner = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiseLoader color='#36d67f' size ={25}/>
    </div>
  )
}

export default MainSpinner