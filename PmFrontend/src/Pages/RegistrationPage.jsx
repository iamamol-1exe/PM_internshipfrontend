import React from "react";

// --- Icons (can be reused from your other files) ---
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 6.57C34.567 2.744 29.633 0 24 0C10.745 0 0 10.745 0 24s10.745 24 24 24s24-10.745 24-24c0-1.341-.128-2.64-.359-3.917z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691c-1.328 2.219-2.102 4.773-2.102 7.502s.774 5.282 2.102 7.502l6.23-4.832c-.172-.51-.278-1.047-.278-1.613s.106-1.103.278-1.613l-6.23-4.945z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 48c5.633 0 10.567-1.922 14.195-5.186l-6.23-4.832C29.633 40.078 27.025 42 24 42c-4.467 0-8.28-2.586-9.865-6.135l-6.23 4.945C10.117 43.19 16.594 48 24 48z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083L43.59 20H24v8h11.303a12.012 12.012 0 0 1-5.12 7.994l6.23 4.832C39.922 36.637 44 30.825 44 24c0-1.341-.128-2.64-.359-3.917z"
    ></path>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
      clipRule="evenodd"
    />
  </svg>
);

export default function RegistrationPage() {
  return (
    // This new outer div uses flexbox to center the card on the page
    <div className="w-full flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="font-sans w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white">
          {/* Left Panel */}
          <div className="w-full lg:w-1/2 bg-[#E9E9D8] flex items-center justify-center p-8 lg:p-12">
            <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md text-center">
              <img
                src="https://www.skillindiadigital.gov.in/assets/new-ux-img/register-img/register-illustration.svg"
                alt="PM Internship Scheme Illustration"
                className="w-48 mx-auto mb-6"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/200x150/e2e8f0/333?text=Illustration";
                }}
              />
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-800">
                Join the PM Internship Scheme
              </h1>
            </div>
          </div>

          {/* Right Panel: Registration Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                Create your Account
              </h2>
              <p className="text-gray-500 mb-8 text-center">
                Get started in just a few steps.
              </p>

              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="full-name"
                  >
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    required
                    placeholder="Enter your Full Name"
                    className="w-full px-4 text-black py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your Email"
                    className="w-full text-black px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    required
                    type="password"
                    placeholder="Create a Password"
                    className="w-full text-black px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-all duration-300"
                >
                  Register
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Log in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
