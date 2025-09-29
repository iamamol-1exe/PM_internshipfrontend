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


// --- Internship Card Component ---

const InternshipCard = ({ jobTitle, company, experience, salary, location, description, tags, postedDate, logoUrl }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-100 flex flex-col sm:flex-row items-start gap-5">
            {/* Checkbox */}
            
            <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="font-bold text-lg text-gray-800">{jobTitle}</h2>
                        <p className="text-sm text-gray-600">{company}</p>
                    </div>
                    <img src={logoUrl} alt={`${company} logo`} className="w-12 h-12 rounded-lg object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/48x48/e2e8f0/333?text=Logo'; }}/>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-3 text-sm text-gray-700">
                    <div className="flex items-center"><BriefcaseIcon /> {experience}</div>
                    <div className="flex items-center"><RupeeIcon /> {salary}</div>
                    <div className="flex items-center"><LocationIcon /> {location}</div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>

                {/* Footer */}
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

export default InternshipCard;

