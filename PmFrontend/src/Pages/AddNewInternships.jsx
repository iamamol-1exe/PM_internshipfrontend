import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// --- SVG Icons ---
const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

// --- Add New Internship Form Component ---
const AddNewInternship = () => {
  // State for form data with two-way data binding
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    stipend: "",
    preferred_location: "",
    company: "",
  });

  // Handle input changes for two-way data binding
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add Internships function
  const addInternships = async (e) => {
    e.preventDefault();

    // Convert skills string to array and stipend to number
    const internshipData = {
      title: formData.title,
      description: formData.description,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
      stipend: parseFloat(formData.stipend) || 0,
      preferred_location: formData.preferred_location,
      company: formData.company,
    };

    try {
      console.log("Adding internship:", internshipData);

      const url = import.meta.env.VITE_API_ADD_INTERNSHIP;
      const response = await axios.post(url, internshipData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Internship added successfully:", response.data);
      alert("Internship added successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        skills: "",
        stipend: "",
        preferred_location: "",
        company: "",
      });
    } catch (error) {
      console.error("Error adding internship:", error);

      // Handle axios error response
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || "Server error";
        alert(`Error adding internship: ${errorMessage}`);
      } else if (error.request) {
        // Request was made but no response received
        alert(
          "Error: No response from server. Please check if the API is running."
        );
      } else {
        // Something else happened
        alert("Error adding internship: " + error.message);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 relative">
          {/* Back to Dashboard Link */}
          <div className="absolute top-6 right-8">
            <Link
              to="/admindashboard"
              href="#"
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <BackArrowIcon />
              Back to Dashboard
            </Link>
          </div>

          <form onSubmit={addInternships}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Company Name */}
              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="company-name"
                >
                  Company Name
                </label>
                <input
                  id="company-name"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="eg. Infotech"
                  className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>

              {/* Internship Title */}
              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="internship-title"
                >
                  Internship Title
                </label>
                <input
                  id="internship-title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="eg. Software Developer"
                  className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>

              {/* Required Skill */}
              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="required-skill"
                >
                  Required Skills (comma-separated)
                </label>
                <input
                  id="required-skill"
                  name="skills"
                  type="text"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="eg. Tally ERP, GST Compliance, Bookkeeping"
                  className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Preferred Location
                </label>
                <input
                  id="location"
                  name="preferred_location"
                  type="text"
                  value={formData.preferred_location}
                  onChange={handleInputChange}
                  placeholder="eg. Pune, Maharashtra"
                  className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>

              {/* Stipend */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stipend"
                >
                  Stipend
                </label>
                <input
                  id="stipend"
                  name="stipend"
                  type="number"
                  value={formData.stipend}
                  onChange={handleInputChange}
                  placeholder="eg. 12000"
                  className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>

              {/* Detail/Description */}
              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="detail"
                >
                  Description
                </label>
                <textarea
                  id="detail"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Join our accounting department to assist with bookkeeping, ledger reconciliation, and the preparation of financial statements..."
                  className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
              >
                Add Internship
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewInternship;
