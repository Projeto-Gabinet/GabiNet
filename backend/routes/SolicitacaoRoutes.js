const SolicitacaoController = require("../controller/solicitacaoController");
const { verifyRole } = require("../middleware/authMiddleware");

const solicitacaoController = new SolicitacaoController();
const express = require("express");
const router = express.Router();

router.get("/", verifyRole("assessor"), solicitacaoController.obterTodos);
router.get("/:id", verifyRole("assessor"), solicitacaoController.obterPorId);
router.post("/", verifyRole("assessor"), solicitacaoController.adicionar);
router.put("/:id", verifyRole("vereador"), solicitacaoController.atualizar);
router.delete("/:id", verifyRole("vereador"), solicitacaoController.excluir);
router.get("/filtrar/:termoBusca", verifyRole("assessor"), solicitacaoController.filtrar);

module.exports = router;