import http from "http";
import fs from "fs";

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let filename;
  let status = 200;
  switch (req.url) {
    case "/":
      filename = "index.html";
      break;
    case "/about":
      filename = "about.html";
      break;
    case "/contact":
      filename = "contact.html";
      break;
    default:
      filename = "404.html";
      status = 404;
  }

  fs.readFile(filename, (error, page) => {
    if (error) {
      res.writeHead(404);
      res.write("Content you are looking for cannot be found.");
      res.end();
    }

    res.writeHead(status, { "Content-Type": "text/html" });
    res.write(page);
    res.end();
  });
});

server.listen(port, () => {
  console.log("Server running on port:", port);
});
