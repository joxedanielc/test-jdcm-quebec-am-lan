const express = require("express");
const bodyParser = require("body-parser");
const pokemon = require("./app/controllers/pokemon.controller.js");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to JD's application." });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

// Create a new Pokemon
app.post("/pokemon", pokemon.create);
  
// Retrieve all Pokemon
app.get("/pokemon", pokemon.findAll);

// Retrieve a single Pokemon with pokemonId
app.get("/pokemon/:pokemonId", pokemon.findOne);

// Update a Pokemon with pokemonId
app.put("/pokemon/:pokemonId", pokemon.update);

// Delete a Pokemon with pokemonId
app.delete("/pokemon/:pokemonId", pokemon.delete);