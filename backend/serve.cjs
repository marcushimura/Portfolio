// API-only entry point: never serves workspace files or credentials.
const http = require('node:http');
const {createGuideHandler} = require('./guide-api.cjs');
const production = process.env.NODE_ENV === 'production';
if (production && (!process.env.GROQ_API_KEY || !process.env.GUIDE_ALLOWED_ORIGINS)) {
  throw new Error('Configure GROQ_API_KEY e GUIDE_ALLOWED_ORIGINS na hospedagem.');
}
const handler = createGuideHandler();
const port = Number(process.env.PORT || 4174);
const host = process.env.HOST || '0.0.0.0';
const server = http.createServer(async (req, res) => {
  let pathname;
  try { pathname = new URL(req.url, 'http://localhost').pathname; }
  catch { res.writeHead(400); return res.end(); }
  try {
    if (await handler(req, res, pathname)) return;
    res.writeHead(404, {'Content-Type':'text/plain', 'X-Content-Type-Options':'nosniff'});
    res.end('Not found');
  } catch {
    if (!res.headersSent) res.writeHead(500, {'Content-Type':'application/json'});
    res.end(JSON.stringify({error:'Serviço temporariamente indisponível.'}));
  }
});
server.requestTimeout = 30000;
server.headersTimeout = 10000;
server.listen(port, host, () => console.log('Portfolio API listening on port ' + port));
