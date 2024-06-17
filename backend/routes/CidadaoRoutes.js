const CidadaoController = require('../controller/CidadaoController');

const cidadaosController = new CidadaoController();
const express = require('express');
const router =express.Router();
router.get('/cidadaos',cidadaosController.obterTodos)
router.get('/cidadaos/:id',cidadaosController.obterPorId)
router.post('/cidadaos',cidadaosController.adicionar)
router.put('/cidadaos/:id',cidadaosController.atualizar)
router.delete('/cidadaos/:id',cidadaosController.excluir)
router.get('/cidadaos/filtrar/:termoBusca',cidadaosController.filtrar)
module.exports=router;