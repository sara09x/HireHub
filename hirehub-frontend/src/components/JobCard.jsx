import { Link } from 'react-router-dom';
function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
            <p className="text-blue-600 font-medium">{job.company}</p>
          </div>
          {/* Badge for Experience Level */}
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
            {job.experience || 'Entry Level'}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {job.location || 'Remote / Cairo'}
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {job.salary || 'Confidential'}
        </div>
      </div>

      <Link 
     to={`/jobs/${job.id}`} 
     className="mt-6 block text-center w-full bg-gray-50 text-blue-600 font-semibold py-2 rounded-lg border border-blue-100 hover:bg-blue-600 hover:text-white transition-colors duration-300"
   >
     View Details
   </Link>
    </div>
  );
}

export default JobCard;