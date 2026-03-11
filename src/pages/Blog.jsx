import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BLOG_ARTICLES } from '../data/blogArticles';
import LazyImage from '../components/LazyImage';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const canonicalUrl = isEn
    ? 'https://edilquadro.it/en/blog/'
    : 'https://edilquadro.it/blog/';

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": isEn ? "https://edilquadro.it/en" : "https://edilquadro.it"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": canonicalUrl
      }
    ]
  };

  const categoryLabels = {
    guida: isEn ? 'Guide' : 'Guida',
    normativa: isEn ? 'Regulations' : 'Normativa',
    progetto: isEn ? 'Project' : 'Progetto',
  };

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('blog.meta_title')}</title>
        <meta name="description" content={t('blog.meta_description')} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href="https://edilquadro.it/blog/" />
        <link rel="alternate" hrefLang="en" href="https://edilquadro.it/en/blog/" />
        <link rel="alternate" hrefLang="x-default" href="https://edilquadro.it/blog/" />
        <meta property="og:title" content={t('blog.meta_title')} />
        <meta property="og:description" content={t('blog.meta_description')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://edilquadro.it/portfolio-bg.avif" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://edilquadro.it/portfolio-bg.avif" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                <li><Link to={isEn ? '/en/' : '/'} className="hover:text-white transition-colors">Home</Link></li>
                <li><span className="mx-1">/</span></li>
                <li className="text-white font-medium">Blog</li>
              </ol>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('blog.h1')}</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t('blog.subtitle')}</p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_ARTICLES.map((article) => (
                <article key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                  <Link to={isEn ? `/en/blog/${article.slug}/` : `/blog/${article.slug}/`}>
                    <div className="aspect-[16/10] overflow-hidden">
                      <LazyImage
                        src={article.image}
                        alt={t(`${article.translationKey}.title`)}
                        className="w-full h-full"
                        imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width="600"
                        height="375"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {categoryLabels[article.category] || article.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {article.readTime} min {isEn ? 'read' : 'lettura'}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {t(`${article.translationKey}.title`)}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {t(`${article.translationKey}.excerpt`)}
                      </p>
                      <span className="inline-block mt-4 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        {isEn ? 'Read more →' : 'Leggi di più →'}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('blog.cta_title')}</h2>
            <p className="text-blue-100 mb-6">{t('blog.cta_desc')}</p>
            <Link
              to={isEn ? '/en/free-quote/' : '/preventivo/'}
              className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg transition-colors"
            >
              {t('blog.cta_button')}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
