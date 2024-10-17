const CidadaoController = require('../controller/CidadaoController');
const { verifyRole } = require("../middleware/authMiddleware");

const cidadaosController = new CidadaoController();
const express = require('express');
const router = express.Router();

router.get('/', verifyRole("assessor"), cidadaosController.obterTodos);
router.get('/:id', verifyRole("assessor"), cidadaosController.obterPorId);
router.post('/', verifyRole("assessor"), cidadaosController.adicionar);
router.put('/:id', verifyRole("vereador"), cidadaosController.atualizar);
router.delete('/:id', verifyRole("vereador"), cidadaosController.excluir);
router.get('/filtrar/:termoBusca', verifyRole("assessor"), cidadaosController.filtrar);

module.exports = router;