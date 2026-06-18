import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './context/ProtectedRoute';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import JobBoard from './pages/JobBoard';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import OtpVerification from './pages/OtpVerification';
import JobSeekerProfile from './pages/JobSeekerProfile';
import AdminDashboard from './pages/AdminDashboard';
import EmployerDashboard from './pages/EmployerDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<OtpVerification />} />

          {/* ✅ Job Seeker فقط */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <JobSeekerProfile />
              </ProtectedRoute>
            }
          />

          {/* ✅ Admin فقط */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Employer فقط */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRoles={['EMPLOYER']}>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />

          {/* أي route تاني يرجع للـ home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;