import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  // Load projects data
  useEffect(() => {
    // This could be replaced with an API call in the future
    // For now, we'll use static data
    const projectsData = [
      {
        id: 1,
        title: "Villa Moderna",
        category: "casa",
        description: "Ristrutturazione completa di una villa moderna con particolare attenzione al design degli interni e all'efficienza energetica.",
        images: [
          "/projects/casa-moderna-bracciano-01.webp",
          "/projects/casa-moderna-bracciano-02.webp",
          "/projects/casa-moderna-bracciano-03.webp",
          "/projects/casa-moderna-bracciano-04.webp",
          "/projects/casa-moderna-bracciano-05.webp"
        ]
      },
      {
        id: 8,
        title: "Ristorante",
        category: "commerciale",
        description: "Progettazione e ristrutturazione di un ristorante con un design moderno e funzionale per ottimizzare lo spazio e migliorare l'esperienza dei clienti.",
        images: [
          "/projects/ristorante-san-giovanni-roma-01.webp",
          "/projects/ristorante-san-giovanni-roma-02.webp",
          "/projects/ristorante-san-giovanni-roma-03.webp",
          "/projects/ristorante-san-giovanni-roma-04.webp",
          "/projects/ristorante-san-giovanni-roma-05.webp"
        ]
      },
      {
        id: 5,
        title: "Negozio di Abbigliamento",
        category: "commerciale",
        description: "Restyling completo di un negozio di abbigliamento con un design elegante e moderno per valorizzare l'esposizione dei prodotti.",
        images: [
          "/projects/negozio-abbigliamento-tuscolana-01.webp",
          "/projects/negozio-abbigliamento-tuscolana-02.webp",
          "/projects/negozio-abbigliamento-tuscolana-03.webp",
          "/projects/negozio-abbigliamento-tuscolana-04.webp",
          "/projects/negozio-abbigliamento-tuscolana-05.webp",
          "/projects/negozio-abbigliamento-tuscolana-06.webp",
          "/projects/negozio-abbigliamento-tuscolana-07.webp",
          "/projects/negozio-abbigliamento-tuscolana-08.webp",
          "/projects/negozio-abbigliamento-tuscolana-09.webp"
        ]
      },
      {
        id: 10,
        title: "Complesso Residenziale",
        category: "edifici",
        description: "Ristrutturazione di un complesso residenziale con interventi su facciate, tetti e parti comuni per migliorare l'efficienza energetica e l'estetica dell'edificio.",
        images: [
          "/projects/complesso-residenziale-pomezia-01.webp",
          "/projects/complesso-residenziale-pomezia-02.webp",
          "/projects/complesso-residenziale-pomezia-03.webp",
          "/projects/complesso-residenziale-pomezia-04.webp",
          "/projects/complesso-residenziale-pomezia-05.webp"
        ]
      },
      {
        id: 11,
        title: "Appartamento Alessandrino",
        category: "casa",
        description: "Ristrutturazione completa di un appartamento nel quartiere Alessandrino con rifacimento di impianti, pavimenti e finiture.",
        images: [
          "/projects/attico-alessandrino-roma-01.webp",
          "/projects/attico-alessandrino-roma-02.webp",
          "/projects/attico-alessandrino-roma-03.webp",
          "/projects/attico-alessandrino-roma-04.webp",
          "/projects/attico-alessandrino-roma-05.webp",
          "/projects/attico-alessandrino-roma-06.webp",
          "/projects/attico-alessandrino-roma-07.webp",
          "/projects/attico-alessandrino-roma-08.webp",
          "/projects/attico-alessandrino-roma-09.webp"
        ]
      },
      {
        id: 12,
        title: "Centro Yoga Hatha",
        category: "commerciale",
        description: "Progettazione e realizzazione di un centro yoga con particolare attenzione all'atmosfera, all'illuminazione e ai materiali naturali.",
        images: [
          "/projects/centro-yoga-tuscolana-roma-01.webp",
          "/projects/centro-yoga-tuscolana-roma-02.webp",
          "/projects/centro-yoga-tuscolana-roma-03.webp",
          "/projects/centro-yoga-tuscolana-roma-04.webp",
          "/projects/centro-yoga-tuscolana-roma-05.webp",
          "/projects/centro-yoga-tuscolana-roma-06.webp",
          "/projects/centro-yoga-tuscolana-roma-07.webp",
          "/projects/centro-yoga-tuscolana-roma-08.webp",
          "/projects/centro-yoga-tuscolana-roma-09.webp",
          "/projects/centro-yoga-tuscolana-roma-10.webp"
        ]
      },
      {
        id: 13,
        title: "Casa Moderna",
        category: "casa",
        description: "Ristrutturazione completa di una casa residenziale con design moderno",
        images: [
          "/projects/casa-moderna-bracciano-01.webp",
          "/projects/casa-moderna-bracciano-02.webp",
          "/projects/casa-moderna-bracciano-03.webp",
          "/projects/casa-moderna-bracciano-04.webp",
          "/projects/casa-moderna-bracciano-05.webp"
        ]
      },
      {
        id: 14,
        title: "Ristorante",
        category: "commerciale",
        description: "Progettazione e ristrutturazione di un ristorante con un design moderno e funzionale per ottimizzare lo spazio e migliorare l'esperienza dei clienti.",
        images: [
          "/projects/ristorante-san-giovanni-roma-01.webp",
          "/projects/ristorante-san-giovanni-roma-02.webp",
          "/projects/ristorante-san-giovanni-roma-03.webp",
          "/projects/ristorante-san-giovanni-roma-04.webp",
          "/projects/ristorante-san-giovanni-roma-05.webp"
        ]
      },
      {
        id: 15,
        title: "Negozio di Abbigliamento",
        category: "commerciale",
        description: "Restyling completo di un negozio di abbigliamento con un design elegante e moderno per valorizzare l'esposizione dei prodotti.",
        images: [
          "/projects/negozio-abbigliamento-tuscolana-01.webp",
          "/projects/negozio-abbigliamento-tuscolana-02.webp",
          "/projects/negozio-abbigliamento-tuscolana-03.webp",
          "/projects/negozio-abbigliamento-tuscolana-04.webp",
          "/projects/negozio-abbigliamento-tuscolana-05.webp",
          "/projects/negozio-abbigliamento-tuscolana-06.webp",
          "/projects/negozio-abbigliamento-tuscolana-07.webp",
          "/projects/negozio-abbigliamento-tuscolana-08.webp",
          "/projects/negozio-abbigliamento-tuscolana-09.webp"
        ]
      },
      {
        id: 16,
        title: "Complesso Residenziale",
        category: "edifici",
        description: "Ristrutturazione di un complesso residenziale con interventi su facciate, tetti e parti comuni per migliorare l'efficienza energetica e l'estetica dell'edificio.",
        images: [
          "/projects/complesso-residenziale-pomezia-01.webp",
          "/projects/complesso-residenziale-pomezia-02.webp",
          "/projects/complesso-residenziale-pomezia-03.webp",
          "/projects/complesso-residenziale-pomezia-04.webp",
          "/projects/complesso-residenziale-pomezia-05.webp"
        ]
      }
    ];
    
    setProjects(projectsData);
  }, []);

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Wait for animation to complete before removing project data
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  }, []);

  // Filter projects by category
  const getProjectsByCategory = useCallback((category) => {
    if (!category || category === 'tutti') {
      return projects;
    }
    return projects.filter(project => project.category === category);
  }, [projects]);

  const value = {
    isModalOpen,
    selectedProject,
    openModal,
    closeModal,
    projects,
    getProjectsByCategory
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};










