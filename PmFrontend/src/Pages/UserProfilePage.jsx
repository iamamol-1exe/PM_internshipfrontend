import React from 'react';

const UserProfile = () => {
  const initialSkills = [
    'SQL', 'Python', 'Wireframing', 'C',
    'Figma', 'Jira', 'Ruby', 'Confluence',
    'Mixpanel', 'Scrum', 'C++', 'Java',
    'Project Management', 'Amplitude', 'Docker Management', 'Other'
  ];

  const [skills, setSkills] = React.useState(
    initialSkills.reduce((acc, skill) => ({ ...acc, [skill]: false }), {})
  );
  const [customSkill, setCustomSkill] = React.useState('');
  const [customSkills, setCustomSkills] = React.useState([]);

  const handleSkillChange = (skill) => {
    setSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !customSkills.includes(customSkill.trim()) && !initialSkills.includes(customSkill.trim())) {
      setCustomSkills(prev => [...prev, customSkill.trim()]);
      setSkills(prev => ({ ...prev, [customSkill.trim()]: true }));
      setCustomSkill('');
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="font-sans w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder='Enter your Name'
                className="w-full px-4 py-3 bg-gray-100  text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                placeholder='Enter your Location'
                type="text"
                className="w-full px-4 py-3 bg-gray-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
              />
            </div>

            {/* University */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="university">
                University
              </label>
              <input
                id="university"
                placeholder='Enter your University Name'
                type="text"
                className="w-full px-4 py-3 bg-gray-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
              />
            </div>

            {/* Highest Education */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">
                Highest Education
              </label>
              <select
                id="education"
                className="w-full px-4 py-3 bg-gray-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200 appearance-none"
              >
                <option>Select from here</option>
                <option>High School</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>PhD</option>
              </select>
            </div>

            {/* GPA */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gpa">
                CGPA (Optional)
              </label>
              <input
                id="gpa"
                type="text"
                placeholder='Enter your CGPA'
                className="w-full px-4 py-3 bg-gray-100  text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
              />
            </div>
          </div>
          
          {/* Technical & Soft Skills */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Technical & Soft Skill</h3>
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
                  <label htmlFor={skill} className="ml-2 text-gray-700">{skill}</label>
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
                  <label htmlFor={skill} className="ml-2 text-gray-700">{skill}</label>
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
              className="flex-grow px-4 py-3 text-black bg-gray-100 border-transparent rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
            />
            <button
              type="button"
              onClick={handleAddCustomSkill}
              className=" bg-green-400 hover:bg-green-300 text-gray-800 font-bold py-3 px-6 rounded-r-lg transition-all duration-300"
            >
              Add
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-300 text-black font-bold py-3 px-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
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

