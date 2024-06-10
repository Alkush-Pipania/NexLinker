import React, { Suspense } from 'react'
import Header from '../component/Header'
import MainSpinner from '../component/MainSpinner'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template from '../pages/template'
import HomeContainer from '../component/HomeContainer'
import UserProfile from './UserProfile';
import CreateResume from './CreateResume';
import TemplateDesignPInDetail from './TemplateDesignPInDetail';


const Builder = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* header */}
      <Header />
      <main className="w-full">
        <Suspense fallback={<MainSpinner />}>
          <Routes>
            <Route path='/' element={<HomeContainer />} />
            <Route path='/template/create' element={<Template />} />
{/*             <Route path='/profile/:uid' element={<UserProfile />} /> */}
{/*             <Route path='/resume/*' element={<CreateResume />} /> */}
            <Route path='/resumeDetail/:templateID' element={<TemplateDesignPInDetail />} />
          </Routes>

        </Suspense>
      </main>
    </div>
  )
}

export default Builder
