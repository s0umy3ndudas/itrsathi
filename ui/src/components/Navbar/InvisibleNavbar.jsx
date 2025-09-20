import React, { useState, useRef, useEffect } from 'react';
import { User, Edit, HelpCircle, LogOut, Search, Sun } from 'lucide-react';

const InvisibleNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClick = (action) => {
    setIsDropdownOpen(false);
    // Handle menu actions here
    console.log(`Clicked: ${action}`);
  };

  return (
    <div className="fixed top-0 right-0 z-50">
      {/* Invisible Navbar */}
      <nav className="flex items-center justify-end px-6 py-4">
        {/* Right side - Search, Theme, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
       

          {/* Theme Toggle */}
          {/* <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
            <Sun className="w-5 h-5" />
          </button> */}

          {/* Notifications */}



      
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-medium text-sm">Som Das</p>
                      <p className="text-gray-400 text-xs">somdas1509@gmail.com</p>
                    </div>
                  </div>
                </div>

                {/* Account Options Header */}
                <div className="px-4 py-2 border-b border-gray-700">
                  <h3 className="text-gray-300 text-xs font-medium uppercase tracking-wide">
                    Account Options
                  </h3>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => handleMenuClick('profile')}
                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </button>

                  <button
                    onClick={() => handleMenuClick('edit-business')}
                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Edit Business</span>
                  </button>

                  <button
                    onClick={() => handleMenuClick('help')}
                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-sm">Help</span>
                  </button>

                  <div className="border-t border-gray-700 my-2"></div>

                  <button
                    onClick={() => handleMenuClick('logout')}
                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Log out</span>
                  </button>
                </div>
              </div>
            )}
       </div>   </div>
      </nav>
    </div> 
  );
};

export default InvisibleNavbar;