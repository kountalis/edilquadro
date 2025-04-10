import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaHome, FaStore, FaBuilding, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const services = [
    {
      icon: <FaHome className="w-8 h-8" />,
      title: "Ristrutturazione Casa",
      description: "Trasformiamo il tuo spazio abitativo con ristrutturazioni complete, dal bagno alla cucina, con un design personalizzato.",
      link: "/servizi/casa"
    },
    {
      icon: <FaStore className="w-8 h-8" />,
      title: "Commerciale",
      description: "Progettiamo e ristrutturiamo spazi commerciali per negozi, uffici e ristoranti con soluzioni funzionali ed estetiche.",
      link: "/servizi/commerciale"
    },
    {
      icon: <FaBuilding className="w-8 h-8" />,
      title: "Edifici",
      description: "Ristrutturiamo facciate, tetti e parti comuni di condomini con un'attenzione particolare all'efficienza energetica.",
      link: "/servizi/edifici"
    }
  ];

  const featuredProjects = [
    {
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      title: "Appartamento Moderno",
      category: "Residenziale"
    },
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      title: "Ufficio Open Space",
      category: "Commerciale"
    },
    {
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
      title: "Villa sul Lago",
      category: "Residenziale"
    },
    {
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      title: "Cucina Contemporanea",
      category: "Residenziale"
    }
  ];

  const testimonials = [
    {
      text: "La ristrutturazione del nostro appartamento è stata eseguita perfettamente. Professionalità e puntualità impeccabili. Siamo molto soddisfatti del risultato finale.",
      author: "Marco Rossi",
      role: "Proprietario Appartamento"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Trasformiamo i tuoi spazi in capolavori
              </h1>
              <p className="text-xl md:text-2xl mb-12">
                Ristrutturazioni di qualità per case, edifici e spazi commerciali in tutta Italia.
                La nostra esperienza al tuo servizio.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/portfolio"
                  className="bg-[#ff5733] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#ff4520] transition-colors flex items-center gap-2"
                >
                  Scopri i nostri progetti
                  <span className="text-2xl">→</span>
                </Link>
                <Link
                  to="/contatti"
                  className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors flex items-center gap-2"
                >
                  <FaEnvelope className="w-5 h-5" />
                  Preventivo Gratuito
                </Link>
                <a
                  href="https://wa.me/+39123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#128C7E] transition-colors flex items-center gap-2"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden group"
              >
                <div className="text-[#ff5733] mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-[#ff5733] font-semibold group-hover:text-[#ff4520]"
                >
                  Scopri di più <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Progetti in Evidenza</h2>
            <p className="text-xl text-gray-600">
              Esplora alcuni dei nostri progetti più recenti e scopri come abbiamo trasformato spazi comuni
              in ambienti straordinari.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white font-semibold text-xl">{project.title}</h3>
                    <p className="text-gray-300">{project.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-[#ff5733] font-semibold hover:text-[#ff4520]"
            >
              Vedi tutti i progetti <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Cosa Dicono i Nostri Clienti</h2>
            <p className="text-xl text-gray-300">
              La soddisfazione dei nostri clienti è la nostra migliore pubblicità. 
              Ecco cosa dicono di noi e del nostro lavoro.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 p-8 rounded-lg"
              >
                <div className="text-[#ff5733] text-6xl mb-6">"</div>
                <p className="text-xl italic mb-6">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;