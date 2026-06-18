import { useState } from 'react';

import { Link, useNavigate }
from 'react-router-dom';

import { register }
from '../services/api';

/**
 * Register page component.
 */
function Register() {

  const navigate = useNavigate();

  /**
   * Form state.
   */
  const [formData, setFormData] =
    useState({

      // MUST match backend DTO field
      fullname: '',

      email: '',

      phoneNumber: '',

      password: '',

      role: 'USER'
    });

  /**
   * Loading state.
   */
  const [loading, setLoading] =
    useState(false);

  /**
   * Error state.
   */
  const [error, setError] =
    useState('');

  /**
   * Handle input changes.
   */
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle role selection.
   */
  const handleRoleChange = (role) => {

    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  /**
   * Handle form submission.
   */
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError('');

    try {

      const response =
        await register(formData);

      console.log(
        'Registration success:',
        response
      );

      alert(
        'Account created successfully!'
      );

      // Redirect to login page
      navigate('/login');

    } catch (err) {

      console.error(
        'Registration error:',
        err
      );

      setError(

        err.response?.data?.message ||

        'Registration failed. Please try again.'
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
        flex
        items-center
        justify-center
        min-h-[85vh]
        px-4
        py-8
      "
    >

      <div
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          w-full
          max-w-lg
          border
          border-gray-100
        "
      >

        {/* HEADER */}
        <div className="text-center mb-8">

          <h2
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >
            Create an Account
          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Start your career journey
            with HireHub.
          </p>

        </div>

        {/* ERROR MESSAGE */}
        {error && (

          <div
            className="
              bg-red-50
              text-red-600
              p-4
              rounded-xl
              mb-6
              text-sm
            "
          >

            {error}

          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* ROLE */}
          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              "
            >
              I am a...
            </label>

            <div className="grid grid-cols-2 gap-4">

              {/* USER */}
              <label
                className={`
                  border
                  rounded-lg
                  p-3
                  text-center
                  cursor-pointer
                  transition
                  ${
                    formData.role === 'USER'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-600'
                  }
                `}
                onClick={() =>
                  handleRoleChange('USER')
                }
              >

                <input
                  type="radio"
                  name="role"
                  value="USER"
                  className="hidden"
                  checked={
                    formData.role === 'USER'
                  }
                  onChange={() =>
                    handleRoleChange('USER')
                  }
                />

                <span
                  className="
                    font-semibold
                    text-gray-700
                  "
                >
                  Job Seeker
                </span>

              </label>

              {/* EMPLOYER */}
              <label
                className={`
                  border
                  rounded-lg
                  p-3
                  text-center
                  cursor-pointer
                  transition
                  ${
                    formData.role === 'EMPLOYER'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-600'
                  }
                `}
                onClick={() =>
                  handleRoleChange('EMPLOYER')
                }
              >

                <input
                  type="radio"
                  name="role"
                  value="EMPLOYER"
                  className="hidden"
                  checked={
                    formData.role === 'EMPLOYER'
                  }
                  onChange={() =>
                    handleRoleChange('EMPLOYER')
                  }
                />

                <span
                  className="
                    font-semibold
                    text-gray-700
                  "
                >
                  Employer
                </span>

              </label>

            </div>
          </div>

          {/* FULL NAME */}
          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-1
              "
            >
              Full Name
            </label>

            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="
                w-full
                px-4
                py-3
                rounded-lg
                border
                border-gray-300
                focus:ring-2
                focus:ring-blue-600
                outline-none
              "
              placeholder="Ahmed Mohamed"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-1
              "
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full
                px-4
                py-3
                rounded-lg
                border
                border-gray-300
                focus:ring-2
                focus:ring-blue-600
                outline-none
              "
              placeholder="you@example.com"
            />

          </div>

          {/* PHONE */}
          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-1
              "
            >
              Phone Number
            </label>

            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="
                w-full
                px-4
                py-3
                rounded-lg
                border
                border-gray-300
                focus:ring-2
                focus:ring-blue-600
                outline-none
              "
              placeholder="01012345678"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-1
              "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
                w-full
                px-4
                py-3
                rounded-lg
                border
                border-gray-300
                focus:ring-2
                focus:ring-blue-600
                outline-none
              "
              placeholder="••••••••"
            />

          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              text-white
              font-bold
              py-3.5
              rounded-xl
              hover:bg-blue-700
              transition
            "
          >

            {
              loading
                ? 'Creating Account...'
                : 'Create Account'
            }

          </button>

        </form>

        {/* FOOTER */}
        <div className="text-center mt-6">

          <p
            className="
              text-gray-600
              text-sm
            "
          >

            Already have an account?{' '}

            <Link
              to="/login"
              className="
                text-blue-600
                font-semibold
                hover:underline
              "
            >
              Log in here
            </Link>

          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;