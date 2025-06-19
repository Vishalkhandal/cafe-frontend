import { use, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

function Login() {
  const { loginUser, message } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleEye = () => {
    setShowPassword((prev) => !prev);
  }

  const resetForm = () => {
    setFormData({
      email: "",
      password: ""
    });
    setEmailError("");
    setPasswordError("");
    setFormSubmitted(false);
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('Email is required.');
      return false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setEmailError('Invalid email format.');
      return false;
    }
    setEmailError(""); 
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Always validate on change
    if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      validatePassword(value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    if (isEmailValid && isPasswordValid) {
      await loginUser(formData.email, formData.password);
      // Only reset form if login is successful
      // resetForm(); // Remove this line, or call it after successful login if needed
    }
  };

  return (
    <div>

      <div className="flex items-center justify-center h-[500px] bg-gray-100">
        <div className='bg-white mt-8 mb-8 p-8 rounded-2xl shadow-md w-full max-w-md space-y-4'>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-700">
                Welcome Back to Login
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to your account to continue
              </p>
            </div>
          </div>

          {message && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <div className="flex items-center gap-3 text-red-700">
                <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{message.msg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="email" className='text-gray-700 font-semibold'>Email Address</label>
              <input
                id='email'
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => validateEmail(formData.email)}
                // required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {emailError && (
                <div className="text-red-500 text-sm">{emailError}</div>
              )}
            </div>

            <div className='flex flex-col gap-2 relative'>
              <label htmlFor="password" className='text-gray-700 font-semibold'>Password</label>
              <input
                id='password'
                type={showPassword ? "text": "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => validatePassword(formData.password)}
                // required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type='button'
                onClick={handleToggleEye}
                className="absolute right-3 top-[3.3rem] transform -translate-y-1/2 text-gray-500 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password": "Show password"}  
              >
                {showPassword ? <FiEye size={22} /> : <FiEyeOff size={22} />}
              </button>
              {passwordError && (
                <div className="text-red-500 text-sm">{passwordError}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Login
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline font-medium">
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
