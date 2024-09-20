const pool = require("../DataBase.js");

const findUserByEmail = async (email) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
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

        const [result] = await pool.query('INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedSenha]);
        return result; 
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
};

module.exports = {
    findUserByEmail,
    createUser,
};
