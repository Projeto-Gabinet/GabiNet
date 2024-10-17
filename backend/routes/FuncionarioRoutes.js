const FuncionarioController = require('../controller/FuncionarioController');
const { verifyRole } = require("../middleware/authMiddleware");

const funcionarioController = new FuncionarioController();
const express = require('express');
const router = express.Router();

router.get('/', verifyRole("assessor"), funcionarioController.obterTodos);
router.get('/:id', verifyRole("assessor"), funcionarioController.obterPorId);
router.post('/', verifyRole("assessor"), funcionarioController.adicionar);
router.put('/:id', verifyRole("vereador"), funcionarioController.atualizar);
router.delete('/:id', verifyRole("vereador"), funcionarioController.excluir);
router.get('/filtrar/:termoBusca', verifyRole("assessor"), funcionarioController.filtrar);

module.exports = router;