const userService = require("../services/userServices.js");

const register = async (req, res) => {
  const { nome, cargo, email, senha } = req.body;

  try {
    await userService.registerUser(nome, cargo, email, senha);
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

const findUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.findUserById(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  findUserById,
  findAllUsers,
};
