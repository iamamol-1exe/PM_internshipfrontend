import React from 'react';

// --- SVG Icons ---
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 16.95l.001-.001M16.263 16.95l.001-.001M12 21a9 9 0 100-18 9 9 0 000 18z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-5 h-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
              <img 
                className="h-12 w-auto" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
                alt="Emblem of India"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x48/e2e8f0/333?text=Logo'; }}
              />
              <div>
                <span className="block font-bold text-sm text-gray-800">PM Internship</span>
                <span className="block text-xs text-gray-500">Scheme</span>
              </div>
            </a>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8">
            <div className="relative w-full max-w-lg">
              <input
                type="search"
                placeholder="Search jobs here"
                className="w-full bg-gray-100 text-black border-transparent rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <SearchIcon />
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="hidden sm:flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-full transition duration-150">
              <GlobeIcon />
              English
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BellIcon />
            </button>
            <button className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 p-2 rounded-full transition duration-150">
              <MenuIcon />
              <UserIcon />
            </button>
          </div>
        </div>

        {/* Search Bar for mobile */}
        <div className="md:hidden pb-4 px-2">
           <div className="relative w-full">
              <input
                type="search"
                placeholder="Search jobs here"
                className="w-full bg-gray-100 border-transparent rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <SearchIcon />
              </div>
            </div>
        </div>
      </div>
    </header>
  );
}
