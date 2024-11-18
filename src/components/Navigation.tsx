import React, { useState } from 'react';
import { Menu, X, Music2, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="bg-chrome-800 shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Music2 className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-100">SoundCraft</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/portfolio" className="text-gray-300 hover:text-indigo-400 transition-colors">
              Portfolio
            </Link>
            {user ? (
              <>
                <Link to="/submit" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Submit Project
                </Link>
                <Link to="/dashboard" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-300 hover:text-indigo-400 transition-colors">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-4 py-2 rounded-lg hover:bg-indigo-600/30 hover:shadow-neon transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-indigo-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-chrome-800 border-t border-chrome-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/portfolio"
              className="block px-3 py-2 text-gray-300 hover:text-indigo-400"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
            {user ? (
              <>
                <Link
                  to="/submit"
                  className="block px-3 py-2 text-gray-300 hover:text-indigo-400"
                  onClick={() => setIsOpen(false)}
                >
                  Submit Project
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-300 hover:text-indigo-400"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-gray-300 hover:text-indigo-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-indigo-400"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-3 py-2 text-gray-300 hover:text-indigo-400"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;