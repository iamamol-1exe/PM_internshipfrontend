import React, { useState } from 'react';

// --- Reusable Icons ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const RupeeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 4h4m2 4h-3a4 4 0 110-8h1a4 4 0 110 8z" />
    </svg>
);

const LocationIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-1.5 text-gray-500"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const UserIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AcademicCapIcon = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.002 12.083 12.083 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
    </svg>
);

const SparklesIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const LightBulbIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);


// --- Internship Card Component ---
const InternshipCard = ({ jobTitle, company, experience, salary, location, description, tags, postedDate, logoUrl }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-5 border border-gray-200 flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{jobTitle}</h3>
                        <p className="text-sm text-gray-600">{company}</p>
                    </div>
                    <img src={logoUrl} alt={`${company} logo`} className="w-12 h-12 rounded-lg object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/48x48/e2e8f0/333?text=Logo'; }}/>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-3 text-sm text-gray-700">
                    <div className="flex items-center"><BriefcaseIcon /> {experience}</div>
                    <div className="flex items-center"><RupeeIcon /> {salary}</div>
                    <div className="flex items-center"><LocationIcon /> {location}</div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t">
                <span>{postedDate}</span>
                <a href="#" className="text-green-600 hover:underline font-semibold">View Details &rarr;</a>
            </div>
        </div>
    );
};


// --- Student Dashboard Component ---
export default function StudentDashboard() {
    const [recommendationCount, setRecommendationCount] = useState(3);

    const recommendations = [
        { id: 1, jobTitle: 'Fullstack Developer', company: 'Bluehat Synapse', experience: '0-2 Yrs', salary: 'Not disclosed', location: 'Pune (Aundh)', description: 'Internship or project experience preferred...', tags: ['HTML', 'Javascript', 'Full Stack'], postedDate: '3 Days Ago', logoUrl: 'https://placehold.co/48x48/e2e8f0/333?text=BS' },
        { id: 2, jobTitle: 'Frontend Developer Intern', company: 'Optimmoyz AI', experience: '0-1 Yrs', salary: '1-2 Lacs PA', location: 'Remote', description: 'Must have experience with CSS, Wordpress...', tags: ['CSS', 'Wordpress', 'React'], postedDate: '2 Days Ago', logoUrl: 'https://placehold.co/48x48/e2e8f0/333?text=OA' },
        { id: 3, jobTitle: 'Backend Engineer (Node.js)', company: 'Innovate Tech', experience: '1-3 Yrs', salary: 'Not disclosed', location: 'Mumbai', description: 'Join our backend team to build scalable services...', tags: ['Node.js', 'MongoDB', 'API'], postedDate: '5 Days Ago', logoUrl: 'https://placehold.co/48x48/e2e8f0/333?text=IT' },
        { id: 4, jobTitle: 'Data Science Intern', company: 'Analytics Pro', experience: '0-1 Yrs', salary: '₹25,000/month', location: 'Bangalore', description: 'Work with our data science team...', tags: ['Python', 'Pandas', 'Scikit-learn'], postedDate: '1 Week Ago', logoUrl: 'https://placehold.co/48x48/e2e8f0/333?text=AP' },
        { id: 5, jobTitle: 'Product Management Intern', company: 'Creative Solutions', experience: '0-2 Yrs', salary: 'Not disclosed', location: 'Remote', description: 'Learn the ropes of product management...', tags: ['Product', 'Agile', 'Jira'], postedDate: '1 Day Ago', logoUrl: 'https://placehold.co/48x48/e2e8f0/333?text=CS' }
    ];

    const filterFields = [
        { name: 'Name / Title', icon: UserIcon, placeholder: 'e.g., Software Developer' },
        { name: 'Education', icon: AcademicCapIcon, type: 'select', options: ['Any Education', 'High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'] },
        { name: 'Location', icon: LocationIcon, placeholder: 'e.g., Pune' },
        { name: 'Skills', icon: SparklesIcon, placeholder: 'e.g., React, Python' },
        { name: 'Interest', icon: LightBulbIcon, placeholder: 'e.g., AI, Fintech' },
    ];

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* --- Welcome Header --- */}
                <div className="mb-8 text-center">
                    <h3 className="text-3xl font-bold text-gray-800">Welcome, Student!</h3>
                    <p className="text-gray-600">Let's find the perfect internship to kickstart your career.</p>
                </div>

                {/* --- Search & Filter Section --- */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filterFields.map(({ name, icon: Icon, type, placeholder, options }) => (
                            <div key={name} className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">{name}</label>
                                <Icon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                                {type === 'select' ? (
                                    <select className="w-full pl-10 pr-4 py-2 bg-slate-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none">
                                        {options.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                ) : (
                                    <input type="text" placeholder={placeholder} className="w-full pl-10 pr-4 py-2 bg-slate-100 text-black border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                                )}
                            </div>
                        ))}
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
                                                ? 'bg-green-500 text-white shadow-md scale-110'
                                                : 'bg-slate-200 text-gray-700 hover:bg-slate-300'
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Your Top Recommendations</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {recommendations.slice(0, recommendationCount).map(internship => (
                            <InternshipCard key={internship.id} {...internship} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

