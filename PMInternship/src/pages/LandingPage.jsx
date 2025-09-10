import React, { useState } from "react";

import Sidebar from "../component/Sidebar";
import MainContent from "../component/MainContent";
import Header from "../component/Header";
import axios from "axios";

const LandingPage = () => {
  const [skills, setSkills] = useState([]);
  const [data, setData] = useState({});
  const [jobListings, setjobListings] = useState([]);

  const getRecommendation = async (formData) => {
    const link = import.meta.env.VITE_LINK || "";
    console.log("API URL:", link);
    console.log(formData);

    try {
      // Use form data if available, otherwise use default values
      const requestData = {
        jobRole: formData.preferredJobRoles,
        education: formData.education,
        skills: formData.skills,
        location: formData.preferredLocations,
      };

      const result = await axios.post(link, requestData);

      if (result.status === 200) {
        // Ensure we're setting an array to jobListings
        const responseData = result.data.data.results;
        console.log(responseData);
        const normalizedJobs = Array.isArray(responseData)
          ? responseData.map((job) => ({
              id: job.id,
              title: job.title,
              company: job.company,
              location: job.preferred_location,
              skills: job.skills,
              description: job.description,
              salary: job.stipend,
            }))
          : [];

        setjobListings(normalizedJobs);
        console.log(Array.isArray(jobListings) && jobListings.length > 0);
      } else {
        console.log("somrthing else");
      }
    } catch (error) {
      console.error("Error occurred at JobListingdata:", error);
      throw error;
    }
  };
  return (
    <div className="bg-[#3AAF85] min-h-screen font-sans">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar
            skills={skills}
            setData={setData}
            handleRecommendation={getRecommendation}
            data={data}
          />
          <MainContent setSkills={setSkills} jobListings={jobListings} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
