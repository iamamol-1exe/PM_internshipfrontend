import React from 'react';

// --- SVG Icons ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);


// --- Add New Internship Form Component ---
const AddNewInternship = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 relative">
                    
                    {/* Back to Dashboard Link */}
                    <div className="absolute top-6 right-8">
                        <a href="#" className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                           <BackArrowIcon />
                           Back to Dashboard
                        </a>
                    </div>

                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            
                            {/* Company Name */}
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company-name">
                                    Company Name
                                </label>
                                <input
                                    id="company-name"
                                    type="text"
                                    placeholder="eg. Infotech"
                                    className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                />
                            </div>

                            {/* Internship Title */}
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internship-title">
                                    Internship Title
                                </label>
                                <input
                                    id="internship-title"
                                    type="text"
                                    placeholder="eg. Software Developer"
                                    className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                />
                            </div>
                            
                            {/* Required Skill */}
                             <div className="md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="required-skill">
                                    Required Skill
                                </label>
                                <input
                                    id="required-skill"
                                    type="text"
                                    placeholder="eg. node, html"
                                    className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    placeholder="eg. Pune"
                                    className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                />
                            </div>

                            {/* Stipend */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stipend">
                                    Stipend
                                </label>
                                <input
                                    id="stipend"
                                    type="text"
                                    placeholder="eg. 10000"
                                    className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                />
                            </div>

                            {/* Detail */}
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail">
                                    Detail
                                </label>
                                <textarea
                                    id="detail"
                                    rows="4"
                                    placeholder="Internship Details"
                                    className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 text-center">
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewInternship;
