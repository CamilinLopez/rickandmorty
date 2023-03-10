const { User } = require("../db/DB_conection");


const AddUserData = async ({ email, password }) => {
    try {
        if (!email || !password) throw new Error("Faltan datos por completar");

        const data = await User.findOne({ where: { email, password } });

        if (data) throw new Error("Ya existe este usuario.")

        await User.create({ email, password });

        return "Usuario creado correctamente";
    } catch (error) {
        return { error: error.message };
    }
}

const DeleteUserData = async (id) => {
    try {
        if (!id) throw new Error("Deve proporcionar un id");

        const data = await User.findByPk(id);
        if (!data) throw new Error("No existe en DB un personaje con este id");
        data.destroy();

        return "Usuario eliminado";
    } catch (error) {
        return { error: error.message };
    }
}

const UpdateUserData = async ({ email, newEmail, password, newPassword }) => {
    try {
        if (!email || !password) throw new Error("Completar email y password");
        if (!newEmail || !newPassword) throw new Error("Completar el nuevo email y password");

        const data = await User.findAll({
            where: {
                email,
                password
            }
        });
        if (!data.length) throw new Error(`No se encontro el usuario con el email ${email} y el password ${password}`);

        await User.update({ email: newEmail, password: newPassword }, {
            where: {
                email,
                password
            }
        });

        return `Se actualizo email a ${newEmail} y password a ${newPassword}`;
    } catch (error) {
        return { error: error.message };
    }
}

const getOneUser = async (email, password) => {
    try {
        if (!email || !password) throw new Error("Agrege un usuario y password");
        const data = await User.findOne({
            where: {
                email,
                password
            }
        });

        if (!data) throw new Error("No existe este usuario en DB");

        return data;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { AddUserData, DeleteUserData, UpdateUserData, getOneUser };