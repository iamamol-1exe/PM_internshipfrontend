const app = require("./index");
const http = require("http");

const port = process.env.PORT || 4000;

const server = http.createServer(app);

const connectToDb = require("./db/connectToDb");

server.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`);
});
