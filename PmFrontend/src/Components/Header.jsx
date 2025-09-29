import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- CRITICAL FIX ---
// This error happens when the file cannot be found.
// Please make sure you have created the following folder and file:
// FOLDER: src/context
// FILE:   src/context/AuthContext.jsx
// The import path below should then work correctly.
import { AuthContext } from '../context/AuthContext';

// --- SVG Icons ---
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

const LogoutIcon = () => (
    <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export default function Header() {
    const { isAuthenticated, logout, userType } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to landing page after logout
    };

    const dashboardPath = userType === 'admin' ? '/admindashboard' : '/searchinternships';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to={isAuthenticated ? dashboardPath : '/'} className="flex items-center space-x-2">
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
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8">
            <div className="relative w-full max-w-lg">
              <input
                type="search"
                placeholder="Search jobs here"
                className="w-full bg-gray-100 text-black border-transparent rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <SearchIcon />
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
                <>
                    {/* --- Logged IN Buttons --- */}
                    <Link to="/userprofile" className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 p-2 rounded-full transition duration-150" title="Profile">
                        <MenuIcon />
                        <UserIcon />
                    </Link>
                    <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100" title="Logout">
                        <LogoutIcon />
                    </button>
                </>
            ) : (
                <>
                    {/* --- Logged OUT Buttons --- */}
                    <Link to="/login" className="font-semibold text-gray-600 hover:text-green-600 px-3 py-2 rounded-md">
                        Log In
                    </Link>
                    <Link to="/studentregistration" className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                        Sign Up
                    </Link>
                </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

