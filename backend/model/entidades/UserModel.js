const database =require("../DataBase.js")
const bcryptjs =require('bcryptjs')
const { hash } =require("bcryptjs")

const findUserByEmail = async(email)=>{

    const [rows] = await database.query ('select * from usuario where email =?', [email])
    return rows[0]
}
const createUser =async(nome, email, hashedSenha)=>{
    const result = await database.query('INSERT INTO usuario (nome, email, senha) VALUES(?,?,?)', [nome, email, hashedSenha])
    return result
};

module.exports={
    findUserByEmail,
    createUser
};