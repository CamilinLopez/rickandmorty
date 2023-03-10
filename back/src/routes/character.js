const express = require("express");
const RouterCharacter = express.Router();

const { getAllCharter, getOneChartere } = require("../controllers/characterControllers");

RouterCharacter.use(express.json());


RouterCharacter.get("/all", async (req, res) => {
    try {
        const allCharacters = await getAllCharter();
        if (allCharacters.error) throw new Error(allCharacters.error);

        res.status(200).json(allCharacters);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

RouterCharacter.get("/one", async (req, res) => {
    const { parametro } = req.query;
    try {
        const character = await getOneChartere(parametro);
        if (character.error) throw new Error(character.error);

        res.status(200).json(character);
    } catch (error) {
        res.status(404).send(error.message);
    }
});



module.exports = { RouterCharacter };