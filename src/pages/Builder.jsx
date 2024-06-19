import React, { Suspense } from 'react';
import Header from '../component/Header';
import MainSpinner from '../component/MainSpinner';
import { Routes, Route } from "react-router-dom";
import Template from '../pages/template';
import HomeContainer from '../component/HomeContainer';
import UserProfile from './UserProfile';
import CreateResume from './CreateResume';
import TemplateDesignPInDetail from './TemplateDesignPInDetail';

const Builder = () => {
  return (
    <div className="w-full overflow-auto  h-screen bg-slate-300 flex flex-col">
      <Header />
      <main className="w-full flex-1 pt-16">
        <Suspense fallback={<MainSpinner />}>
          <Routes>
            <Route path='/' element={<HomeContainer />} />
            <Route path='/template/create' element={<Template />} />
            <Route path='/profile/:uid' element={<UserProfile />} />
            <Route path='/resume/*' element={<CreateResume />} />
            <Route path='/resumeDetail/:templateID' element={<TemplateDesignPInDetail />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Builder;