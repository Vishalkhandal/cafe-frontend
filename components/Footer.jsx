import React from 'react';
import { Link } from 'react-router';

function Footer() {
    return (
        <footer className="bg-gray-700 text-white py-4 px-6 mt-6 shadow-inner">
            <div className="flex justify-center items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Cafe App. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
