"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { createServer } = require("http");

const app = express();
const PORT = process.env.PORT || 8000;
const isProd = process.env.NODE_ENV && process.env.NODE_ENV === "production";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.get("*", (req, res) => {
  res.send("Error: 404 Not found");
});

app.use(express.static(path.join(__dirname, "public")));

const server = createServer(app);

server.listen(...isProd ? [ PORT ] : [ PORT, () => {
  console.log("Server running at: 'http://localhost:8000'");
}]);