/**
 * Cloudflare Worker - Prerender.io Integration
 * Intercepts requests and routes them through Prerender.io for SEO bots
 * Serves cached pages for better performance
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    /* DISABLED: Redirect www to non-www - causing redirect loop with .htaccess
    if (url.hostname === 'www.edilquadro.it') {
      const newUrl = new URL(request.url);
      newUrl.hostname = 'edilquadro.it';
      return Response.redirect(newUrl.toString(), 301); // 301 = permanent redirect
    }
    */
    
    const userAgent = request.headers.get('user-agent') || '';
    
    // Check if this request is coming from Prerender
    const fromPrerender = request.headers.get('x-prerender-request') === 'true';
    
    // List of bot user agents that should be prerendered
    const botUserAgents = [
      'googlebot',
      'bingbot',
      'yandexbot',
      'slurp',
      'duckduckbot',
      'baiduspider',
      'facebookexternalhit',
      'twitterbot',
      'linkedinbot',
      'whatsapp',
      'slackbot',
      'telegrambot',
      'discordbot',
      'redditbot',
      'pinterestbot',
      'viber',
      'wget',
      'curl'
    ];

    const isBot = botUserAgents.some(bot => 
      userAgent.toLowerCase().includes(bot)
    );

    // Routes that don't need prerendering
    const excludeRoutes = [
      '/api/',
      '/admin/',
      '/.well-known/',
      '/manifest.json',
      '/robots.txt',
      '/sitemap.xml',
      '/service-worker.js'
    ];

    const shouldExclude = excludeRoutes.some(route => 
      url.pathname.startsWith(route)
    );

    // If request comes from Prerender, skip prerendering to avoid loops
    if (fromPrerender) {
      console.log(`[PRERENDER] Request from Prerender detected, skipping prerender`);
      return fetch(request);
    }

    // TEMPORARY: Disable Prerender for all bots to diagnose redirect issue
    // If it's a bot and not in exclude list, use Prerender
    // if (isBot && !shouldExclude) {
    //   return handlePrerender(request, env, ctx);
    // }

    // Otherwise, proxy to origin or fetch normally
    return fetch(request);
  }
};

/**
 * Handle Prerender.io request
 */
async function handlePrerender(request, env, ctx) {
  const url = new URL(request.url);
  const prerenderUrl = buildPrerenderUrl(url, env);
  
  console.log(`[PRERENDER] Rendering: ${url.pathname}`);
  console.log(`[PRERENDER] Prerender URL: ${prerenderUrl}`);

  try {
    // Create cache key
    const cacheKey = new Request(url.toString(), {
      method: 'GET'
    });

    // Check cache
    const cache = caches.default;
    let response = await cache.match(cacheKey);

    if (response) {
      console.log(`[CACHE] Hit for ${url.pathname}`);
      return response.clone();
    }

    // Fetch from Prerender.io
    const prerenderRequest = new Request(prerenderUrl, {
      method: 'GET',
      headers: {
        'User-Agent': request.headers.get('user-agent') || '',
        'Accept': 'text/html,application/xhtml+xml',
        'X-Prerender-Token': env.PRERENDER_TOKEN,
        'X-Prerender-Request': 'true'
      }
    });

    response = await fetch(prerenderRequest);

    // Cache successful responses
    if (response.ok && response.status === 200) {
      // Clone response before caching
      const cachedResponse = response.clone();
      
      // Cache for 24 hours
      ctx.waitUntil(
        cache.put(cacheKey, cachedResponse.clone().then(res => 
          new Response(res.body, {
            status: res.status,
            statusText: res.statusText,
            headers: new Headers(res.headers)
          })
        ))
      );

      console.log(`[CACHE] Stored ${url.pathname}`);
    }

    return response;
  } catch (error) {
    console.error(`[PRERENDER ERROR] ${error.message}`);
    
    // Fallback to normal fetch on error
    return fetch(request);
  }
}

/**
 * Build Prerender.io URL
 */
function buildPrerenderUrl(originalUrl, env) {
  const domain = env.PRERENDER_DOMAIN;
  const protocol = originalUrl.protocol;
  const host = originalUrl.host;
  const pathname = originalUrl.pathname;
  const search = originalUrl.search;

  // Encode the full URL for Prerender
  const fullUrl = `${protocol}//${host}${pathname}${search}`;
  const encodedUrl = encodeURIComponent(fullUrl);

  return `${domain}/?url=${encodedUrl}`;
}

/**
 * Health check endpoint
 */
export async function handleHealthCheck(request, env) {
  return new Response(
    JSON.stringify({
      status: 'ok',
      prerender_token: env.PRERENDER_TOKEN ? 'configured' : 'missing',
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
  );
}
