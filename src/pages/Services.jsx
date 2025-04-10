import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          I Nostri Servizi
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Offriamo una gamma completa di servizi di ristrutturazione per soddisfare ogni vostra esigenza.
        </p>
      </motion.div>
    </div>
  );
};

export default Services;