/**
 * Zone data for local SEO landing pages
 * Each zone represents a geographic area where Edilquadro operates
 */

export const ZONE_DATA = [
  {
    slug: 'tuscolana',
    translationKey: 'tuscolana',
    relatedProjects: ['centro-yoga-tuscolana', 'negozio-abbigliamento-tuscolana']
  },
  {
    slug: 'appio-tuscolano',
    translationKey: 'appio_tuscolano',
    relatedProjects: ['centro-yoga-tuscolana', 'negozio-abbigliamento-tuscolana']
  },
  {
    slug: 'san-giovanni',
    translationKey: 'san_giovanni',
    relatedProjects: ['ristorante-san-giovanni']
  },
  {
    slug: 'eur',
    translationKey: 'eur',
    relatedProjects: ['casa-moderna-eur', 'bar-eur']
  },
  {
    slug: 'aurelio',
    translationKey: 'aurelio',
    relatedProjects: ['casa-aurelio-roma', 'appartamento-aurelio']
  },
  {
    slug: 'alessandrino',
    translationKey: 'alessandrino',
    relatedProjects: ['attico-alessandrino-roma']
  },
  {
    slug: 'cinecitta',
    translationKey: 'cinecitta',
    relatedProjects: ['centro-yoga-tuscolana']
  },
  {
    slug: 'pomezia',
    translationKey: 'pomezia',
    relatedProjects: ['asilo-nido-pomezia', 'complesso-residenziale-pomezia']
  }
];

export const getZoneBySlug = (slug) => ZONE_DATA.find(z => z.slug === slug);
export const getAllZoneSlugs = () => ZONE_DATA.map(z => z.slug);
