import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { fetchJobs } from '../services/api';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchJobs();
        console.log("JOBS FROM BACKEND:", data);

        setJobs(data);

      } catch (err) {
        console.error(err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    job.companyName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen p-8 max-w-7xl mx-auto mt-4 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto mt-4">

      <h1 className="text-4xl font-extrabold mb-6">
        Discover Opportunities
      </h1>

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search jobs..."
        className="border p-3 rounded-xl w-full mb-6"
      />

      <div className="mb-4 text-gray-600">
        {filteredJobs.length} opportunities found
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}

      </div>

    </div>
  );
}

export default JobBoard;