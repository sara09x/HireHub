import { useState, useEffect } from 'react';
import { createJob } from '../services/api';
import { useAuth } from '../context/AuthContext';

// ====================== MOCK APPLICATIONS DATA ======================
const mockApplications = [
  {
    id: 1,
    jobTitle: 'Frontend Developer',
    applicantName: 'Ahmed Hassan',
    email: 'ahmed.hassan@gmail.com',
    phone: '01012345678',
    experience: 'Junior',
    appliedAt: 'May 15, 2026',
    status: 'pending',
    resumeUrl: '#',
    coverLetter: 'I am very interested in this position and believe my skills in React and Tailwind make me a strong candidate.'
  },
  {
    id: 2,
    jobTitle: 'Frontend Developer',
    applicantName: 'Sara Mohamed',
    email: 'sara.m@outlook.com',
    phone: '01198765432',
    experience: 'Entry Level',
    appliedAt: 'May 14, 2026',
    status: 'pending',
    resumeUrl: '#',
    coverLetter: 'Passionate about building great user experiences. Looking forward to contributing to your team.'
  },
  {
    id: 3,
    jobTitle: 'UI Designer',
    applicantName: 'Omar Khaled',
    email: 'omar.k@gmail.com',
    phone: '01123456789',
    experience: 'Senior',
    appliedAt: 'May 13, 2026',
    status: 'accepted',
    resumeUrl: '#',
    coverLetter: 'With 5 years of design experience, I can bring a unique perspective to your product.'
  },
  {
    id: 4,
    jobTitle: 'UI Designer',
    applicantName: 'Nour Ali',
    email: 'nour.ali@yahoo.com',
    phone: '01567891234',
    experience: 'Junior',
    appliedAt: 'May 12, 2026',
    status: 'rejected',
    resumeUrl: '#',
    coverLetter: 'I have been designing mobile interfaces for 2 years and would love to join your creative team.'
  },
];

