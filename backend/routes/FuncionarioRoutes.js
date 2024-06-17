const FuncionarioController = require('../controller/FuncionarioController');

const funcionarioController = new FuncionarioController();
const express =require('express');
const router =express.Router();
router.get('/funcionarios',funcionarioController.obterTodos)
router.get('/funcionarios/:id',funcionarioController.obterPorId)
router.post('/funcionarios',funcionarioController.adicionar)
router.put('/funcionarios/:id',funcionarioController.atualizar)
router.delete('/funcionarios/:id',funcionarioController.excluir)
router.get('/funcionarios/filtrar/:termoBusca',funcionarioController.filtrar)
module.exports=router;