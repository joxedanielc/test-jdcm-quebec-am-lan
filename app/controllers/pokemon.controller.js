const Pokemon = require("../models/pokemon.model.js");

// Create and Save a new Pokemon
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Pokemon
    const pokemon = new Pokemon({
        Name : req.body.name,
        Type_1 : req.body.typeone,
        Type_2 : req.body.typetwo,
        Total : req.body.total,
        HP : req.body.hp,
        Attack : req.body.attack,
        Defense : req.body.defense,
        Sp_Atk : req.body.spattack,
        Sp_Def : req.body.spdef,
        Speed : req.body.speed,
        Generation : req.body.generation,
        Legendary : req.body.legendary,
    });

    // Save Pokemon in the database
    Pokemon.create(pokemon, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pokemon."
            });
        else res.send(data);
    });
};

// Retrieve all Pokemon from the database.
exports.findAll = (req, res) => {

    let skip = req.query.skip;
    let limit = req.query.limit;

    console.log({skip});
    console.log({limit});

    let options = {}

    if (skip && skip != "") {
        options.skip = skip;
    }

    if (limit && limit != "") {
        options.limit = limit;
    }

    console.log(options);

    Pokemon.getAll(options, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pokemon."
            });
        else res.send(data);
    });
};

// Find a single Pokemon with a pokemonId
exports.findOne = (req, res) => {
    Pokemon.findById(req.params.pokemonId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pokemon with id ${req.params.pokemonId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Pokemon with id " + req.params.pokemonId
                });
            }
        } else res.send(data);
    });
};

// Update a Pokemon identified by the pokemonId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const pokemon = new Pokemon({
        Name : req.body.name,
        Type_1 : req.body.typeone,
        Type_2 : req.body.typetwo,
        Total : req.body.total,
        HP : req.body.hp,
        Attack : req.body.attack,
        Defense : req.body.defense,
        Sp_Atk : req.body.spattack,
        Sp_Def : req.body.spdef,
        Speed : req.body.speed,
        Generation : req.body.generation,
        Legendary : req.body.legendary,
    });

    Pokemon.updateById(
        req.params.pokemonId,
        pokemon,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Pokemon with id ${req.params.pokemonId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Pokemon with id " + req.params.pokemonId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Pokemon with the specified pokemonId in the request
exports.delete = (req, res) => {
    Pokemon.remove(req.params.pokemonId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pokemon with id ${req.params.pokemonId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Pokemon with id " + req.params.pokemonId
                });
            }
        } else res.send({ message: `Pokemon was deleted successfully!` });
    });
};