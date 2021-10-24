const http = require("http");
const fs = require("fs");
const axios = require("axios");
const PORT = 8000;

http
  .createServer((req, res) => {
    //Basic route for form
    if (req.url === "/") {
      fs.readFile("./index.html", null, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.write("File was not found");
        } else {
          res.write(data);
        }
        res.end();
      });
    }

    console.log(`Server is working on port: ${PORT}`);
  })
  .listen(PORT);
