import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext"; // Import the provider
import './index.css'

// Import your page and layout components
import Layout from './Pages/Layout.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import RegistrationPage from './Pages/RegistrationPage.jsx';
import UserProfilePage from './Pages/UserProfilePage.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import AddNewInternship from './Pages/AddNewInternships.jsx';
import LandingPage from './Pages/LandingPage.jsx';
import StudentDashboard from './Pages/SearchinternshipPage.jsx';
import UserInfoPage from './Pages/UserInfoPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="userinfo" element={<UserInfoPage />} />
      <Route path="studentregistration" element={<RegistrationPage />} />
      <Route path="userprofile" element={<UserProfilePage />} />
      <Route path="admindashboard" element={<AdminDashboard />} />
      <Route path="addnewinternships" element={<AddNewInternship />} />
      <Route path="searchinternships" element={<StudentDashboard />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* The AuthProvider now wraps your router */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

