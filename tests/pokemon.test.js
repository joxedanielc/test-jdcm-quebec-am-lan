const request = require("supertest");
const app = require('../app');

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

test('Should get all pokemon', async () => {
    await request(app).get('/pokemon').expect(200)
});

test('Should get pokemon by random id', async () => {
    let iSearchRandomPokemon = between(1, 500);
    console.log("iSearchRandomPokemon" + iSearchRandomPokemon);
    await request(app).get(`/pokemon/${iSearchRandomPokemon}`).expect(200)
});

test('Should get the first 10 pokemon', async () => {
    await request(app).get('/pokemon/?limit=10&skip=0').expect(200)
});

test('Should create a new pokemon but get a success', async () => {
    await request(app).post('/pokemon').send({
        "Name": "PokemonAutomatedTesting",
        "Type_1": "Fire",
        "Type_2": "Plant",
        "Total": 700,
        "HP": 60,
        "Attack": 100,
        "Defense": 150,
        "Speed": 80,
        "Legendary": "False",
        "Sp_Atk": 200,
        "Sp_Def": 150,
        "Generation": 7
    }).expect(200)
});

test('Should updathe pokemon with id 1', async () => {

    await request(app).put('/pokemon/1').send({
        "Sp_Atk": between(1, 200),
        "Sp_Def": between(1, 200),
        "Generation": 7
    }).expect(200)
});

test('Should delete a random pokemon', async () => {
    
    let iDeleteRandomPokemon = between(1, 500);
    console.log("iDeleteRandomPokemon:"+iDeleteRandomPokemon);

    await request(app).delete(`/pokemon/${iDeleteRandomPokemon}`).expect(200)
});


test('Should create a new pokemon but get an error', async () => {
    await request(app).post('/pokemon').send({
        "Name": "",
        "Type_1": "Fire",
        "Type_2": "Plant",
        "Total": 700,
        "HP": 60,
        "Attack": 100,
        "Defense": 150,
        "Speed": 80,
        "Legendary": "False",
        "Sp_Atk": 200,
        "Sp_Def": 150,
        "Generation": 7
    }).expect(200)
});