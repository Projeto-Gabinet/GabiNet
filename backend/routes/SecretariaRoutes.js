const SecretariaController = require("../controller/SecretariaController");
const { verifyRole } = require("../middleware/authMiddleware");

const secretariaController = new SecretariaController();
const express = require("express");
const router = express.Router();

router.get("/", verifyRole("assessor"), secretariaController.obterTodos);
router.get("/:id", verifyRole("assessor"), secretariaController.obterPorId);
router.post("/", verifyRole("assessor"), secretariaController.adicionar);
router.put("/:id", verifyRole("vereador"), secretariaController.atualizar);
router.delete("/:id", verifyRole("vereador"), secretariaController.excluir);
router.get("/filtrar/:termoBusca", verifyRole("assessor"), secretariaController.filtrar);

module.exports = router;