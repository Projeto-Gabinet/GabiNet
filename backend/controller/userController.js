const userService = require("../services/userServices.js");

const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    await userService.registerUser(nome, email, senha);
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const token = await userService.loginUser(email, senha);
    res.json({ token }); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
