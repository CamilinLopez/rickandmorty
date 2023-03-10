const axios = require("axios");
const {Character} = require("../db/DB_conection");

const getApiData = async () => {
    let character=[];
    try {
        for(let i=1; i<=2; i++){
            const data = (await axios(`https://rickandmortyapi.com/api/character?page=${i}`)).data.results;
            character = character.concat(data);
        }

        character = character.map(({id, name, species, status, origin, gender, image}) => {
            return{
                id, name, species, status, origin: JSON.stringify(origin), gender, image
            }
        });

        await Character.bulkCreate(character);

        return "Se han guardado los personajes en DB";

    } catch (error) {
        return {error: error.message};
    }
}

module.exports = {getApiData};