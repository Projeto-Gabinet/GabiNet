const express = require("express");
const { registerUser, loginUser } = require("../services/userServices");
const { verifyRole } = require("../middleware/authMiddleware");

const router = express.Router();

// Rota para registrar um usuário, acessível apenas para vereadores
router.post("/register", verifyRole("vereador"), async (req, res) => {
  try {
    const { nome, cargo, email, senha } = req.body;
    await registerUser(nome, cargo, email, senha);
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para deletar um usuário, acessível apenas para vereadores
router.delete("/:id", verifyRole("vereador"), async (req, res) => {
  // Lógica para deletar usuário
  res.status(200).json({ message: "Usuário deletado com sucesso" });
});

// Rota para pesquisar um usuário, acessível para assessores
router.get("/:id", verifyRole("assessor"), async (req, res) => {
  // Lógica para pesquisar usuário
  res.status(200).json({ message: "Usuário encontrado" });
});

router.get("/", verifyRole("assessor"), async (req, res) => {
  // Lógica para pesquisar usuário
  res.status(200).json({ message: "Usuário encontrado" });
});

router.get("/:id", verifyRole("assessor"), async (req, res) => {
  // Lógica para pesquisar usuário
  res.status(200).json({ message: "Usuário encontrado" });
});


module.exports = router;