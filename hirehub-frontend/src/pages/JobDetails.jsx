import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchJobById, applyToJob } from '../services/api';
import { useAuth } from '../context/AuthContext';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchJobById(id);

        console.log("JOB DETAILS:", data);

        setJob(data);

      } catch (err) {
        console.error(err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    getJobDetails();
  }, [id]);

  const handleApply = async () => {

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setApplyLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      await applyToJob(user.id, job.id);

      setApplied(true);
      alert("Applied successfully!");

    } catch (err) {
      console.error(err);
      alert("Apply failed");
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center text-red-600 mt-20">
        {error || "Job not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto mt-4">

      <Link to="/jobs" className="text-blue-600 mb-6 inline-block">
        ← Back
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border">

        {/* HEADER */}
        <div className="p-8 bg-blue-50 border-b">

          <h1 className="text-3xl font-bold">
            {job.title}
          </h1>

          <p className="text-blue-600 font-bold">
            {job.companyName}
          </p>

        </div>

        {/* BODY */}
        <div className="p-8">

          <p className="mb-6 text-gray-600">
            {job.description}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">

  <div>
    <p className="font-bold text-gray-700">Location</p>
    <p>{job.location}</p>
  </div>

  <div>
    <p className="font-bold text-gray-700">Salary</p>
    <p>{job.salary}</p>
  </div>

  <div>
    <p className="font-bold text-gray-700">Experience</p>
    <p>{job.experienceLevel}</p>
  </div>

  <div>
    <p className="font-bold text-gray-700">Job Type</p>
    <p>{job.jobType}</p>
  </div>

</div>

          {/* APPLY */}
          {applied ? (
            <div className="bg-green-50 p-6 rounded-xl text-green-700 text-center">
              ✅ Applied Successfully
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={applyLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold"
            >
              {applyLoading ? "Applying..." : "Apply for this Job"}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default JobDetails;