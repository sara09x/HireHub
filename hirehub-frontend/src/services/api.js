import axios from 'axios';

/**
 * Backend API base URL.
 * IMPORTANT:
 * Backend runs on port 8081
 * and uses /api prefix.
 */
const API_BASE_URL =
  'http://localhost:8081';

/**
 * Main Axios instance.
 */
const apiClient = axios.create({

  baseURL: API_BASE_URL
});


/**
 * =====================================================
 * AUTH TOKEN INTERCEPTOR
 * =====================================================
 *
 * Automatically attach JWT token
 * to protected requests.
 */
apiClient.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem('token');

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);


/**
 * =====================================================
 * AUTH APIs
 * =====================================================
 */

/**
 * Login user.
 */
export const login = async (
  credentials
) => {

  const res =
    await apiClient.post(

      '/users/login',

      {
        email: credentials.email,

        password:
          credentials.password
      }
    );

  /**
   * Backend should return:
   * {
   *   token,
   *   user
   * }
   */
  return res.data;
};


/**
 * Register new user.
 */
export const register = async (
  userData
) => {

  const res =
    await apiClient.post(

      '/users/register',

      {

        // MUST match backend DTO
        fullname:
          userData.fullname,

        email:
          userData.email,

        password:
          userData.password,

        phoneNumber:
          userData.phoneNumber,

        role:
          userData.role
      }
    );

  return res.data;
};


/**
 * =====================================================
 * JOB APIs
 * =====================================================
 */

/**
 * Fetch all jobs.
 */
export const fetchJobs =
  async () => {

    const res =
      await apiClient.get('/jobs');

    return res.data;
  };


/**
 * Fetch single job by ID.
 */
export const fetchJobById =
  async (id) => {

    const res =
      await apiClient.get(
        `/jobs/${id}`
      );

    return res.data;
  };


/**
 * Create new job.
 */
export const createJob =
  async (jobData) => {

    const res =
      await apiClient.post(
        '/jobs',
        jobData
      );

    return res.data;
  };


/**
 * =====================================================
 * APPLICATION APIs
 * =====================================================
 */

/**
 * Apply to a job.
 */
export const applyToJob =
  async (userId, jobId) => {

    const res =
      await apiClient.post(

        `/applications/apply?userId=${userId}&jobId=${jobId}`
      );

    return res.data;
  };


/**
 * Upload resume / CV.
 */
export const uploadResume =
  async (
    applicationId,
    formData
  ) => {

    const res =
      await apiClient.post(

        `/applications/upload-cv/${applicationId}`,

        formData,

        {
          headers: {
            'Content-Type':
              'multipart/form-data'
          }
        }
      );

    return res.data;
  };


/**
 * =====================================================
 * PROFILE APIs
 * =====================================================
 */

/**
 * Update user profile.
 */
export const updateProfile =
  async (profile) => {

    if (!profile.id) {

      throw new Error(
        'User ID missing'
      );
    }

    const res =
      await apiClient.put(

        `/users/${profile.id}`,

        profile
      );

    return res.data;
  };


/**
 * =====================================================
 * ADMIN APIs
 * =====================================================
 *
 * Currently mocked.
 * Replace with real backend later.
 */

/**
 * Fetch pending employers.
 */
export const fetchPendingEmployers =
  async () => {

    return [

      {
        id: 1,

        name: 'Test Company',

        email:
          'test@test.com',

        status: 'PENDING'
      }
    ];
  };


/**
 * Approve employer.
 */
export const approveEmployer =
  async () => {

    return {
      success: true
    };
  };


/**
 * Reject employer.
 */
export const rejectEmployer =
  async () => {

    return {
      success: true
    };
  };


/**
 * Fetch recent jobs.
 */
export const fetchRecentJobs =
  async () => {

    const res =
      await apiClient.get('/jobs');

    return res.data;
  };


/**
 * =====================================================
 * OTP APIs
 * =====================================================
 *
 * Currently mocked.
 */

/**
 * Verify OTP.
 */
export const verifyOtp =
  async () => {

    return {
      success: true
    };
  };


/**
 * Resend OTP.
 */
export const resendOtp =
  async () => {

    return {
      success: true
    };
  };


/**
 * Export Axios instance.
 */
export default apiClient;