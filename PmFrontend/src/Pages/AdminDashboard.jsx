import React from 'react';

// --- SVG Icons ---
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

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const HideIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m0 0l-2.11 2.11" />
    </svg>
);

const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const ServerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
);

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6.2a2 2 0 012-2c.5 0 1 .2 1.4.6l2 2a2 2 0 001.4.6H17a2 2 0 012 2v4a2 2 0 01-2 2h-1.2l-2 2a2 2 0 00-1.4.6c-.4.4-.9.6-1.4.6H9zm-2-2v.8a2 2 0 002 2h6a2 2 0 002-2v-.8m-7-2v2h4v-2m-4-6V8h4v2m-4-4V4h4v2" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

// --- Internship Card Component ---
const InternshipCard = ({ jobTitle, company, experience, salary, location, description, tags, postedDate, logoUrl }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-100 flex items-start gap-4">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="font-bold text-md text-gray-800">{jobTitle}</h2>
                        <p className="text-sm text-gray-600">{company}</p>
                    </div>
                    <img src={logoUrl} alt={`${company} logo`} className="w-10 h-10 rounded-lg object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/e2e8f0/333?text=Logo'; }}/>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-3 text-sm text-gray-700">
                    <div className="flex items-center"><BriefcaseIcon /> {experience}</div>
                    <div className="flex items-center"><RupeeIcon /> {salary}</div>
                    <div className="flex items-center"><LocationIcon /> {location}</div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{postedDate}</span>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center hover:text-blue-600"><HideIcon /> Hide</button>
                        <button className="flex items-center hover:text-blue-600"><SaveIcon /> Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Server Control Card Component ---
const ServerControlCard = ({ icon, title, buttonText }) => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
            {icon}
            <h3 className="font-bold text-lg text-gray-800 mt-4">{title}</h3>
            <button className="mt-4 bg-green-100 text-green-800 font-semibold py-2 px-6 rounded-lg hover:bg-green-200 transition-colors duration-300">
                {buttonText}
            </button>
        </div>
    );
};


// --- Main Admin Dashboard Component ---
const AdminDashboard = () => {
    const internships = [
        { jobTitle: "Fullstack Developer", company: "Bluehat Synapse", experience: "0-2 Yrs", salary: "Not Disclosed", location: "Pune (Aundh)", description: "Internship or project experience preferred. We are hiring a fresher Full Stack Developer...", tags: ["HTML", "Javascript", "Website"], postedDate: "3 Days Ago", logoUrl: "https://placehold.co/40x40/dbeafe/3b82f6?text=BS" },
        { jobTitle: "Internship Trainee", company: "Optimayou.ai", experience: "0-1 Yrs", salary: "1-2 Lacs PA", location: "Remote", description: "Must have CSS, Wordpress, HTML, Restful API, MySQL, Javascript, PHP, SpringBoot experience...", tags: ["CSS", "Wordpress", "MySQL"], postedDate: "2 Days Ago", logoUrl: "https://placehold.co/40x40/dcfce7/16a34a?text=OA" },
        { jobTitle: "Frontend Developer Intern", company: "Tech Solutions", experience: "0 Yrs", salary: "₹20,000 /month", location: "Mumbai", description: "Exciting opportunity for a frontend intern to work with React and Tailwind CSS on modern web projects.", tags: ["React", "TailwindCSS", "Frontend"], postedDate: "5 Days Ago", logoUrl: "https://placehold.co/40x40/fee2e2/b91c1c?text=TS" },
        { jobTitle: "Backend Developer", company: "Data Corp", experience: "1-2 Yrs", salary: "Not Disclosed", location: "Bengaluru", description: "Join our backend team to build scalable APIs and manage our database infrastructure with Node.js and PostgreSQL.", tags: ["Node.js", "PostgreSQL", "API"], postedDate: "1 Week Ago", logoUrl: "https://placehold.co/40x40/e0e7ff/4338ca?text=DC" }
    ];

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Top Control Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <ServerControlCard icon={<ServerIcon />} title="Start Server" buttonText="Start" />
                    <ServerControlCard icon={<BrainIcon />} title="Re-Train Model" buttonText="Re-Train" />
                </div>

                {/* Main Internships Section */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Internship Postings</h2>
                        <button className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                           <PlusIcon/> Add New
                        </button>
                    </div>

                    {/* Internship Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {internships.map((internship, index) => (
                            <InternshipCard key={index} {...internship} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
