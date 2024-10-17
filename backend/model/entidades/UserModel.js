const DataBase = require("../DataBase.js");


const findUserById = async (id) => {
    try {
        const [rows] = await DataBase.query('SELECT * FROM usuario WHERE id = ?', [id]);
        return rows[0]; 
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
    }
};

const findAllUsers = async () => {
    try {
        const [rows] = await DataBase.query('SELECT * FROM usuario');
        return rows;
    } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        throw new Error(`Erro ao buscar todos os usuários: ${error.message}`);
    }
};

const findUserByEmail = async (email) => {
    try {
        const [rows] = await DataBase.query('SELECT * FROM usuario WHERE email = ?', [email]);
        return rows[0]; 
    } catch (error) {
        console.error('Erro ao buscar usuário por e-mail:', error);
        throw new Error(`Erro ao buscar usuário por e-mail: ${error.message}`);
    }
};

const createUser = async (nome, email, hashedSenha) => {
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            throw new Error('E-mail já está em uso.');
        }

        const [result] = await DataBase.query('INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedSenha]);
        return result; 
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
};

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
    findAllUsers,
};
