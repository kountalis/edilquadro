/**
 * Blog articles data
 * Each article has a slug, translationKey for i18n, and metadata
 */

export const BLOG_ARTICLES = [
  {
    id: 1,
    slug: 'quanto-costa-ristrutturare-casa-roma',
    translationKey: 'blog_art1',
    category: 'guida',
    date: '2025-07-22',
    readTime: 8,
    image: '/projects/ristrutturazione-casa-roma-01.webp'
  },
  {
    id: 2,
    slug: 'ristrutturazione-bagno-roma-guida-completa',
    translationKey: 'blog_art2',
    category: 'guida',
    date: '2025-07-22',
    readTime: 6,
    image: '/projects/casa-aurelio-roma-05.webp'
  },
  {
    id: 3,
    slug: 'bonus-ristrutturazione-2025-come-funziona',
    translationKey: 'blog_art3',
    category: 'normativa',
    date: '2025-07-22',
    readTime: 7,
    image: '/projects/complesso-residenziale-pomezia-01.webp'
  },
  {
    id: 4,
    slug: 'ristrutturazione-appartamento-roma-guida-completa',
    translationKey: 'blog_art4',
    category: 'guida',
    date: '2026-03-10',
    readTime: 9,
    image: '/projects/ristrutturazione-casa-roma-03.webp'
  },
  {
    id: 5,
    slug: 'cappotto-termico-condominio-roma-costi-vantaggi',
    translationKey: 'blog_art5',
    category: 'guida',
    date: '2026-03-10',
    readTime: 7,
    image: '/projects/cappotto-termico-edificio-roma.webp'
  }
];

export const getArticleBySlug = (slug) => {
  return BLOG_ARTICLES.find(a => a.slug === slug) || null;
};

export const getAllArticleSlugs = () => {
  return BLOG_ARTICLES.map(a => a.slug);
};
