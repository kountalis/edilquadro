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
          "/projects/casaleucade1.webp",
          "/projects/casaleucade2.webp",
          "/projects/casaleucade3.webp",
          "/projects/casaleucade4.webp",
          "/projects/casaleucade5.webp"
        ]
      },
      {
        id: 8,
        title: "Ristorante",
        category: "commerciale",
        description: "Progettazione e ristrutturazione di un ristorante con un design moderno e funzionale per ottimizzare lo spazio e migliorare l'esperienza dei clienti.",
        images: [
          "/projects/Ristorante 1.webp",
          "/projects/Ristorante 2.webp",
          "/projects/Ristorante 3.webp",
          "/projects/Ristorante 4.webp",
          "/projects/Ristorante 5.webp"
        ]
      },
      {
        id: 5,
        title: "Negozio di Abbigliamento",
        category: "commerciale",
        description: "Restyling completo di un negozio di abbigliamento con un design elegante e moderno per valorizzare l'esposizione dei prodotti.",
        images: [
          "/projects/ABBIGLIAMENTO 1.webp",
          "/projects/ABBIGLIAMENTO 2.webp",
          "/projects/ABBIGLIAMENTO 3.webp",
          "/projects/ABBIGLIAMENTO 4.webp",
          "/projects/ABBIGLIAMENTO 5.webp",
          "/projects/ABBIGLIAMENTO 6.webp",
          "/projects/ABBIGLIAMENTO 7.webp",
          "/projects/ABBIGLIAMENTO 8.webp",
          "/projects/ABBIGLIAMENTO 9.webp"
        ]
      },
      {
        id: 10,
        title: "Complesso Residenziale",
        category: "edifici",
        description: "Ristrutturazione di un complesso residenziale con interventi su facciate, tetti e parti comuni per migliorare l'efficienza energetica e l'estetica dell'edificio.",
        images: [
          "/projects/pomezia1.webp",
          "/projects/pomezia2.webp",
          "/projects/pomezia3.webp",
          "/projects/pomezia4.webp",
          "/projects/pomezia5.webp"
        ]
      },
      {
        id: 11,
        title: "Appartamento Alessandrino",
        category: "casa",
        description: "Ristrutturazione completa di un appartamento nel quartiere Alessandrino con rifacimento di impianti, pavimenti e finiture.",
        images: [
          "/projects/alessandrino1.webp",
          "/projects/alessandrino2.webp",
          "/projects/alessandrino3.webp",
          "/projects/alessandrino4.webp",
          "/projects/alessandrino5.webp",
          "/projects/alessandrino6.webp",
          "/projects/alessandrino7.webp",
          "/projects/alessandrino8.webp",
          "/projects/alessandrino9.webp"
        ]
      },
      {
        id: 12,
        title: "Centro Yoga Hatha",
        category: "commerciale",
        description: "Progettazione e realizzazione di un centro yoga con particolare attenzione all'atmosfera, all'illuminazione e ai materiali naturali.",
        images: [
          "/projects/Yoga Hatha 1.webp",
          "/projects/Yoga Hatha 2.webp",
          "/projects/Yoga Hatha 3.webp",
          "/projects/Yoga Hatha 4.webp",
          "/projects/Yoga Hatha 5.webp",
          "/projects/Yoga Hatha 6.webp",
          "/projects/Yoga Hatha 7.webp",
          "/projects/Yoga Hatha 8.webp",
          "/projects/Yoga Hatha 9.webp",
          "/projects/Yoga Hatha 10.webp"
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