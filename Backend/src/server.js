const app = require("./index");
const http = require("http");
const dbUtils = require("./db/connectToDb");

const port = process.env.PORT || 4000;

const server = http.createServer(app);

// Initialize the database connection
dbUtils
  .initDb()
  .then(() => {
    console.log("Database initialized successfully");
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1); // Exit if database initialization fails
  });

server.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`);
});
