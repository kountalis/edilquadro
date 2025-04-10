import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('Tutti');

  const projects = [
    {
      title: "Casa di Campagna Umbria",
      location: "Umbria",
      description: "Restauro di una casa di campagna in Umbria con materiali tradizionali.",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
      category: "Casa"
    },
    {
      title: "Ufficio Open Space Milano",
      location: "Milano",
      description: "Ristrutturazione di un ufficio moderno con spazi aperti e luminosi.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      category: "Commerciale"
    },
    {
      title: "Villa sul Lago",
      location: "Como",
      description: "Ristrutturazione completa di una villa storica sul lago di Como.",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      category: "Casa"
    },
    {
      title: "Ristorante Centro Storico",
      location: "Roma",
      description: "Trasformazione di un locale storico in un ristorante moderno.",
      image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
      category: "Commerciale"
    },
    {
      title: "Condominio Centrale",
      location: "Torino",
      description: "Riqualificazione energetica e restauro della facciata.",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      category: "Edifici"
    },
    {
      title: "Appartamento Design",
      location: "Milano",
      description: "Ristrutturazione moderna con soluzioni di design innovative.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3",
      category: "Casa"
    },
    {
      title: "Negozio di Moda",
      location: "Firenze",
      description: "Concept store con design minimalista e spazi versatili.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      category: "Commerciale"
    },
    {
      title: "Palazzo Storico",
      location: "Venezia",
      description: "Restauro conservativo di un palazzo del XVI secolo.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      category: "Edifici"
    },
    {
      title: "Loft Industriale",
      location: "Bologna",
      description: "Conversione di uno spazio industriale in abitazione moderna.",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
      category: "Casa"
    },
    {
      title: "Hotel Boutique",
      location: "Firenze",
      description: "Trasformazione di un edificio storico in hotel di lusso.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      category: "Commerciale"
    }
  ];

  const filters = ['Tutti', 'Casa', 'Commerciale', 'Edifici'];

  const filteredProjects = activeFilter === 'Tutti' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            I Nostri Progetti
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Esplora la nostra collezione di progetti di ristrutturazione completati. Ogni progetto rappresenta la nostra
            passione per la qualità e l'attenzione ai dettagli.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-lg transition-colors ${
                activeFilter === filter
                  ? 'bg-[#ff5733] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[#ff5733] text-white px-3 py-1 rounded-full text-sm">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-500 mb-2">{project.location}</p>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <section className="bg-black text-white py-20 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Hai un progetto in mente?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contattaci oggi per discutere del tuo progetto di ristrutturazione e scoprire come possiamo
            trasformare i tuoi spazi.
          </p>
          <Link
            to="/contatti"
            className="inline-block bg-[#ff5733] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#ff4520] transition-colors"
          >
            Richiedi un Preventivo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;