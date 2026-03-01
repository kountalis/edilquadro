// Cloudflare Worker to proxy Google Analytics requests

export async function onRequest(context) {
  const { request } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = new URL(request.url);
  const gaUrl = `https://www.google-analytics.com/mp/collect${url.search}`;

  const gaRequest = new Request(gaUrl, {
    method: 'POST',
    headers: request.headers,
    body: request.body,
  });

  try {
    const gaResponse = await fetch(gaRequest);
    return gaResponse;
  } catch (error) {
    return new Response('Error proxying request to Google Analytics', { status: 500 });
  }
}
