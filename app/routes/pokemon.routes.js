var express = require('express');
var router = express.Router();
const pokemon = require("../controllers/pokemon.controller.js");

// Create a new Pokemon
router.post("/pokemon", pokemon.create);
  
// Retrieve all Pokemon
router.get("/pokemon", pokemon.findAll);

// Retrieve a single Pokemon with pokemonId
router.get("/pokemon/:pokemonId", pokemon.findOne);

// Update a Pokemon with pokemonId
router.put("/pokemon/:pokemonId", pokemon.update);

// Delete a Pokemon with pokemonId
router.delete("/pokemon/:pokemonId", pokemon.delete);

module.exports = router;