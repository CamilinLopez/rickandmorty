const {Sequelize, DataTypes} = require("sequelize");
const modelUser = require("./Models/userModel");
const modelCharacter = require("./Models/characterModel");

require("dotenv").config();
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;


const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dbrickandmorty`,{logging: false, native: false});

modelUser(database);
modelCharacter(database);

console.log(database.models);

const {User, Character} = database.models;

const Favorito = database.define('Favorito', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

User.belongsToMany(Character, {through:Favorito});
Character.belongsToMany(User,{through:Favorito});


module.exports = {
    ...database.models,
    database
}