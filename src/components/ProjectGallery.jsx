import React from 'react';
import { motion } from 'framer-motion';
import { useProject } from '../context/ProjectContext';
import LazyImage from './LazyImage';
import { ArrowRightIcon } from './icons';

const categoryLabels = {
  casa: 'Casa',
  commerciale: 'Commerciale',
  edifici: 'Edifici'
};

const getWebpSource = (image) => {
  if (!image) return null;
  return image.match(/\.(jpg|jpeg|png)$/i) ? image.replace(/\.(jpg|jpeg|png)$/i, '.webp') : null;
};

const ProjectGallery = ({ projects = [] }) => {
  const { openModal } = useProject();

  if (!projects.length) {
    return null;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {projects.map((project, index) => {
        const previewImage = project.images?.[0] ?? project.image;
        const projectTitle = project.title ?? 'Progetto Edilquadro';
        const categoryLabel = categoryLabels[project.category] ?? project.category ?? '';

        return (
          <motion.article
            key={project.id ?? index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-black shadow-[0_25px_55px_rgba(0,0,0,0.4)]"
          >
            <button
              type="button"
              onClick={() => openModal(project)}
              className="relative block w-full h-full"
              aria-label={`Apri la galleria del progetto ${projectTitle}`}
            >
              <div className="relative h-full min-h-[240px] overflow-hidden">
                {previewImage && (
                    <LazyImage
                    src={previewImage}
                    webpSrc={getWebpSource(previewImage)}
                    alt={projectTitle}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width="600"
                    height="360"
                    loading="lazy"
                    fetchpriority="low"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-left text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray-300">
                    <span>{categoryLabel}</span>
                    <span>{project.images?.length ?? 0} foto</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold leading-tight">
                      {projectTitle}
                    </h3>
                    {project.description && (
                      <p className="mt-2 text-sm text-gray-300 max-w-[22rem] leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
                    <span>Apri galleria</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          </motion.article>
        );
      })}
    </div>
  );
};

export default ProjectGallery;