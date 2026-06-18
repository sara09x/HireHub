import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAuthenticated, isAdmin, isEmployer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🚀</span>
          <span className="text-2xl font-bold text-gray-900">HireHub</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          <Link to="/jobs" className="font-medium text-gray-700 hover:text-blue-600 transition">
            Find Jobs
          </Link>

          {isAuthenticated ? (
            <>
              {/* ✅ Employer فقط يشوف Post a Job */}
              {isEmployer && (
                <Link to="/employer" className="font-medium text-gray-700 hover:text-blue-600 transition">
                  Post a Job
                </Link>
              )}

              {/* ✅ Admin فقط يشوف Admin Panel */}
              {isAdmin && (
                <Link to="/admin" className="font-medium text-gray-700 hover:text-blue-600 transition">
                  Admin Panel
                </Link>
              )}

              {/* ✅ Job Seeker فقط يشوف My Profile */}
              {!isEmployer && !isAdmin && (
                <Link to="/profile" className="font-medium text-gray-700 hover:text-blue-600 transition">
                  My Profile
                </Link>
              )}

              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{user?.name}</p>
                  <p className="text-gray-500 text-xs capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium text-gray-700 hover:text-blue-600 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;