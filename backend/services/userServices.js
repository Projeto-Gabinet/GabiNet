const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/entidades/UserModel.js");
const { verifyRole } = require("../middleware/authMiddleware");

const registerUser = async (nome, email, senha) => {
  try {
    const userExists = await userModel.findUserByEmail(email);
    if (userExists) {
      throw new Error("Já existe usuário neste e-mail");
    }

    const hashedSenha = await bcryptjs.hash(senha, 10);
    await userModel.createUser(nome, email, hashedSenha);
  } catch (error) {
    throw new Error(`Erro ao registrar usuário: ${error.message}`);
  }
};

const loginUser = async (email, senha) => {
  try {
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      throw new Error("Usuário ou senha inválidos!");
    }

    const passwordMatch = await bcryptjs.compare(senha, user.senha);
    if (!passwordMatch) {
      throw new Error("Usuário ou senha inválidos!");
    }

    const token = jwt.sign(
      { id: user.id_usuario, nome: user.nome, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Expiração do token 
    );

    return token;
  } catch (error) {
    throw new Error(`Erro ao fazer login: ${error.message}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
