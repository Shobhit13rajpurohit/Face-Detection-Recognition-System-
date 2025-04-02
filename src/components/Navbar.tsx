import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  items: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  return (
    <nav className="w-64 h-screen bg-gray-800/50 backdrop-blur-sm p-4 border-r border-cyan-900/30 overflow-y-auto">
      <div className="mb-6 md:mb-8">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-25" />
          <h1 className="relative bg-gray-900 rounded-lg p-2 md:p-3 text-lg md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Face Detection<br className="md:hidden" /> & Recognition
          </h1>
        </div>
      </div>
      
      <div className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
              }`
            }
          >
            <div className="relative">
              {item.icon}
              <div className="absolute inset-0 bg-current opacity-20 blur-sm transition-opacity group-hover:opacity-40" />
            </div>
            <span>{item.label}</span>
            <ChevronRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-900/30">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-400">System Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;