import { useState } from "react";

const Tag = ({ label, onRemove }) => (
  <div className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
    <span>{label}</span>
    <button
      onClick={onRemove}
      className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

const Sidebar = ({ skills, setData, handleRecommendation, data }) => {
  const [roleInput, setRoleInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [education, setEduction] = useState("");
  const [stipendAvailable, setStipendAvailable] = useState(false);

  const handleSave = () => {
    const preferences = {
      jobRole: roleInput,
      preferredLocations: locationInput,
      education: education,
      skills: skills,
      stipendAvailable,
    };
    console.log(preferences);
  };

  const handleGetRecommendation = () => {
    const recommendationQuery = {
      preferredJobRoles: roleInput,
      preferredLocations: locationInput,
      stipendAvailable,
      education: education,
      skills: skills,
    };
    setData(recommendationQuery);
    handleRecommendation(recommendationQuery);
  };

  return (
    <aside className="w-full md:w-80 flex-shrink-0 space-y-6">
      <div className="bg-white rounded-lg shadow p-5">
        <h3 className="font-semibold text-gray-800 mb-4">
          Add preferences to get matching Internships
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <label className="font-medium text-gray-600">
              Preferred job role
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                placeholder="e.g., Frontend Developer"
                className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-gray-600">
              Preferred work location
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="e.g., Delhi"
                className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="font-medium text-gray-600">
              Highest Education
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={education}
                onChange={(e) => setEduction(e.target.value)}
                placeholder="e.g., B.tech"
                className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="font-medium text-gray-600">
              Stipend available
            </label>
            <div className="mt-2 flex items-center">
              <button
                onClick={() => setStipendAvailable(!stipendAvailable)}
                className={`px-4 py-2 rounded-full font-semibold text-xs transition-colors ${
                  stipendAvailable
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {stipendAvailable ? "Yes" : "No"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Preferences
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <button
          onClick={handleGetRecommendation}
          className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
        >
          Get Recommendation
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-5 text-sm">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-700">
            Recommended Internships
          </h4>
          <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded">
            36 New
          </span>
        </div>
        <p className="text-gray-600">Scrum Master</p>
      </div>
    </aside>
  );
};

export default Sidebar;
