import React from 'react';

// --- Reusable Icons ---
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

// --- Landing Page Component ---
export default function LandingPage({ onNavigate }) {
    const featuredInternships = [
        { id: 1, title: 'Product Manager Intern', company: 'Innovate Inc.', location: 'Pune', type: 'Full-time', logo: 'https://placehold.co/40x40/e2e8f0/333?text=I' },
        { id: 2, title: 'Data Analyst Intern', company: 'DataDriven Co.', location: 'Remote', type: 'Part-time', logo: 'https://placehold.co/40x40/e2e8f0/333?text=D' },
        { id: 3, title: 'UX/UI Design Intern', company: 'Creative Solutions', location: 'Mumbai', type: 'Full-time', logo: 'https://placehold.co/40x40/e2e8f0/333?text=C' },
    ];
    
    return (
        <div className="font-sans text-gray-800">
            {/* --- Hero Section --- */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                        Find Your Perfect PM Internship
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        Our AI-powered platform matches you with exclusive product management internships at top companies across India. Build your profile and get personalized recommendations today.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => onNavigate('login')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 inline-flex items-center">
                            Get Started <ArrowRightIcon />
                        </button>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-lg border border-gray-300 transition-transform transform hover:scale-105">
                            Browse Internships
                        </button>
                    </div>
                </div>
            </section>

            {/* --- Featured Internships --- */}
            <section className="pt-8 pb-16 bg-gray-50">
                 <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Featured Internships</h2>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Here are some of the top opportunities available right now from leading companies.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredInternships.map(internship => (
                             <div key={internship.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <div className="flex-grow">
                                    <div className="flex items-center mb-4">
                                        <img src={internship.logo} alt={`${internship.company} logo`} className="w-10 h-10 rounded-full mr-4 bg-gray-200" />
                                        <div>
                                            <h3 className="font-bold text-lg">{internship.title}</h3>
                                            <p className="text-gray-700">{internship.company}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-2">
                                        <span>{internship.location}</span> &bull; <span>{internship.type}</span>
                                    </div>
                                </div>
                                <a href="#" className="text-green-600 hover:underline font-semibold mt-4 inline-block self-start">View Details &rarr;</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

