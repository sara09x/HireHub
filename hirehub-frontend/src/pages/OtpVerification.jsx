import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp, resendOtp } from '../services/api';
import { useAuth } from '../context/AuthContext';

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // جايين من Register.jsx عبر navigate state
  const email = location.state?.email || user?.email || '';
  const role = location.state?.role || user?.role || 'user';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // لو مفيش email خالص، ارجعه للـ register
  useEffect(() => {
    if (!email) {
      navigate('/register', { replace: true });
    }
  }, [email, navigate]);

  // Timer for Resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.every(char => !isNaN(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, i) => { if (i < 6) newOtp[i] = char; });
      setOtp(newOtp);
      if (pastedData.length === 6) inputRefs.current[5]?.focus();
    }
  };

  // ✅ الـ redirect الصح حسب الـ role
  const redirectByRole = (userRole) => {
    if (userRole === 'employer') {
      navigate('/employer', { replace: true });
    } else if (userRole === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/profile', { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyOtp({ email, otp: otpCode });
      setSuccess('Account verified successfully! Redirecting...');
      setTimeout(() => redirectByRole(role), 1500);
    } catch (err) {
      setError('Invalid or expired code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setError('');
    setSuccess('');
    try {
      await resendOtp({ email });
      setResendTimer(60);
      setCanResend(false);
      setSuccess('New code has been sent to your email!');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100 text-center">

        {/* Icon & Header */}
        <div className="mb-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Verify Your Email</h2>
          <p className="text-gray-500 mt-2">
            We've sent a 6-digit code to<br />
            <span className="font-medium text-gray-700">{email}</span>
          </p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded-xl mb-4 text-sm">{success}</div>}

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-3xl font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>

        {/* Resend Code */}
        <div className="mt-8 text-sm">
          <p className="text-gray-600">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              disabled={!canResend}
              className="text-blue-600 font-semibold hover:underline disabled:text-gray-400"
            >
              {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
            </button>
          </p>
          <div className="mt-4">
            <Link to="/login" className="text-gray-400 hover:text-gray-600 underline transition">
              ← Back to Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default OtpVerification;