const http = require("http");
const url = require("url");
const fs = require("fs");
const axios = require("axios");
const { report } = require("process");
const PORT = 8000;

http
  .createServer((req, res) => {
    //Basic route for form
    if (req.url === "/") {
      fs.readFile("./index.html", null, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("File was not found");
        } else {
          res.end(data);
        }
      });
    }

    //Get the form input for Github URL address
    if (req.url === "/" && req.method === "POST") {
      var body = "";
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => {
        const searchParams = new URLSearchParams(body);
        const query = url.parse(searchParams.toString(), true);
        console.log(query);

        //Slice the url coming from form
        const endPos = query.path.indexOf("%");
        owner = query.path.slice(4, endPos);
        repoName = query.path.slice(endPos + 3);
        console.log(owner, repoName);
      });
    }

    console.log(`Server is working on port: ${PORT}`);
  })
  .listen(PORT);
