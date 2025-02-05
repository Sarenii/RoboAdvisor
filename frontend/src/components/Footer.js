import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-green-dark text-white py-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Branding/Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-2">RoboAdvisor</h2>
          <p className="text-sm text-gray-200">
            Empowering investors with automated, data-driven financial strategies.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:underline">Portfolio</Link>
            </li>
            <li>
              <Link to="/admin" className="hover:underline">Admin Panel</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <p className="text-sm text-gray-200">
            123 Finance Avenue<br />
            Money City, 12345<br />
            <strong>Email:</strong> support@roboadvisor.io<br />
            <strong>Phone:</strong> (123) 456-7890
          </p>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#!"
                className="hover:text-shade-4"
                aria-label="Visit our Facebook"
              >
                {/* Example Facebook Icon */}
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.197 21V12.883H7.101V9.944h2.096V7.951c0-2.028 1.192-3.139 3.021-3.139.876 0 1.796.157 1.796.157v1.967h-1.011c-.996 0-1.305.621-1.305 1.258v1.75h2.218l-.355 2.939h-1.863V21" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="hover:text-shade-4"
                aria-label="Visit our Twitter"
              >
                {/* Example Twitter Icon */}
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.39-1.83.654-2.828.774 1.014-.608 1.794-1.57 2.163-2.724-.951.56-2.005.967-3.127 1.184C19.026 2.996 17.845 2 16.507 2c-2.557 0-4.623 2.066-4.623 4.623 0 .362.04.71.12 1.045C7.694 7.442 4.067 5.077 1.64 1.958c-.399.685-.627 1.48-.627 2.327 0 1.61.82 3.03 2.066 3.868-.762-.024-1.48-.234-2.106-.58v.058c0 2.25 1.6 4.127 3.72 4.556-.39.105-.8.161-1.223.161-.298 0-.588-.029-.87-.082.588 1.836 2.294 3.174 4.315 3.21-1.58 1.238-3.57 1.978-5.73 1.978-.372 0-.74-.022-1.105-.065 2.04 1.306 4.46 2.067 7.066 2.067 8.48 0 13.118-7.02 13.118-13.118 0-.2-.004-.396-.013-.59.902-.65 1.68-1.46 2.3-2.388z" />
                </svg>
              </a>
            </li>
            {/* Add more social icons if needed */}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-6 pt-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} RoboAdvisor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
