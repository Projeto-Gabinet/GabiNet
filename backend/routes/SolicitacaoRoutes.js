const SolicitacaoController = require("../controller/solicitacaoController");

const solicitacaoController = new SolicitacaoController();
const express =require("express");
const router =express.Router();
router.get("/solicitacoes", solicitacaoController.obterTodos);
router.get("/solicitacoes/:id", solicitacaoController.obterPorId);
router.post("/solicitacoes", solicitacaoController.adicionar);
router.put("/solicitacoes/:id", solicitacaoController.atualizar);
router.delete("/solicitacoes/:id", solicitacaoController.excluir);
router.get("/solicitacoes/filtrar/:termoBusca", solicitacaoController.filtrar);

module.exports=router;
