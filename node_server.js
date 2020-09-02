// To know how different between deno and nodejs modules
const http = require("http");

const server = http.createServer((req, res) => {
    res.end('Message from Node');
});

server.listen(3000);
// > node node_server.js