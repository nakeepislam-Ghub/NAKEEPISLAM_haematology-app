import pathlib, json
src = pathlib.Path("src")
shell = (src/"shell.html").read_text()
js = "\n".join((src/f).read_text() for f in ["data.js","m2-data.js","cells.js","rbc.js","app.js"])
# Artifact preview: page fragment, the host adds the document skeleton (not committed).
preview = pathlib.Path("build"); preview.mkdir(exist_ok=True)
(preview/"artifact.html").write_text(shell + "\n<script>\n" + js + "\n</script>\n")
# Installable site, served by GitHub Pages from docs/.
out = pathlib.Path("docs"); out.mkdir(exist_ok=True)
(out/".nojekyll").write_text("")
# Standalone installable build for any static host.
head = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#4a3891">
<meta name="description" content="Interactive haematology learning for Clinical Pathology postgraduates.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
"""
sw_reg = """<script>if('serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}</script>"""
(out/"index.html").write_text(head + "</head><body>\n" + shell + "\n<script>\n" + js + "\n</script>\n" + sw_reg + "\n</body></html>\n")
(out/"manifest.webmanifest").write_text(json.dumps({
  "name":"Interactive Diagnostic Haematology","short_name":"Haematology",
  "start_url":"./","scope":"./","display":"standalone","background_color":"#faf7f9","theme_color":"#4a3891",
  "icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png"},
           {"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]}, indent=2))
(out/"sw.js").write_text("""const CACHE = 'idh-v2';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isFont = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !isFont) return;
  // Network first for the page so updates arrive; cache first for everything else.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put('index.html', copy)); return r; }).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return r; })));
});
""")
(out/"icon.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#4a3891"/><circle cx="256" cy="256" r="170" fill="#f3dbe5"/><circle cx="196" cy="226" r="62" fill="#4a3891"/><circle cx="306" cy="206" r="52" fill="#4a3891"/><circle cx="276" cy="318" r="58" fill="#4a3891"/><path d="M226 236 L290 212 M298 228 L288 280" stroke="#4a3891" stroke-width="16" stroke-linecap="round"/></svg>')
print("built", (out/"index.html").stat().st_size)
