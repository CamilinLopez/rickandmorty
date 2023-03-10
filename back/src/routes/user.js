const express = require("express");

const RouterUser = express.Router();

const { AddUserData, DeleteUserData, UpdateUserData, getOneUser } = require("../controllers/userControllers");


RouterUser.post("/singup", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const data = await AddUserData({ email, password });
        if (data.error) throw new Error(data.error);

        res.status(200).json(data)
    } catch (error) {
        res.status(404).send(error.message);
    }
});

RouterUser.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const data = await DeleteUserData(id);

        if (data.error) throw new Error(data.error);

        res.status(200).json(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

RouterUser.put("/update", async (req, res) => {
    const { email, newEmail, password, newPassword } = req.body;

    try {
        const data = await UpdateUserData({ email, newEmail, password, newPassword });
        if (data.error) throw new Error(data.error);

        res.status(200).json(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

RouterUser.get("/one", async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await getOneUser(email, password);
        if (data.error) throw new Error(data.error);

        res.status(200).json(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});



module.exports = { RouterUser };