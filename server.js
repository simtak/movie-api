const http = require("http");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text-plain" });
    response.end("hello Node!\n");
  })
  .listen(8080);

console.log("My first Node test server is running on Port 8080.");
