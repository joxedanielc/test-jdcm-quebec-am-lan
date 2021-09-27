module.exports = app => {
  const pokemon = require("../controllers/pokemon.controller.js");

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
};