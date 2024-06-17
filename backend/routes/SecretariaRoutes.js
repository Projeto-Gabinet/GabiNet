const SecretariaController = require("../controller/SecretariaController");

const secretariaController = new SecretariaController();
const express =require("express");
const router =express.Router();
router.get("/secretarias", secretariaController.obterTodos);
router.get("/secretarias/:id", secretariaController.obterPorId);
router.post("/secretarias", secretariaController.adicionar);
router.put("/secretarias/:id", secretariaController.atualizar);
router.delete("/secretarias/:id", secretariaController.excluir);
router.get("/secretarias/filtrar/:termoBusca", secretariaController.filtrar);
module.exports=router;
