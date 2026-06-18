import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchJobs } from '../services/api';

function Home() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedJobs = async () => {
      try {
        const allJobs = await fetchJobs();
        // Show only 3 featured jobs on homepage
        setFeaturedJobs(allJobs.slice(0, 3));
      } catch (error) {
        console.error("Failed to load featured jobs");
        setFeaturedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <div className="bg-blue-50 py-24 px-6 border-b border-blue-100">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Break the <span className="text-blue-600">Experience Paradox.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            HireHub connects fresh graduates with employers who value potential, skills, 
            and ambition over years of experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/jobs" 
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg text-lg"
            >
              Find Your First Job
            </Link>
            <Link 
              to="/register" 
              className="bg-white text-blue-600 font-bold py-4 px-10 rounded-xl border border-blue-200 hover:bg-blue-50 transition duration-300 shadow-sm text-lg"
            >
              Post a Job (For Employers)
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why HireHub?</h2>
          <p className="text-gray-500 mt-3">Built for students, designed for the future.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🎓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">For Fresh Graduates</h3>
            <p className="text-gray-600 leading-relaxed">
              Showcase your GPA, projects, and skills instead of being rejected for "lack of experience".
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">💼</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">For Employers</h3>
            <p className="text-gray-600 leading-relaxed">
              Access motivated, verified junior talent ready to grow with your company.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Matching</h3>
            <p className="text-gray-600 leading-relaxed">
              We focus only on entry-level, internship, and junior roles.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Opportunities</h2>
              <p className="text-gray-600 mt-2">Start your journey with these roles</p>
            </div>
            <Link to="/jobs" className="text-blue-600 font-semibold hover:underline flex items-center gap-2">
              View All Jobs →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading featured jobs...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <Link 
                  to={`/jobs/${job.id}`} 
                  key={job.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition group"
                >
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition">{job.title}</h3>
                  <p className="text-blue-600 font-semibold mt-1">{job.company}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">{job.location}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">{job.type}</span>
                  </div>

                  <p className="text-gray-600 text-sm mt-4 line-clamp-2">{job.description}</p>
                  
                  <div className="mt-6 text-blue-600 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition">
                    View Details →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;