import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Home, Bell, Calendar, Settings, Sun, Moon, ChevronLeft, ChevronRight, FileSpreadsheet , LogOutIcon, Plus, LogOut, ArrowUpRight} from 'lucide-react';
import { useAuth } from "../hooks/useAuth"; // adjust path

const TabLayout = ({ children }) => {


    const location = useLocation();
  const { logout } = useAuth();


   const handleLogout = () => {
    logout();
    // optionally redirect to login
    window.location.href = "/login";
  };

  const { isDarkMode, toggleTheme, setLightMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const tabs = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/notices', icon: Bell, label: 'Notices' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
 
    { path: '/csv-editor', icon: FileSpreadsheet, label: 'CSV Editor' },
{ path: '/add-assessee', icon: Plus, label: 'Add Assessees' },

        
  ];

  const handleNavigation = (path) => {
    console.log('Navigation clicked, current theme:', isDarkMode);
    setLightMode();
    setIsMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

    return (
      <div className="flex h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {/* Sidebar */}
        <aside 
          className={`hidden md:flex flex-col bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
            isSidebarExpanded ? 'w-64' : 'w-20'
          }`}
        >
 
          <div className="p-4 flex items-center justify-between">
            {isSidebarExpanded && (
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-800 transition-colors duration-200">ITR Sathi</h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isSidebarExpanded ? (
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
   <nav className="flex-1 px-2 py-4 space-y-1">
  {tabs.map(({ path, icon: Icon, label, action }) => {
    const isActive = location.pathname === path;
    const base =
      "flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200";
    const colors = isActive
      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";
    const commonClasses = `${base} ${colors} ${isSidebarExpanded ? "" : "justify-center"}`;

    const iconEl = (
      <Icon
        className={`w-5 h-5 ${isSidebarExpanded ? "mr-3" : ""}`}
        aria-hidden="true"
      />
    );

    // Render as <button> for actions (e.g., Logout)
    if (action) {
      return (
        <button
          key={label}
          onClick={action}
          className={commonClasses}
          title={!isSidebarExpanded ? label : undefined}
          aria-label={!isSidebarExpanded ? label : undefined}
          type="button"
        >
          {iconEl}
          {isSidebarExpanded && <span className="truncate">{label}</span>}
        </button>
      );
    }  

    // Regular nav link
    return (
      <Link
        key={path}
        to={path}
        onClick={() => handleNavigation(path)}
        className={commonClasses}
        title={!isSidebarExpanded ? label : undefined}
        aria-label={!isSidebarExpanded ? label : undefined}
      >
        {iconEl}
        {isSidebarExpanded && <span className="truncate">{label}</span>}
      </Link>
    );
  })}

  
</nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
   <Link
  to="/upgrade"
  onClick={() => handleNavigation('/upgrade')}
  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 mt-2 ${
    location.pathname === '/upgrade'
      ? 'dark:bg-green-900/30 text-green-800 dark:text-green-200'
      : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
  }`}
>
  <ArrowUpRight className="w-5 h-5 mr-0 shrink-0 text-green-500" />
  {isSidebarExpanded && <span className="ml-3">Upgrade</span>}
</Link>
          </div>






        </aside>

        {/* Mobile menu button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-600 dark:text-white transition-colors duration-200"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-200">App Name</h1>
              <nav className="space-y-1">
                {tabs.map(({ path, icon: Icon, label }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => handleNavigation(path)}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      location.pathname === path
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {label}
                  </Link>
                ))}
              </nav>
               

  

              {/* <button
                onClick={toggleTheme}
                className="flex items-center w-full mt-4 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5 mr-3" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-3" />
                    Dark Mode
                  </>
                )}
              </button> */}
            </div>
          </div>
        )}

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4 md:p-8 text-gray-800 dark:text-gray-100 transition-colors duration-200">
        {children}
         
      </main>
    </div>
  );
};

export default TabLayout;
