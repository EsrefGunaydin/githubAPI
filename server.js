const http = require("http");
const PORT = 8000;

http
  .createServer((req, res) => {
    console.log("Server is working on 8000");
  })
  .listen(PORT);
