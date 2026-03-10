import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getArticleBySlug, BLOG_ARTICLES } from '../data/blogArticles';
import LazyImage from '../components/LazyImage';

const BlogPost = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const article = getArticleBySlug(slug);

  if (!article) {
    return <Navigate to={isEn ? '/en/blog/' : '/blog/'} replace />;
  }

  const canonicalUrl = isEn
    ? `https://edilquadro.it/en/blog/${article.slug}/`
    : `https://edilquadro.it/blog/${article.slug}/`;

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
        "item": isEn ? "https://edilquadro.it/en/blog" : "https://edilquadro.it/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t(`${article.translationKey}.title`),
        "item": canonicalUrl
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t(`${article.translationKey}.title`),
    "description": t(`${article.translationKey}.excerpt`),
    "image": `https://edilquadro.it${article.image}`,
    "author": {
      "@type": "Organization",
      "name": "Edilquadro",
      "url": "https://edilquadro.it"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Edilquadro",
      "url": "https://edilquadro.it"
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "mainEntityOfPage": canonicalUrl
  };

  // Split content into paragraphs using |||
  const contentSections = t(`${article.translationKey}.content`, { returnObjects: false })
    .split('|||')
    .filter(Boolean);

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t(`${article.translationKey}.meta_title`)}</title>
        <meta name="description" content={t(`${article.translationKey}.excerpt`)} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href={`https://edilquadro.it/blog/${article.slug}/`} />
        <link rel="alternate" hrefLang="en" href={`https://edilquadro.it/en/blog/${article.slug}/`} />
        <link rel="alternate" hrefLang="x-default" href={`https://edilquadro.it/blog/${article.slug}/`} />
        <meta property="og:title" content={t(`${article.translationKey}.meta_title`)} />
        <meta property="og:description" content={t(`${article.translationKey}.excerpt`)} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://edilquadro.it${article.image}`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2 text-gray-400 text-sm">
                <li><Link to={isEn ? '/en/' : '/'} className="hover:text-white transition-colors">Home</Link></li>
                <li><span className="mx-1">/</span></li>
                <li><Link to={isEn ? '/en/blog/' : '/blog/'} className="hover:text-white transition-colors">Blog</Link></li>
                <li><span className="mx-1">/</span></li>
                <li className="text-white font-medium truncate">{t(`${article.translationKey}.title`)}</li>
              </ol>
            </nav>
            <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              {t(`${article.translationKey}.title`)}
            </h1>
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              <span>{new Date(article.date).toLocaleDateString(isEn ? 'en-US' : 'it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>{article.readTime} min {isEn ? 'read' : 'lettura'}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="max-w-3xl mx-auto px-4 -mt-6">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <LazyImage
              src={article.image}
              alt={t(`${article.translationKey}.title`)}
              className="w-full"
              imageClassName="w-full aspect-[16/9] object-cover"
              width="960"
              height="540"
              loading="eager"
              fetchpriority="high"
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none">
            {contentSections.map((section, idx) => {
              // Sections starting with ## are subheadings
              if (section.trim().startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {section.trim().replace('## ', '')}
                  </h2>
                );
              }
              // Sections starting with - are list items
              if (section.trim().startsWith('- ')) {
                const items = section.trim().split('\n').filter(l => l.trim().startsWith('- '));
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-gray-700 leading-relaxed mb-6">
                  {section.trim()}
                </p>
              );
            })}
          </div>

          {/* Author Box */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">{isEn ? 'Author' : 'Autore'}</p>
            <p className="font-bold text-gray-900">Edilquadro</p>
            <p className="text-sm text-gray-600">{t('blog.author_bio')}</p>
          </div>

          {/* Related Services & Pages */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isEn ? 'Related Services' : 'Servizi Correlati'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {article.slug === 'quanto-costa-ristrutturare-casa-roma' && (
                <>
                  <Link to={isEn ? '/en/services/home/' : '/servizi/casa/'} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <span className="text-2xl">🏠</span>
                    <span className="font-medium text-blue-800">{isEn ? 'Home Renovation Services' : 'Ristrutturazione Casa'}</span>
                  </Link>
                  <Link to={isEn ? '/en/free-quote/' : '/preventivo/'} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                    <span className="text-2xl">📋</span>
                    <span className="font-medium text-yellow-800">{isEn ? 'Free Quote' : 'Preventivo Gratuito'}</span>
                  </Link>
                </>
              )}
              {article.slug === 'ristrutturazione-bagno-roma-guida-completa' && (
                <>
                  <Link to={isEn ? '/en/services/home/' : '/servizi/casa/'} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <span className="text-2xl">🏠</span>
                    <span className="font-medium text-blue-800">{isEn ? 'Home Renovation Services' : 'Ristrutturazione Casa'}</span>
                  </Link>
                  <Link to={isEn ? '/en/portfolio/' : '/portfolio/'} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <span className="text-2xl">📷</span>
                    <span className="font-medium text-green-800">{isEn ? 'See Our Projects' : 'Guarda i Nostri Lavori'}</span>
                  </Link>
                </>
              )}
              {article.slug === 'bonus-ristrutturazione-2025-come-funziona' && (
                <>
                  <Link to={isEn ? '/en/tax-benefits/' : '/bonus-fiscali/'} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <span className="text-2xl">💰</span>
                    <span className="font-medium text-blue-800">{isEn ? 'Tax Benefits' : 'Bonus Fiscali'}</span>
                  </Link>
                  <Link to={isEn ? '/en/services/buildings/' : '/servizi/edifici/'} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <span className="text-2xl">🏢</span>
                    <span className="font-medium text-green-800">{isEn ? 'Building Renovation' : 'Ristrutturazione Edifici'}</span>
                  </Link>
                </>
              )}
              {article.slug === 'ristrutturazione-appartamento-roma-guida-completa' && (
                <>
                  <Link to={isEn ? '/en/services/home/' : '/servizi/casa/'} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <span className="text-2xl">🏠</span>
                    <span className="font-medium text-blue-800">{isEn ? 'Home Renovation Services' : 'Ristrutturazione Casa'}</span>
                  </Link>
                  <Link to={isEn ? '/en/free-quote/' : '/preventivo/'} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                    <span className="text-2xl">📋</span>
                    <span className="font-medium text-yellow-800">{isEn ? 'Free Quote' : 'Preventivo Gratuito'}</span>
                  </Link>
                </>
              )}
              {article.slug === 'cappotto-termico-condominio-roma-costi-vantaggi' && (
                <>
                  <Link to={isEn ? '/en/services/buildings/' : '/servizi/edifici/'} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <span className="text-2xl">🏢</span>
                    <span className="font-medium text-blue-800">{isEn ? 'Building Renovation' : 'Ristrutturazione Edifici'}</span>
                  </Link>
                  <Link to={isEn ? '/en/tax-benefits/' : '/bonus-fiscali/'} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <span className="text-2xl">💰</span>
                    <span className="font-medium text-green-800">{isEn ? 'Tax Benefits' : 'Bonus Fiscali'}</span>
                  </Link>
                </>
              )}
            </div>

            {/* Other Blog Posts */}
            {BLOG_ARTICLES.filter(a => a.slug !== article.slug).length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isEn ? 'More Articles' : 'Altri Articoli'}
                </h3>
                <div className="space-y-3">
                  {BLOG_ARTICLES.filter(a => a.slug !== article.slug).map(other => (
                    <Link
                      key={other.slug}
                      to={isEn ? `/en/blog/${other.slug}/` : `/blog/${other.slug}/`}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <LazyImage
                        src={other.image}
                        alt={t(`${other.translationKey}.title`)}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        width="64"
                        height="64"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{t(`${other.translationKey}.title`)}</p>
                        <p className="text-sm text-gray-500">{other.readTime} min {isEn ? 'read' : 'lettura'}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-blue-600 rounded-xl text-white text-center">
            <h3 className="text-xl font-bold mb-3">{t('blog.post_cta_title')}</h3>
            <p className="text-blue-100 mb-6">{t('blog.post_cta_desc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+393387262675"
                className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg transition-colors"
              >
                📞 {isEn ? 'Call Now' : 'Chiama Ora'}
              </a>
              <Link
                to={isEn ? '/en/free-quote/' : '/preventivo/'}
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors border border-white/30"
              >
                {isEn ? 'Free Quote' : 'Preventivo Gratuito'}
              </Link>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-8 text-center">
            <Link
              to={isEn ? '/en/blog/' : '/blog/'}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← {isEn ? 'Back to Blog' : 'Torna al Blog'}
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPost;
