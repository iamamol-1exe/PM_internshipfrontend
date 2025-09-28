import React, { useState } from 'react';

// --- Reusable Icons ---
const PencilIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const MailIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LinkIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

const LocationIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-1.5 text-gray-500"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const AcademicCapIcon = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.002 12.083 12.083 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
    </svg>
);


// --- Compact Internship Card for Profile Page ---
const ProfileInternshipCard = ({ jobTitle, company, location, logoUrl }) => {
    return (
        <div className="bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200 p-4 border border-slate-200 flex items-center gap-4">
            <img src={logoUrl} alt={`${company} logo`} className="w-12 h-12 rounded-lg object-contain flex-shrink-0" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/48x48/e2e8f0/333?text=Logo'; }}/>
            <div className="flex-1">
                 <h3 className="font-bold text-md text-gray-800">{jobTitle}</h3>
                 <p className="text-sm text-gray-600">{company}</p>
                 <div className="flex items-center text-xs text-gray-500 mt-1">
                    <LocationIcon className="w-4 h-4 mr-1"/>
                    <span>{location}</span>
                 </div>
            </div>
            <a href="#" className="text-green-600 hover:text-green-700 font-semibold text-sm self-center">&rarr;</a>
        </div>
    );
};

// --- Initials Avatar Component ---
const InitialsAvatar = ({ name }) => {
    const initials = name.split(' ').map(n => n[0]).join('');
    return (
        <div className="w-24 h-24 rounded-full bg-green-500 text-white flex items-center justify-center text-4xl font-bold border-4 border-white shadow-md">
            {initials}
        </div>
    );
};


// --- User Profile Page Component ---
export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState('saved');

    const user = {
        name: 'Priya Sharma',
        title: 'Aspiring Product Manager',
        location: 'Pune, Maharashtra',
        bio: "Recent computer science graduate from the University of Pune with a passion for building user-centric products. Eager to apply my skills in a real-world setting and grow as a product leader.",
        email: 'priya.sharma@example.com',
        portfolio: 'priyasharma.dev',
        education: {
            degree: "Bachelor's in Computer Science",
            university: 'University of Pune',
        },
        skills: ['Product Strategy', 'Jira', 'Agile', 'User Research', 'Figma', 'SQL'],
        savedInternships: [
             { id: 1, jobTitle: 'Product Manager Intern', company: 'Innovate Inc.', location: 'Pune', logoUrl: 'https://placehold.co/48x48/e2e8f0/333?text=I' },
             { id: 2, jobTitle: 'Associate Product Manager', company: 'Creative Solutions', location: 'Mumbai', logoUrl: 'https://placehold.co/48x48/e2e8f0/333?text=CS' }
        ],
        appliedInternships: [
             { id: 3, jobTitle: 'Data Analyst Intern', company: 'DataDriven Co.', location: 'Remote', logoUrl: 'https://placehold.co/48x48/e2e8f0/333?text=D' }
        ]
    };
    
    const TabButton = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tabName
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-slate-200'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="font-sans bg-slate-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                
                {/* --- Profile Card --- */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <InitialsAvatar name={user.name} />
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                            <p className="text-green-600 font-semibold">{user.title}</p>
                            <div className="flex items-center justify-center sm:justify-start text-sm text-gray-500 mt-1">
                               <LocationIcon className="w-4 h-4 mr-1.5"/> {user.location}
                            </div>
                        </div>
                        <button className="bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold py-2 px-6 rounded-lg flex items-center transition-colors">
                            <PencilIcon className="w-4 h-4 mr-2" />
                            Edit Profile
                        </button>
                    </div>

                    <div className="border-t border-gray-200 mt-6 pt-6">
                        <p className="text-gray-600">{user.bio}</p>
                         <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 mt-4">
                            <a href={`mailto:${user.email}`} className="flex items-center hover:text-green-600">
                                <MailIcon className="w-5 h-5 mr-2 text-gray-400"/> {user.email}
                            </a>
                            <a href={`https://${user.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-600">
                                <LinkIcon className="w-5 h-5 mr-2 text-gray-400"/> {user.portfolio}
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- Main Content --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Education Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
                             <div className="flex items-start gap-4">
                                <AcademicCapIcon className="w-8 h-8 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-800">{user.education.degree}</p>
                                    <p className="text-sm text-gray-600">{user.education.university}</p>
                                </div>
                            </div>
                        </div>
                        {/* Skills Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Top Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {user.skills.map(skill => (
                                    <span key={skill} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Internships */}
                    <div className="lg:col-span-2">
                         <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                                    <TabButton tabName="saved" label={`Saved (${user.savedInternships.length})`} />
                                    <TabButton tabName="applied" label={`Applied (${user.appliedInternships.length})`} />
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                {activeTab === 'saved' && (user.savedInternships.length > 0 ? user.savedInternships.map(internship => (
                                    <ProfileInternshipCard key={internship.id} {...internship} />
                                )) : <p className="text-center text-gray-500 py-4">No saved internships yet.</p>)}
                                
                                {activeTab === 'applied' && (user.appliedInternships.length > 0 ? user.appliedInternships.map(internship => (
                                    <ProfileInternshipCard key={internship.id} {...internship} />
                                )) : <p className="text-center text-gray-500 py-4">You haven't applied to any internships yet.</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

