import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Plus, User, LogOut, Settings as SettingsIcon, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                TripSync
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">Home</Link>
              {isAuthenticated && (
                <>
                  <Link to="/trips" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">My Trips</Link>
                  <Link to="/explore" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">Explore</Link>
                  <Link to="/budget" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">Budget</Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {isAuthenticated ? (
              <>
                <Button variant="primary" size="sm" onClick={() => navigate('/trips/new')} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Create Trip
                </Button>
                <div className="relative">
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-all">
                    <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover" />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-gray-800">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700" onClick={() => setIsProfileOpen(false)}>
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700" onClick={() => setIsProfileOpen(false)}>
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link to="/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700" onClick={() => setIsProfileOpen(false)}>
                        <SettingsIcon className="w-4 h-4" /> Settings
                      </Link>
                      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-red-600 w-full text-left">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Login</Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Sign Up</Button>
              </>
            )}
          </div>

          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
              {isAuthenticated && (
                <>
                  <Link to="/trips" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>My Trips</Link>
                  <Link to="/explore" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Explore</Link>
                  <Link to="/budget" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Budget</Link>
                  <Link to="/dashboard" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <Link to="/profile" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  <button onClick={handleLogout} className="px-4 py-2 text-left text-red-600 hover:bg-gray-50 rounded-lg">Logout</button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link to="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};