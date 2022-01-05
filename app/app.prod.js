"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");
const { Sequelize } = require("sequelize");
const connection = new Sequelize(process.env.APP_CONN);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "dist", "index.html")
  );
});

app.get("/userlist", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "dist", "index.html")
  );
});

app.get("/users", async (req, res) => {
  let [ rows ] = await connection.query("SELECT * FROM users");
  res.json(rows);
});

app.get("/ajax", async (req, res) => {
  let { search } = req.query;

  let locations = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`);
  res.json(locations.data.features);
});

app.post("/ajax", async (req, res) => {
  await connection.query("INSERT INTO `users` (`name`, `phone`, `email`, `address`) VALUES (?, ?, ?, ?) ", {
    replacements: [
      req.body.name,
      req.body.phone,
      req.body.email,
      req.body.address
    ]
  });
  res.json({
    success: true,
    token: req.body.reCaptchaToken
  });
});

// app.get("*", (req, res) => {
//   res.send("Error: 404 File Not found");
// });

app.use(express.static(path.join(__dirname, "..", "dist")));

module.exports = app;