import React, { useState, useEffect } from "react";
import InternshipCard from "../Components/InternshipCard";
import { BrainIcon, PlusIcon, ServerIcon } from "../Icons/Icons";
import { Link } from "react-router-dom";
import axios from "axios";

// --- Server Control Card Component ---
// const ServerControlCard = ({ icon, title, buttonText }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
//       {icon}
//       <h3 className="font-bold text-lg text-gray-800 mt-4">{title}</h3>
//       <button className="mt-4 bg-green-100 text-green-800 font-semibold py-2 px-6 rounded-lg hover:bg-green-200 transition-colors duration-300">
//         {buttonText}
//       </button>
//     </div>
//   );
// };

// --- Main Admin Dashboard Component ---
const AdminDashboard = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch internships from API
  const fetchInternships = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/internships/getInterShips"
      );

      console.log("API Response:", response.data); // Debug log

      // Check if response.data is an array or if data is nested
      let internshipsData = [];

      if (Array.isArray(response.data)) {
        internshipsData = response.data;
      } else if (response.data && Array.isArray(response.data.internships)) {
        internshipsData = response.data.internships;
      } else if (response.data && Array.isArray(response.data.data)) {
        internshipsData = response.data.data;
      } else {
        console.error("Unexpected response format:", response.data);
        throw new Error("Invalid response format from server");
      }

      // Transform API data to match component props if needed
      const transformedData = internshipsData.map((internship) => ({
        jobTitle: internship.title,
        company: internship.company,
        experience: "0-2 Yrs", // Default since not provided by API
        salary: internship.stipend
          ? `₹${internship.stipend}/month`
          : "Not Disclosed",
        location: internship.preferred_location,
        description: internship.description,
        tags: Array.isArray(internship.skills)
          ? internship.skills
          : typeof internship.skills === "string" && internship.skills
          ? internship.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill !== "")
          : [],
        postedDate: "Recently", // Default since not provided by API
        logoUrl: `https://placehold.co/40x40/dbeafe/3b82f6?text=${internship.company.charAt(
          0
        )}`,
      }));

      setInternships(transformedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching internships:", err);
      setError("Failed to load internships. Please try again later.");

      // Fallback to empty array or show error message
      setInternships([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch internships on component mount
  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Control Section */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <ServerControlCard
            icon={<ServerIcon />}
            title="Start Server"
            buttonText="Start"
          />
          <ServerControlCard
            icon={<BrainIcon />}
            title="Re-Train Model"
            buttonText="Re-Train"
          />
        </div> */}

        {/* Main Internships Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Internship Postings
            </h2>
            <Link
              to="/addnewinternships"
              className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <PlusIcon /> Add New
            </Link>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading internships...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchInternships}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* No Data State */}
          {!loading && !error && internships.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No internships available.</p>
              <p className="text-gray-400 text-sm mt-2">
                Add some internships to get started!
              </p>
            </div>
          )}

          {/* Internship Cards Grid */}
          {!loading && !error && internships.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {internships.map((internship, index) => (
                <InternshipCard key={index} {...internship} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
