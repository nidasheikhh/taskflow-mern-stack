import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full px-6 md:px-10 py-5 flex items-center justify-between bg-mist/80 backdrop-blur-sm sticky top-0 z-40 border-b border-flow-100">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="w-3 h-3 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
        <span className="font-display text-xl font-semibold text-ink tracking-tight">
          TaskFlow
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden sm:block text-sm text-flow-700 font-medium">
              Hi, {user.name.split(' ')[0]}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold px-4 py-2 rounded-full border border-flow-700 text-flow-700 hover:bg-flow-700 hover:text-white transition-colors"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-semibold text-flow-700 hover:text-ink transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold px-4 py-2 rounded-full bg-flow-700 text-white hover:bg-ink transition-colors"
            >
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
