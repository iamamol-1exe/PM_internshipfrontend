import React, { useState } from 'react'
import Sidebar from '../component/Sidebar'
import MainContent from '../component/MainContent'
import Header from '../component/Header'

const LandingPage = () => {
  const [skills,setSkills] = useState([]);
  console.log(skills)
  return (
    <div className="bg-[#3AAF85] min-h-screen font-sans">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            <Sidebar skills={skills} />
            <MainContent  setSkills ={setSkills}/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
