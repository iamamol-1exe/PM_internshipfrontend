import { useState } from 'react';


const Tag = ({ label, onRemove }) => (
    <div className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
        <span>{label}</span>
        <button onClick={onRemove} className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
);

const Sidebar = ({skills}) => {

    const [roleInput, setRoleInput] = useState('');
    const [locationInput, setLocationInput] = useState('');

  
    const [jobRoles, setJobRoles] = useState([]);
    const [locations, setLocations] = useState(['Pune', 'Mumbai']);
    

    const [stipendAvailable, setStipendAvailable] = useState(false);

    const handleAddItem = (value, list, setList, setInput) => {
        const trimmedValue = value.trim();
        if (trimmedValue && !list.map(item => item.toLowerCase()).includes(trimmedValue.toLowerCase())) {
            setList([...list, trimmedValue]);
            setInput('');
        }
    };


    const handleRemoveItem = (itemToRemove, list, setList) => {
        setList(list.filter(item => item !== itemToRemove));
    };

    const handleKeyDown = (e, callback) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            callback();
        }
    };
    

    const handleSave = () => {
        const preferences = {
            jobRoles,
            preferredLocations: locations,
            stipendAvailable
        };
        
    };

    const handleGetRecommendation = () => {
        const recommendationQuery = {
            preferredJobRoles: jobRoles,
            preferredLocations: locations,
            stipendAvailable,
            skills: skills
        };
        console.log(" Recommendation Query Sent:", recommendationQuery);
        
    };


    return (
        <aside className="w-full md:w-80 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg shadow p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Add preferences to get matching jobs</h3>
                <div className="space-y-4 text-sm">

                 
                    <div>
                        <label className="font-medium text-gray-600">Preferred job role</label>
                        <div className="flex gap-2 mt-1">
                            <input
                                type="text"
                                value={roleInput}
                                onChange={(e) => setRoleInput(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, () => handleAddItem(roleInput, jobRoles, setJobRoles, setRoleInput))}
                                placeholder="e.g., Frontend Developer"
                                className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                             <button onClick={() => handleAddItem(roleInput, jobRoles, setJobRoles, setRoleInput)} className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {jobRoles.map(role => (
                                <Tag key={role} label={role} onRemove={() => handleRemoveItem(role, jobRoles, setJobRoles)} />
                            ))}
                        </div>
                    </div>

                   
                    <div>
                        <label className="font-medium text-gray-600">Preferred work location</label>
                         <div className="flex gap-2 mt-1">
                            <input
                                type="text"
                                value={locationInput}
                                onChange={(e) => setLocationInput(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, () => handleAddItem(locationInput, locations, setLocations, setLocationInput))}
                                placeholder="e.g., Delhi"
                                className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button onClick={() => handleAddItem(locationInput, locations, setLocations, setLocationInput)} className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {locations.map(location => (
                                <Tag key={location} label={location} onRemove={() => handleRemoveItem(location, locations, setLocations)} />
                            ))}
                        </div>
                    </div>

                   
                    <div>
                        <label className="font-medium text-gray-600">Stipend available</label>
                        <div className="mt-2 flex items-center">
                            <button
                                onClick={() => setStipendAvailable(!stipendAvailable)}
                                className={`px-4 py-2 rounded-full font-semibold text-xs transition-colors ${
                                    stipendAvailable 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {stipendAvailable ? 'Yes' : 'No'}
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
                    <h4 className="font-semibold text-gray-700">Recommended jobs</h4>
                    <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded">36 New</span>
                </div>
                <p className="text-gray-600">Scrum Master</p>
            </div>
        </aside>
    );
};

export default Sidebar;