import { useState } from "react";

const KeySkills = ({setSkills1}) => {
    const [skills, setSkills] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddSkill = () => {
        
        if (inputValue.trim() !== '' && !skills.includes(inputValue.trim())) {
            setSkills([...skills, inputValue.trim()]);
            setInputValue(''); 
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    
    const handleSave = () => {
        console.log("Skills saved:", skills);
        setSkills1(skills)
    };
    
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Key skills</h2>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a skill and press Enter"
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={handleAddSkill}
                    className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <div key={skill} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                        <span>{skill}</span>
                        <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                ))}
            </div>
             <div className="flex justify-end mt-4 space-x-2">
                <button className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300">Cancel</button>
                
                <button 
                    onClick={handleSave} 
                    className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default KeySkills;