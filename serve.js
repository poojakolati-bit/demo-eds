const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const ROOT = __dirname;

// Use the same certificate that was applied for the UE service
const ueDir = path.resolve(ROOT, '../../');
const keyPath = path.join(ueDir, 'key.pem');
const certPath = path.join(ueDir, 'certificate.pem');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
};

const server = https.createServer(
  { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) },
  (req, res) => {
    // CORS headers for Universal Editor
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';

    let filePath = path.join(ROOT, urlPath);

    // Prevent path traversal
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    // If no file extension, try appending .html
    const tryWithoutExtension = () => {
      const htmlPath = `${filePath}.html`;
      fs.readFile(htmlPath, (htmlErr, data) => {
        if (!htmlErr) {
          res.setHeader('Content-Type', MIME['.html'] || 'application/octet-stream');
          res.writeHead(200);
          res.end(data);
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
      });
    };

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // If file not found and no extension, try with .html
        if (!path.extname(filePath)) {
          tryWithoutExtension();
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
      res.writeHead(200);
      res.end(data);
    });
  },
);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTPS server with CORS running at https://localhost:${PORT}`);
});
