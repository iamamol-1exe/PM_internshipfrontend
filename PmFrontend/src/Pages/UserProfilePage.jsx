import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialSkills = [
  "SQL",
  "Python",
  "NoSQL",
  "Wireframing",
  "C",
  "Figma",
  "Jira",
  "Ruby",
  "Confluence",
  "Mixpanel",
  "Pandas",
  "Tally ERP",
  "Bookkeeping",
  "Fundamentals of Auditing",
  "Scrum",
  "C++",
  "Java",
  "Project Management",
  "HTML/CSS",
  "Docker Management",
  "Other",
];

const UserProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  // State for all form fields
  const [profileData, setProfileData] = useState({
    fullname: "",
    location: "",
    university: "",
    highest_education: "",
    cgpa: "",
  });

  // Fetch user data from database
  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
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

        // Update localStorage with fresh data
        localStorage.setItem("user", JSON.stringify(user));

        // Only redirect if profile is complete AND user is NOT in edit mode
        if (user.highest_education != null && !isEditMode) {
          alert(
            "Profile already completed. Redirecting to your information page."
          );
          setTimeout(() => navigate("/userinfo"), 500);
          return;
        }

        // Load user data into form (for both new profile and edit mode)
        setProfileData({
          fullname: user.fullname || "",
          location: user.location || "",
          university: user.university || "",
          highest_education: user.highest_education || "",
          cgpa: user.cgpa || "",
        });

        // Load skills if they exist
        if (user.skills) {
          const userSkills = Array.isArray(user.skills) ? user.skills : [];
          const existingSkills = {};
          const existingCustomSkills = [];

          userSkills.forEach((skill) => {
            if (initialSkills.includes(skill)) {
              existingSkills[skill] = true;
            } else {
              existingCustomSkills.push(skill);
              existingSkills[skill] = true;
            }
          });

          setSkills((prev) => ({ ...prev, ...existingSkills }));
          setCustomSkills(existingCustomSkills);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      if (error.response && error.response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setMessage({
          text: "Failed to load profile data. Please refresh the page.",
          type: "error",
        });
      }
    }
  }, [navigate, isEditMode]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const [message, setMessage] = useState({ text: "", type: "" });

  const [skills, setSkills] = useState(
    initialSkills.reduce((acc, skill) => ({ ...acc, [skill]: false }), {})
  );
  const [customSkill, setCustomSkill] = useState("");
  const [customSkills, setCustomSkills] = useState([]);

  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSkillChange = (skill) => {
    setSkills((prev) => ({ ...prev, [skill]: !prev[skill] }));
  };

  const handleAddCustomSkill = () => {
    if (
      customSkill.trim() &&
      !skills[customSkill.trim()] &&
      !initialSkills.includes(customSkill.trim())
    ) {
      const newSkill = customSkill.trim();
      setCustomSkills((prev) => [...prev, newSkill]);
      setSkills((prev) => ({ ...prev, [newSkill]: true }));
      setCustomSkill("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" }); // Get token (assuming you store it in localStorage after login)

    const token = localStorage.getItem("token"); // 1. Gather all selected skills
    const selectedSkills = Object.keys(skills).filter((key) => skills[key]); // 2. Prepare payload
    const payload = {
      ...profileData,
      skills: selectedSkills,
    }; // Simple validation
    if (!profileData.fullname || !profileData.university) {
      setMessage({
        text: "Name and University are required fields.",
        type: "error",
      });
      return;
    }

    try {
      // FIX: Using Authorization header for robust authentication
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Still necessary for cookie fallback
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } // Request uses /api/user/updateProfile based on index.js prefix
      const url = import.meta.env.VITE_API_BASE_URL + "/api/user/updateProfile";
      const response = await axios.put(url, payload, config);
      console.log("Profile update response:", response);

      if (response.status === 200 || response.status === 201) {
        // Update localStorage with the updated user data from the response
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        setMessage({
          text: response.data.message || "Profile updated successfully!",
          type: "success",
        });

        // Redirect to user info page
        navigate("/userinfo");
      } else {
        setMessage({
          text: response.data.error || "Failed to update profile.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Profile submission error:", error); // If the error is 401, guide the user to log in again
      const isAuthError = error.response && error.response.status === 401;
      const errorMessage = isAuthError
        ? "Authentication failed. Please log in again."
        : error.response?.data?.error ||
          error.message ||
          "Network error. Please try again later.";
      setMessage({ text: errorMessage, type: "error" }); // Optional: Redirect to login page on 401
      if (isAuthError) {
        // navigate('/login'); // Uncomment if you have a login route
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
      <div className="font-sans w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8">
        {/* HEADLINE */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          {isEditMode ? "Edit Your Profile" : "Complete Your Profile"}
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Status Message */}
          {message.text && (
            <div
              className={`p-3 mb-4 rounded-lg text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Name */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Name
              </label>

              <input
                id="fullname"
                type="text"
                placeholder="Enter your Name"
                value={profileData.fullname}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
              />
            </div>
            {/* Location */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>

              <input
                id="location"
                placeholder="Enter your Location"
                type="text"
                value={profileData.location}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
              />
            </div>
            {/* University */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="university"
              >
                University
              </label>

              <input
                id="university"
                placeholder="Enter your University Name"
                type="text"
                value={profileData.university}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
              />
            </div>
            {/* Highest Education */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="highest_education"
              >
                Highest Education
              </label>

              <select
                id="highest_education"
                value={profileData.highest_education}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 appearance-none"
              >
                <option value="">Select from here</option>
                <option value="High School">High School</option>

                <option value="Bachelor's Degree">Bachelor's Degree</option>

                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            {/* GPA */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cgpa"
              >
                CGPA (Optional)
              </label>

              <input
                id="cgpa"
                type="text"
                placeholder="Enter your CGPA"
                value={profileData.cgpa}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
              />
            </div>
          </div>
          {/* Technical & Soft Skills */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Technical & Soft Skill
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {initialSkills.map((skill) => (
                <div key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    id={skill}
                    checked={skills[skill] || false}
                    onChange={() => handleSkillChange(skill)}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />

                  <label htmlFor={skill} className="ml-2 text-gray-700">
                    {skill}
                  </label>
                </div>
              ))}

              {customSkills.map((skill) => (
                <div key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    id={skill}
                    checked={skills[skill] || false}
                    onChange={() => handleSkillChange(skill)}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />

                  <label htmlFor={skill} className="ml-2 text-gray-700">
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Add Custom Skill */}
          <div className="mt-6 flex items-center">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Add Custom Skill"
              className="flex-grow px-4 py-3 text-black bg-gray-100 border-transparent rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
            />

            <button
              type="button"
              onClick={handleAddCustomSkill}
              className=" bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-r-lg transition-all duration-300"
            >
              Add
            </button>
          </div>
          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
