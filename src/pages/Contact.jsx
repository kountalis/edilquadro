import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Contattaci
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Siamo qui per rispondere a tutte le tue domande.
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;