const { Op, NUMBER } = require("sequelize");
const { Character } = require("../db/DB_conection");

const getAllCharter = async () => {
    try {
        const getAll = await Character.findAll();
        if (!getAll.length) throw new Error("No hay Characters en DB");
        return getAll;
    } catch (error) {
        return { error: error.message };
    }
}

const getOneChartere = async (parametro) => {
    let character={}, condition = {}, where = {};

    try {
        if (!parametro) throw new Error("Agrege un id o nombre de un personaje");
        
        const data = parseInt(parametro);

        if(isNaN(data)) where.name = parametro;
        if(!isNaN(data)) where.id = parametro;
        condition.where = where;
        
        character = await Character.findOne(condition);

        if (!character) throw new Error("No hay resultados");

        return character;

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { getAllCharter, getOneChartere };