// ====================== STATUS BADGE ======================
function StatusBadge({ status }) {
  const styles = {
    pending:  'bg-yellow-100 text-yellow-700 border border-yellow-200',
    accepted: 'bg-green-100 text-green-700 border border-green-200',
    rejected: 'bg-red-100 text-red-700 border border-red-200',
  };
  const labels = { pending: 'Pending', accepted: 'Accepted', rejected: 'Rejected' };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

// ====================== APPLICATION CARD ======================
function ApplicationCard({ app, onAccept, onReject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      
      {/* Top Row */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{app.applicantName}</h3>
          <p className="text-sm text-gray-500">Applied for: <span className="font-medium text-blue-600">{app.jobTitle}</span></p>
          <p className="text-xs text-gray-400 mt-1">{app.appliedAt} · {app.experience}</p>
        </div>
        <StatusBadge status={app.status} />
      </div>

      {/* Contact */}
      <div className="flex gap-6 mt-4 text-sm text-gray-600">
        <span>📧 {app.email}</span>
        <span>📞 {app.phone}</span>
      </div>

      {/* Cover Letter Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-sm text-blue-600 hover:underline font-medium"
      >
        {expanded ? '▲ Hide Cover Letter' : '▼ View Cover Letter'}
      </button>

      {expanded && (
        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
          {app.coverLetter}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
        <a
          href={app.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          📄 View Resume
        </a>

        {app.status === 'pending' && (
          <>
            <button
              onClick={() => onAccept(app.id)}
              className="text-sm font-bold bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              ✓ Accept
            </button>
            <button
              onClick={() => onReject(app.id)}
              className="text-sm font-bold bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-lg hover:bg-red-100 transition"
            >
              ✕ Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ====================== MAIN COMPONENT ======================
function EmployerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState(mockApplications);
  const [filterStatus, setFilterStatus] = useState('all');

  // ---- Post Job State ----
  const [formData, setFormData] = useState({
    title: '', location: '', type: '', salary: '',
    experience: '', description: '', responsibilities: '', skills: ''
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [error, setError] = useState('');

  // ---- Stats ----
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  // ---- Filtered Applications ----
  const filteredApps = filterStatus === 'all'
    ? applications
    : applications.filter(a => a.status === filterStatus);

  // ---- Accept / Reject ----
  const handleAccept = (id) => {
    setApplications(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'accepted' } : a)
    );
  };

  const handleReject = (id) => {
    setApplications(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a)
    );
  };

  // ---- Post Job ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    setError('');
    setPublishSuccess(false);
    try {
      await createJob(formData);
      setPublishSuccess(true);
      setTimeout(() => {
        setFormData({
          title: '',
          location: '',
          salary: '',
          description: '',
          companyName: '',
          experienceLevel: '',
          jobType: 'FULL_TIME',
          status: 'OPEN'
        });
        setPublishSuccess(false);
      }, 2500);
    } catch (err) {
      setError('Failed to publish job. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-6xl mx-auto mt-4">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-1">Employer Dashboard</h1>
        <p className="text-gray-500">Welcome back, <span className="font-semibold text-gray-700">{user?.name}</span></p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Applications', value: stats.total, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Review', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Accepted', value: stats.accepted, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Rejected', value: stats.rejected, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 border border-gray-100`}>
            <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white border border-gray-200 rounded-2xl p-2 w-fit shadow-sm">
        {[
          { key: 'applications', label: '📋 Applications' },
          { key: 'post',         label: '➕ Post a Job' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${
              activeTab === tab.key
                ? 'bg-gray-900 text-white shadow'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ====================== APPLICATIONS TAB ====================== */}
      {activeTab === 'applications' && (
        <div>
          {/* Filter Bar */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {['all', 'pending', 'accepted', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition border ${
                  filterStatus === status
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                }`}
              >
                {status === 'all' ? `All (${stats.total})` :
                 status === 'pending' ? `Pending (${stats.pending})` :
                 status === 'accepted' ? `Accepted (${stats.accepted})` :
                 `Rejected (${stats.rejected})`}
              </button>
            ))}
          </div>

          {/* Applications List */}
          {filteredApps.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-lg font-medium">No applications found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApps.map(app => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ====================== POST JOB TAB ====================== */}
      {activeTab === 'post' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Post a New Job</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</div>
          )}

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title <span className="text-red-500">*</span></label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required
                  placeholder="e.g., Frontend Developer"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required
                  placeholder="e.g., Cairo, Egypt"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Type <span className="text-red-500">*</span></label>
                <select name="type" value={formData.type} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition bg-white">
                  <option value="" disabled>Select type...</option>
                  <option>Onsite</option>
                  <option>Hybrid</option>
                  <option>Remote</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleChange}
                  placeholder="e.g., 10,000 - 15,000 EGP"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select name="experience" value={formData.experience} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition bg-white">
                  <option value="" disabled>Select level...</option>
                  <option value="Student">Internship</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Description <span className="text-red-500">*</span></label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows="5"
                placeholder="Describe the role and requirements..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
              <textarea name="responsibilities" value={formData.responsibilities} onChange={handleChange} rows="4"
                placeholder="List the main responsibilities..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
              <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3"
                placeholder="React, JavaScript, Tailwind, Git..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button type="submit" disabled={isPublishing}
                className={`font-bold py-3.5 px-10 rounded-xl transition duration-300 shadow-md flex items-center gap-3 text-lg ${
                  publishSuccess ? 'bg-green-600 text-white' :
                  isPublishing  ? 'bg-gray-400 cursor-not-allowed text-white' :
                  'bg-gray-900 hover:bg-gray-800 text-white'
                }`}>
                {isPublishing && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />}
                {publishSuccess ? '✓ Job Published Successfully' :
                 isPublishing   ? 'Publishing...' : 'Publish Job Listing'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default EmployerDashboard;
