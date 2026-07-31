// Sets a Cache-Control header so browsers and any CDN in front of this
// API (Render, Cloudflare, etc.) can serve repeat requests without
// hitting the database every time. Only meant for public GET routes
// whose content doesn't need to be instantly fresh to the second —
// never apply this to anything behind requireAuth, or to POST/PATCH/
// DELETE routes.
export function cacheControl(seconds) {
  return (req, res, next) => {
    res.set("Cache-Control", `public, max-age=${seconds}`);
    next();
  };
}
