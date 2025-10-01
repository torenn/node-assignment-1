const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(path.join(__dirname, "404.html"), (err404, content404) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(content404);
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log("Web server running at http://localhost:3000");
});

