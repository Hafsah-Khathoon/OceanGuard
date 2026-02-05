
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';
import { NAV_LINKS } from '../constants';
import { LogOut, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const links = user.role === UserRole.ADMIN ? NAV_LINKS.ADMIN : 
                user.role === UserRole.VOLUNTEER ? NAV_LINKS.VOLUNTEER : 
                NAV_LINKS.CITIZEN;

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
              OG
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight hidden md:block">OceanGuard</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium text-sm ${
                  location.pathname === link.path 
                    ? 'bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-sm font-semibold text-slate-800 dark:text-white">{user.name}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{user.role}</span>
          </div>
          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300">
            <UserIcon size={20} />
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
