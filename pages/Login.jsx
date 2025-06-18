import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { loginUser, message } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const reset = () => {
    setEmail("")
    setPassword("")
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted");
    loginUser(email, password);
    reset();
  };


  return (
    <div>

      <div className="flex items-center justify-center h-[500px] bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
        >
          {message && (
            <div className="text-red-500 text-sm text-center">{message.msg}</div>
          )}
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
