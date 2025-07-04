import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useUser } from "../../context/UserContext"; // Adjust the import path as necessary
import { useDarkMode } from "../../context/DarkModeContext"; // Import the dark mode context

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Explicitly type the state
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use the dark mode context
  const { user } = useUser(); // Access user context

  const toggleMenu = () => setIsOpen((prev) => !prev); // Use functional update for state

  return (
    <nav className="bg-red-500 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              Video Streaming Site
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            {/* Upload Button */}
            <Link to="/upload" className="text-white hover:text-gray-300">
              Upload
            </Link>
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            {user ? (
              <Link to="/logout" className="text-white hover:text-gray-300">
                Logout
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:text-gray-300">
                  Register
                </Link>
              </>
            )}

            {/* Dark Mode Toggle Button */}
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="text-white hover:text-gray-300"
                aria-label="Toggle dark mode"
              >
                <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-600 hover:bg-gray-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-600 hover:bg-gray-200"
            >
              About
            </Link>
            {user ? (
              <Link
                to="/logout"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-600 hover:bg-gray-200"
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-600 hover:bg-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-600 hover:bg-gray-200"
                >
                  Register
                </Link>
              </>
            )}

            {/* Dark Mode Toggle Button */}
            <div className="px-3 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={toggleDarkMode}
                className="text-white hover:text-gray-300"
                aria-label="Toggle dark mode"
              >
                <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
