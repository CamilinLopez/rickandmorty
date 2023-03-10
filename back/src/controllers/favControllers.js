const { Favorito } = require("../db/DB_conection");

const addFav = async ({ UserId, CharacterId }) => {
    try {
        if (!UserId || !CharacterId) throw new Error("Faltan datos por completar");


        await Favorito.create({ UserId, CharacterId });

        return "se ha agregado a favoritos el character";

    } catch (error) {
        return { error: error.message };
    }
}

const getAllFav = async (UserId) => {
    try {
        if (!UserId) throw new Error("Error, agrege un id");
        const allFav = await Favorito.findAll({
            where: { UserId }
        });
        if (!allFav.length) throw new Error("No hay favoritos");

        return allFav;
    } catch (error) {
        return { error: error.message };
    }
}

const deleteFav = async (UserId, CharacterId) => {
    try {
        if (!UserId || !CharacterId) throw new Error("Agrege UserId y CharacterId");

        const data = await Favorito.findOne({
            where: {
                UserId,
                CharacterId
            }
        });
        if (!data) throw new Error("No exsite este personaje en DB");
        data.destroy();

        return "Favorito eliminado";
    } catch (error) {
        return { error: error.message };
    }
}


module.exports = { addFav, getAllFav, deleteFav };