import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, Home, Upload, FileBarChart, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Microscope className="w-8 h-8" />
            <span className="font-bold text-xl">CervicalScan AI</span>
          </div>
          
          <div className="flex space-x-6">
            <NavLink to="/" icon={<Home className="w-5 h-5" />} text="Home" />
            <NavLink to="/upload" icon={<Upload className="w-5 h-5" />} text="Analysis" />
            <NavLink to="/results" icon={<FileBarChart className="w-5 h-5" />} text="Results" />
            <NavLink to="/login" icon={<LogIn className="w-5 h-5" />} text="Login" />
            <NavLink to="/signup" icon={<UserPlus className="w-5 h-5" />} text="Sign Up" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 hover:text-indigo-200 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}