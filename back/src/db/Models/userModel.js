const { DataTypes } = require("sequelize");

module.exports = (database) => {
    database.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}