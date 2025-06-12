import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const reset = () => {
    setFormData({
      email: '',
      password: '',
    })
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted");

    loginUser();
  };

  const loginUser = async () => {
    const url = "http://127.0.0.1:3000/loginUser";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const data = await response.json();
      console.log(data, "response data");
      localStorage.setItem("token", data.token)

      reset();
      alert("User Login successfully!");
      navigate("/");
    } catch (error) {
      setError('Failed to Login user');
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
        >
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
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
  );
}

export default Login;
