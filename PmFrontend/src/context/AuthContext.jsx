import React, { createContext, useState, useEffect } from 'react';

// This creates the context, which other components can use
export const AuthContext = createContext(null);

// This is the provider component that will wrap your entire app
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const [token, setToken] = useState(null);

    // This checks for a token in local storage when the app first loads
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserType = localStorage.getItem('userType');
        if (storedToken) {
            setIsAuthenticated(true);
            setToken(storedToken);
            setUserType(storedUserType);
        }
    }, []);

    // This function will be called from the LoginPage on a successful login
    const login = (newToken, newUserType) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('userType', newUserType);
        setToken(newToken);
        setUserType(newUserType);
        setIsAuthenticated(true);
    };

    // This function will be called from the Header to log the user out
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setToken(null);
        setUserType(null);
        setIsAuthenticated(false);
    };

    // This makes the auth state and functions available to all child components
    return (
        <AuthContext.Provider value={{ isAuthenticated, userType, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// We export the provider as the default for this file
export default AuthProvider;

