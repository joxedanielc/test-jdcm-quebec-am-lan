const sql = require("./db.js");

// constructor
const Pokemon = function (pokemon) {
    this.id = pokemon.id;
    this.Name = pokemon.Name;
    this.Type_1 = pokemon.Type_1;
    this.Type_2 = pokemon.Type_2;
    this.Total = pokemon.Total;
    this.HP = pokemon.HP;
    this.Attack = pokemon.Attack;
    this.Defense = pokemon.Defense;
    this.Sp_Atk = pokemon.Sp_Atk;
    this.Sp_Def = pokemon.Sp_Def;
    this.Speed = pokemon.Speed;
    this.Generation = pokemon.Generation;
    this.Legendary = pokemon.Legendary;
};

Pokemon.create = (NewPokemon, result) => {
    sql.query("INSERT INTO pokemon SET ?", NewPokemon, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created pokemon: ", { id: res.insertId });
        result(null, { id: res.insertId });
    });
};

Pokemon.findById = (pokemonId, result) => {
    sql.query(`SELECT * FROM pokemon WHERE id = ${pokemonId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found pokemon: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found pokemon with the id
        result({ kind: "not_found" }, null);
    });
};

Pokemon.getAll = (options, result) => {

    let mainQuery = `SELECT * FROM pokemon`;

    if(options.limit) {
        mainQuery = `${mainQuery} LIMIT ${options.limit}`;
    }

    if(options.skip) {
        mainQuery = `${mainQuery} OFFSET ${options.skip}`;
    }

    console.log({mainQuery});

    sql.query(mainQuery, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("pokemon: ", res);
        result(null, res);
    });
};

Pokemon.updateById = (id, pokemon, result) => {
    sql.query(
        `UPDATE pokemon SET Name = ${pokemon.Name}, Type_1 = ${pokemon.Type_1}, Type_2 = ${pokemon.Type_2}, Total = ${pokemon.Total}, HP = ${pokemon.HP}, Attack = ${pokemon.Attack},
        Defense = ${pokemon.Defense}, Sp_Atk = ${pokemon.Sp_Atk}, Sp_Def = ${pokemon.Sp_Def}, Speed = ${pokemon.Speed}, Generation = ${pokemon.Generation}, Legendary = ${pokemon.Legendary}
        WHERE id = ${id}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found pokemon with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated pokemon: ", { id: id, ...pokemon });
            result(null, { id: id, ...pokemon });
        }
    );
};

Pokemon.remove = (id, result) => {
    sql.query("DELETE FROM pokemon WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found pokemon with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted pokemon with id: ", id);
        result(null, res);
    });
};

module.exports = Pokemon;
