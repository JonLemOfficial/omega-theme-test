"use strict";

const { createServer } = require("http");
const PORT = process.env.PORT || 8000;
const isProd = process.env.NODE_ENV && process.env.NODE_ENV === "production";
const app = isProd ? require("./app.prod") : require("./app.dev");
const server = createServer(app);

server.listen(...isProd ? [ PORT ] : [ PORT, () => {
  console.log("Server running at: 'http://localhost:8000'");
}]);