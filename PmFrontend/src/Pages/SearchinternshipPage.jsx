import React, { useState } from "react";
import axios from "axios";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  LightBulbIcon,
  LocationIcon,
  RupeeIcon,
  SearchIcon,
  SparklesIcon,
  UserIcon,
} from "../Icons/Icons";
import InternshipCard from "../Components/InternshipCard";

// --- Reusable Icons ---

// --- Internship Card Component ---

// --- Student Dashboard Component ---
export default function StudentDashboard() {
  const [recommendationCount, setRecommendationCount] = useState(3);
  const [formData, setFormData] = useState({
    name: "",
    education: "Any Education",
    location: "",
    skills: "",
    interest: "",
  });
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);

  // Function to get skills from user profile
  const getSkillsFromProfile = async () => {
    setIsLoadingSkills(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to access your profile");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const url = import.meta.env.VITE_API_BASE_URL + "/api/user/profile";
      const response = await axios.get(url, config);

      if (response.status === 200 && response.data.user) {
        const user = response.data.user;
        if (
          user.skills &&
          Array.isArray(user.skills) &&
          user.skills.length > 0
        ) {
          const skillsString = user.skills.join(", ");
          setFormData((prev) => ({ ...prev, skills: skillsString }));
        } else {
          alert(
            "No skills found in your profile. Please complete your profile first."
          );
        }
      }
    } catch (error) {
      console.error("Error fetching skills from profile:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please login again.");
      } else {
        alert("Failed to load skills from profile. Please try again.");
      }
    } finally {
      setIsLoadingSkills(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const recommendations = [
    {
      id: 1,
      jobTitle: "Fullstack Developer",
      company: "Bluehat Synapse",
      experience: "0-2 Yrs",
      salary: "Not disclosed",
      location: "Pune (Aundh)",
      description: "Internship or project experience preferred...",
      tags: ["HTML", "Javascript", "Full Stack"],
      postedDate: "3 Days Ago",
      logoUrl: "https://placehold.co/48x48/e2e8f0/333?text=BS",
    },
    {
      id: 2,
      jobTitle: "Frontend Developer Intern",
      company: "Optimmoyz AI",
      experience: "0-1 Yrs",
      salary: "1-2 Lacs PA",
      location: "Remote",
      description: "Must have experience with CSS, Wordpress...",
      tags: ["CSS", "Wordpress", "React"],
      postedDate: "2 Days Ago",
      logoUrl: "https://placehold.co/48x48/e2e8f0/333?text=OA",
    },
    {
      id: 3,
      jobTitle: "Backend Engineer (Node.js)",
      company: "Innovate Tech",
      experience: "1-3 Yrs",
      salary: "Not disclosed",
      location: "Mumbai",
      description: "Join our backend team to build scalable services...",
      tags: ["Node.js", "MongoDB", "API"],
      postedDate: "5 Days Ago",
      logoUrl: "https://placehold.co/48x48/e2e8f0/333?text=IT",
    },
    {
      id: 4,
      jobTitle: "Data Science Intern",
      company: "Analytics Pro",
      experience: "0-1 Yrs",
      salary: "₹25,000/month",
      location: "Bangalore",
      description: "Work with our data science team...",
      tags: ["Python", "Pandas", "Scikit-learn"],
      postedDate: "1 Week Ago",
      logoUrl: "https://placehold.co/48x48/e2e8f0/333?text=AP",
    },
    {
      id: 5,
      jobTitle: "Product Management Intern",
      company: "Creative Solutions",
      experience: "0-2 Yrs",
      salary: "Not disclosed",
      location: "Remote",
      description: "Learn the ropes of product management...",
      tags: ["Product", "Agile", "Jira"],
      postedDate: "1 Day Ago",
      logoUrl: "https://placehold.co/48x48/e2e8f0/333?text=CS",
    },
  ];

  const filterFields = [
    {
      name: "Name / Title",
      icon: UserIcon,
      placeholder: "e.g., Software Developer",
    },
    {
      name: "Education",
      icon: AcademicCapIcon,
      type: "select",
      options: [
        "Any Education",
        "High School",
        "Bachelor's Degree",
        "B.tech",
        "BSC",
        "BBA",
        "Master's Degree",
        "M.tech",
        "MBA",
        "PhD",
      ],
    },
    { name: "Location", icon: LocationIcon, placeholder: "e.g., Pune" },
    { name: "Skills", icon: SparklesIcon, placeholder: "e.g., React, Python" },
    { name: "Interest", icon: LightBulbIcon, placeholder: "e.g., AI, Fintech" },
  ];

  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* --- Welcome Header --- */}
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-bold text-gray-800">
            Welcome, Student!
          </h3>
          <p className="text-gray-600">
            Let's find the perfect internship to kickstart your career.
          </p>
        </div>

        {/* --- Search & Filter Section --- */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterFields.map(
              ({ name, icon: Icon, type, placeholder, options }) => {
                const fieldKey = name
                  .toLowerCase()
                  .replace(/\s.*/, "")
                  .replace("/", "");
                return (
                  <div key={name} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {name}
                      {name === "Skills" && (
                        <button
                          type="button"
                          onClick={getSkillsFromProfile}
                          disabled={isLoadingSkills}
                          className="ml-2 text-xs bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-2 py-1 rounded-md transition-colors duration-200"
                        >
                          {isLoadingSkills ? "Loading..." : "Get from Profile"}
                        </button>
                      )}
                    </label>
                    <Icon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                    {type === "select" ? (
                      <select
                        value={formData[fieldKey] || ""}
                        onChange={(e) =>
                          handleInputChange(fieldKey, e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                      >
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={formData[fieldKey] || ""}
                        onChange={(e) =>
                          handleInputChange(fieldKey, e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    )}
                  </div>
                );
              }
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recommendations to Show
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setRecommendationCount(number)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all duration-200 ${
                      recommendationCount === number
                        ? "bg-green-500 text-white shadow-md scale-110"
                        : "bg-slate-200 text-gray-700 hover:bg-slate-300"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
                <SearchIcon />
                <span className="ml-2">Search Internships</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- Recommendations Section --- */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Your Top Recommendations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.slice(0, recommendationCount).map((internship) => (
              <InternshipCard key={internship.id} {...internship} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
