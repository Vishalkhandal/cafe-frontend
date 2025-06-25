import { Link, NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
    const { isAuthenticated, user, logoutUser } = useAuth();

    return (
        <nav className="flex items-center justify-between bg-gray-700 px-6 py-4 mb-6 shadow">
            <div className="text-white text-2xl font-bold">
                <Link to="/">Cafe App</Link>
            </div>

            {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                    <NavLink
                        to=""
                        className="flex items-center gap-2 text-white px-4 py-2 hover:bg-gray-600 rounded transition"
                    >
                        <FaUserCircle className="text-xl" />
                        <span className="font-semibold">{user?.name}</span>
                    </NavLink>
                    <NavLink
                        to="/products"
                        className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold transition"
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold transition"
                    >
                        Dashboard
                    </NavLink>

                    <button
                        onClick={logoutUser}
                        className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold transition"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="space-x-4">
                    <NavLink
                        to="/login"
                        className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold transition"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold transition"
                    >
                        Register
                    </NavLink>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
