import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  fetchPendingEmployers, 
  approveEmployer, 
  rejectEmployer, 
  fetchRecentJobs 
} from '../services/api';

function AdminDashboard() {
  const [pendingEmployers, setPendingEmployers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // id of employer being processed

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [employers, jobs] = await Promise.all([
          fetchPendingEmployers(),
          fetchRecentJobs()
        ]);
        
        setPendingEmployers(employers);
        setRecentJobs(jobs);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await approveEmployer(id);
      setPendingEmployers(prev => prev.filter(emp => emp.id !== id));
    } catch (err) {
      alert('Failed to approve employer');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this employer?')) return;
    
    setActionLoading(id);
    try {
      await rejectEmployer(id);
      setPendingEmployers(prev => prev.filter(emp => emp.id !== id));
    } catch (err) {
      alert('Failed to reject employer');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading Admin Dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto mt-4">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Admin Control Panel</h1>
          <p className="text-lg text-gray-600">Manage users, verify employers, and monitor system health.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Employers</p>
          <p className="text-4xl font-extrabold text-blue-600">1,240</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Verified Employers</p>
          <p className="text-4xl font-extrabold text-blue-600">85</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-200 bg-yellow-50">
          <p className="text-sm font-bold text-yellow-700 uppercase tracking-wider mb-1">Pending Approvals</p>
          <p className="text-4xl font-extrabold text-yellow-600">{pendingEmployers.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pending Employers */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Pending Employer Verifications</h2>
          
          {pendingEmployers.length === 0 ? (
            <p className="text-gray-500 italic py-8 text-center">No pending verifications. You are all caught up!</p>
          ) : (
            <div className="space-y-4">
              {pendingEmployers.map((emp) => (
                <div key={emp.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900">{emp.name}</p>
                    <p className="text-sm text-gray-500">{emp.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(emp.id)}
                      disabled={actionLoading === emp.id}
                      className="bg-green-100 text-green-700 font-bold px-5 py-2 rounded-lg hover:bg-green-200 transition disabled:opacity-60"
                    >
                      {actionLoading === emp.id ? 'Processing...' : 'Approve'}
                    </button>
                    <button 
                      onClick={() => handleReject(emp.id)}
                      disabled={actionLoading === emp.id}
                      className="bg-red-100 text-red-700 font-bold px-5 py-2 rounded-lg hover:bg-red-200 transition disabled:opacity-60"
                    >
                      {actionLoading === emp.id ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Recent Job Postings</h2>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="font-bold text-gray-900 text-sm">{job.title}</p>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-blue-600 font-semibold">{job.company}</p>
                  <p className="text-xs text-gray-400">{job.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Link to="/jobs" className="block text-center w-full mt-6 text-sm font-bold text-blue-600 hover:underline">
            View All Jobs →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;