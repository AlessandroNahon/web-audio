const http = require("http");
const fs = require('fs');

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Accept-Language, X-Authorization',
    'Content-Type': 'text/html'
    /** add other headers as per requirement */
  };

  fs.readFile('./index.html', (err, html) => {
    if (err) {
      throw err;
    }
    
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers);
      res.end();
      return;
    }
  
    if (['GET', 'POST'].indexOf(req.method) > -1) {
      res.writeHead(200, headers);
      res.end(html);
      return;
    }

    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
})

