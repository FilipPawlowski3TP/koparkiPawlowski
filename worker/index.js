// Cloudflare Worker — router dla wdrożenia typu „Worker with static assets"
// (Workers Builds). Cloudflare Pages używa katalogu `functions/`, ale wdrożenia
// Workers ignorują `functions/` — dlatego ten adapter kieruje /api/kontakt
// do tej samej logiki (functions/api/kontakt.js), a resztę oddaje do zasobów
// statycznych (dist/).
import { onRequestPost } from '../functions/api/kontakt.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/kontakt') {
      if (request.method === 'POST') {
        return onRequestPost({ request, env });
      }
      return new Response(JSON.stringify({ ok: false, error: 'Metoda niedozwolona.' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json; charset=utf-8', Allow: 'POST' }
      });
    }

    // Wszystko inne — statyczne pliki strony (obsługa _redirects i _headers po stronie platformy)
    return env.ASSETS.fetch(request);
  }
};
