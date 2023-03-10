const express = require("express");
const RouterFav = express.Router();

const { addFav, getAllFav, deleteFav } = require("../controllers/favControllers");


RouterFav.post("/add", async (req, res) => {
    const { UserId, CharacterId } = req.body;
    try {
        const data = await addFav({ UserId, CharacterId });
        if (data.error) throw new Error(data.error);

        res.status(200).json(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

RouterFav.get("/all/:UserId", async (req, res) => {
    const { UserId } = req.params;
    try {
        const data = await getAllFav(UserId);
        if (data.error) throw new Error(data.error);

        res.status(200).json(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

RouterFav.delete("/delete", async (req, res) => {
    const { UserId, CharacterId } = req.body;
    try {
        const data = await deleteFav(UserId, CharacterId);
        if (data.error) throw new Error(data.error);

        res.status(200).json(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
})


module.exports = { RouterFav };