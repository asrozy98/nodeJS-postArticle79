const http = require("http");
const router = require("./routes/index");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "application/json");

  router.index(req, res);
});

server.listen(8000);
