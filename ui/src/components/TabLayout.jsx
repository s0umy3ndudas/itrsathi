import { NavLink } from 'react-router-dom';

const tabs = [
  { name: 'Notices', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Calendar', path: '/calendar' },
  { name: 'Settings', path: '/settings' },
];

export default function TabLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Tab Navigation */}
      <nav className="flex space-x-4 px-6 py-3 border-b shadow-sm bg-white sticky top-0 z-10">
        {tabs.map(tab => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-100 text-gray-700'
              }`
            }
            end
          >
            {tab.name}
          </NavLink>
        ))}
      </nav>

      {/* Tab Content */}
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
  );
}
