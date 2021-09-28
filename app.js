const express = require("express");
const bodyParser = require("body-parser");
const pokemon = require("./app/controllers/pokemon.controller.js");
const pokemonRouter = require("./app/routes/pokemon.routes.js");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to JD's application." });
});

app.use(pokemonRouter);

module.exports = app