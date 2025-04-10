import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Edilquadro</h3>
            <p className="text-gray-300">
              Esperti in ristrutturazioni di qualità dal 2024.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Collegamenti Rapidi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/servizi" className="text-gray-300 hover:text-white">
                  Servizi
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-white">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="text-gray-300 hover:text-white">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contattaci</h4>
            <p className="text-gray-300">
              Email: info@edilquadro.it<br />
              Tel: +39 123 456 7890<br />
              Indirizzo: Via Example 123, Roma
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Edilquadro. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;