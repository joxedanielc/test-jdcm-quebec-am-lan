const Pokemon = require("../models/pokemon.model.js");

//Create a new Pokemon
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    if(!req.body.Name || req.body.Name == "") {
        return res.status(400).send({
            message: "Pokemon's name is required!"
        });
    }

    if(!req.body.Type_1 || req.body.Type_1 == "") {
        return res.status(400).send({
            message: "Pokemon's Type One is required!"
        });
    }

    // Save Pokemon in the database
    Pokemon.create(req.body, (err, data) => {
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

    //console.log({skip});
    //console.log({limit});

    let options = {}

    if (skip && skip != "") {
        options.skip = skip;
    }

    if (limit && limit != "") {
        options.limit = limit;
    }

    //console.log(options);

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
    
    Pokemon.updateById(
        req.params.pokemonId,
        req.body,
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