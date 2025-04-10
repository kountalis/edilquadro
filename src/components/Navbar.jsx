import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX, HiDownload } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { downloadWebpage } from '../utils/download';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Settori', path: '/servizi' },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-800">edilquadro</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contatti"
              className="bg-[#ff5733] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#ff4520] transition-colors flex items-center"
            >
              Preventivo Gratuito
            </Link>
            <a
              href="https://wa.me/+39123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#128C7E] transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <button
              onClick={downloadWebpage}
              className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
              title="Download webpage"
            >
              <HiDownload className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={downloadWebpage}
              className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
              title="Download webpage"
            >
              <HiDownload className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contatti"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#ff5733] hover:bg-[#ff4520]"
              onClick={() => setIsOpen(false)}
            >
              Preventivo Gratuito
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;