import React from 'react'
import { Link, NavLink } from 'react-router'

function Navbar() {
    return (
        <>
            {/* Header Navbar */}
            <nav className="flex items-center justify-between bg-gray-700 px-6 py-4 mb-6 shadow">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">Cafe App</Link>
                </div>
                <div className="space-x-4">
                    <NavLink to="/login" className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold transition cursor-pointer">
                        Login
                    </NavLink>
                    <NavLink to='/register' className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold transition cursor-pointer">
                        Register
                    </NavLink>
                </div>
            </nav>
        </>
    )
}

export default Navbar