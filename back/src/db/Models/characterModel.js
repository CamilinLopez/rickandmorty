const { DataTypes } = require('sequelize');

module.exports = (database) => {
    database.define('Character', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        species: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Alive", "Dead", "unknown"),
            allowNull: false

        },
        origin: {
            type: DataTypes.JSON,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM("Female", "Male", "Genderless", "unknown"),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};