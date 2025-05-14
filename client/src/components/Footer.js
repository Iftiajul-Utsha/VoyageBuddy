import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                <path d="M12 9h-1v1h-1v1h-1v1H8v2h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v-2h-1v-1h-1v-1h-1V9z" />
              </svg>
              VoyageBuddy
            </h3>
            <p className="text-gray-400 mb-4">
              Discover the beauty of Bangladesh with our expertly crafted travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FiTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/plan-trip" className="text-gray-400 hover:text-white">Plan a Trip</Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-white">Reviews</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Cox's Bazar</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Sundarbans</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Sylhet</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Bandarban</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Saint Martin</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-purple-400" />
                <span>123 Travel Street, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-purple-400" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-purple-400" />
                <span>info@voyagebuddy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} VoyageBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 