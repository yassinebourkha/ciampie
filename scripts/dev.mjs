import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { build, root, dist } from './build.mjs';

const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('PORT doit être compris entre 1024 et 65535.');
await build();
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };
const csp = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'";

const server = createServer(async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Content-Security-Policy', csp);
  response.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    return response.end('Méthode non prise en charge.');
  }
  try {
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    const file = resolve(dist, `.${pathname}`);
    if (file !== dist && !file.startsWith(dist + sep)) {
      response.writeHead(403);
      return response.end('Accès interdit.');
    }
    const info = await stat(file);
    let target = file;
    if (info.isDirectory()) {
      if (!url.pathname.endsWith('/')) {
        response.writeHead(308, { Location: url.pathname + '/' + url.search });
        return response.end();
      }
      target = join(file, 'index.html');
    }
    const content = await readFile(target);
    response.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'Content-Length': content.length });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    const status = error instanceof URIError ? 400 : error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500;
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(status === 404 ? 'Page introuvable.' : 'Requête impossible.');
    if (status === 500) console.error(error);
  }
});

let timer;
let building = false;
let pending = false;
async function rebuild() {
  if (building) { pending = true; return; }
  building = true;
  try {
    // Nouveau processus : les changements de templates/données ne restent pas
    // bloqués dans le cache d'import ESM du serveur de développement.
    await new Promise((resolveBuild, rejectBuild) => {
      const task = spawn(process.execPath, [join(root, 'scripts/build.mjs')], { cwd: root, stdio: 'inherit', windowsHide: true });
      task.once('error', rejectBuild);
      task.once('exit', code => code === 0 ? resolveBuild() : rejectBuild(new Error(`Code de sortie ${code}`)));
    });
  }
  catch (error) { console.error('Build non appliqué :', error.message); }
  finally { building = false; if (pending) { pending = false; void rebuild(); } }
}
const watchers = ['src', 'public'].map(folder => watch(join(root, folder), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(() => void rebuild(), 150);
}));
server.listen(port, '127.0.0.1', () => console.log(`Local : http://127.0.0.1:${port}/ — recharger le navigateur après une modification.`));
function shutdown() {
  clearTimeout(timer);
  watchers.forEach(watcher => watcher.close());
  server.close(() => process.exit(0));
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
