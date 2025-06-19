import React, { useEffect, useState } from 'react';

import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

function Register() {
  const { registerUser, message } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleEye = () => {
    setShowPassword((prev) => !prev);
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      address: '',
      password: '',
      confirmPassword: '',
    });
    setNameError("");
    setEmailError("");
    setPasswordError("")
    setPasswordError("");
    setConfirmPasswordError("");
    setFormSubmitted(false);
  }

  const validateName = (value) => {
    if (!value) {
      setNameError('Name is required.');
      return false;
    }
    setNameError("");
    return true;
  }

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

  const validateAddress = (value) => {
    if (!value) {
      setAddressError('Address is required');
      return false;
    }
    setAddressError("")
    return true
  }

  const validatePassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!value) {
      setPasswordError("Password is required.");
      return false;
    }

    if(!regex.test(value)) {
      setPasswordError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "name") {
        validateName(value);
      } else if (name === "email") {
        validateEmail(value);
      } else if (name === "address") {
        validateAddress(value);
      } else if (name === "password") {
        validatePassword(value);
        if (updatedData.confirmPassword) {
          validateConfirmPassword(value, updatedData.confirmPassword);
        }
      } else if (name === "confirmPassword") {
        validateConfirmPassword(updatedData.password, value);
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);
    const isAddressValid = validateAddress(formData.address);
    const isPasswordValid = validatePassword(formData.password);
    const isConfirmPasswordValid = validateConfirmPassword(formData.password, formData.confirmPassword);

    if(isNameValid && isEmailValid && isAddressValid && isPasswordValid && isConfirmPasswordValid) {
      await registerUser(formData.name, formData.email, formData.address, formData.password);
    }
  };


  return (
    <>
      <div className="flex items-center justify-center bg-gray-100">
        <div className='bg-white mt-8 mb-8 p-8 rounded-2xl shadow-md w-full max-w-lg space-y-4'>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-700">
                Create account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                SignUp to continue explore our services.
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

          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-2'>
              <label htmlFor="name" className='text-gray-700 font-semibold'>Name</label>
              <input
                id='name'
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => validateName(formData.name)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                // required
              />
              {nameError && (
                <div className="text-red-500 text-sm">{nameError}</div>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="email" className='text-gray-700 font-semibold'>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => validateEmail(formData.email)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                // required
              />
              {emailError && (
                <div className="text-red-500 text-sm">{emailError}</div>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="address" className='text-gray-700 font-semibold'>Address</label>
              <input
                id='address'
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                onBlur={() => validateAddress(formData.address)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {addressError && (
                <div className="text-red-500 text-sm">{addressError}</div>
              )}
            </div>

            <div className='flex flex-col gap-2 relative'>
              <label htmlFor="password" className='text-gray-700 font-semibold'>Password</label>
              <input
                id='password'
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => validatePassword(formData.password)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
              />
              <button
                type="button"
                onClick={handleToggleEye}
                className="absolute right-3 top-[3.3rem] transform -translate-y-1/2 text-gray-500 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEye size={22} /> : <FiEyeOff size={22} />}
              </button>
              {!passwordError && (
                <div className="text-red-500 text-sm">{passwordError}</div>
              )}
            </div>

            <div className='flex flex-col gap-2 relative'>
              <label htmlFor="confirmPassword" className='text-gray-700 font-semibold'>Confirm Password</label>
              <input
                id='confirmPassword'
                type={showPassword ? "text" : "password" }
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => validateConfirmPassword(formData.password, formData.confirmPassword)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={handleToggleEye}
                className="absolute right-3 top-[3.3rem] transform -translate-y-1/2 text-gray-500 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEye size={22} /> : <FiEyeOff size={22} />}
              </button>
              {confirmPasswordError && (
                <div className="text-red-500 text-sm">{confirmPasswordError}</div>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Register
            </button>
            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline font-medium">
                Login Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
