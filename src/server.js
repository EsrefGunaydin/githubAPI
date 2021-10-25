const http = require("http");
const url = require("url");
const fs = require("fs");
const { getPullRequests } = require("./utilities");

// Form inputs && Variables
const PORT = 8000;
var owner = "";
var repoName = "";

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
        //Slice the url coming from form
        const endPos = query.path.indexOf("%");
        owner = query.path.slice(4, endPos);
        repoName = query.path.slice(endPos + 3);
        console.log(owner, repoName);
      });
    }

    //REST API endpoint for pull requests and commits
    if (req.url === "/api/pullrequests") {
      getPullRequests(owner, repoName)
        .then((result) => {
          res.writeHead(200, { "Content-type": "application/json" });
          res.end(JSON.stringify(result));
        })
        .catch((err) => console.log(err));
    }

    console.log(`Server is working on port: ${PORT}`);
  })
  .listen(PORT);
