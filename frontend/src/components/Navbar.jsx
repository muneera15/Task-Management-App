import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const username = localStorage.getItem("user");
  const name = JSON.parse(username)
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm py-3 px-6">
      <div className="flex justify-between items-center">
        {/* Left side - Logo */}
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>

        {/* Right side - Navigation */}
        {localStorage.getItem("token") && (
          <div className="flex items-center space-x-4 relative">
            {/* User profile */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="text-sm font-medium text-gray-700">
                {name}
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2 text-rose-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;