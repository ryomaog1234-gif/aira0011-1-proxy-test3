const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  changeOrigin: true, 
  autoRewrite: true,   
});

const targetUrl = 'https://www.youtube.com'; 

const server = http.createServer((req, res) => {
  
  proxy.web(req, res, { target: targetUrl }, (e) => {
    console.error('Proxy Error:', e);
    res.statusCode = 502;
    res.end('Proxy Error');
  });
});

console.log(`Proxy server is running. Target: ${targetUrl}`);
server.listen(3000);
