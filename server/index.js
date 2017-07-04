const http = require('http');

const colorReset = '\x1b[0m';
const colorTable = {
  log: '\x1b[37m',
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m'
};

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    const headers = {
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Credentials': false,
      'Access-Control-Max-Age': 60 * 60,
      'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    };
    res.writeHead(200, headers);
    res.end();
    return
  }

  var body = '';
  req.on('data', data => body += data);
  req.on('end', () => {
    const params = JSON.parse(body);
    console[params.level](colorTable[params.level], `[${params.level}]`, colorReset, ...params.messages);
    res.end('OK');
  });
}).listen(process.env.PORT || 3333);
