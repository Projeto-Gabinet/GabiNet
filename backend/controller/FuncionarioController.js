const FuncionarioModel = require("../model/entidades/FuncionarioModel");

const funcionarioModel = new FuncionarioModel();

class FuncionarioController {
  async obterTodos(req, res) {
    const funcionario = await funcionarioModel.obterTodos();
    return res.status(200).json(funcionario);
  }
  async obterPorId(req, res) {
    const id = req.params.id;
    const funcionario = await funcionarioModel.obterPorId(id);
    return res.status(200).json(funcionario);
  }

  async adicionar(req, res) {
    const {
      nome,
      dataNasc,
      cpf,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      partido,
      cargo,
      email,
      telefone,
    } = req.body;
    const funcionario = new FuncionarioModel(
      0,
      nome,
      dataNasc,
      cpf,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      partido,
      cargo,
      email,
      telefone
    );

    try {
      await funcionarioModel.adicionar(funcionario);
      return res
        .status(200)
        .json({ message: "Funcionario adicionado com sucesso!" });
    } catch (error) {
      console.log("Erro ao cadastrar Funcionario:" + error);
      res.status(500).json("Erro ao cadastrar Funcionario");
    }
    console.log(funcionario);
    return res
      .status(201)
      .json({ message: "Funcionario adicionado com sucesso!" });
  }
  async atualizar(req, res) {
    const id = req.params.id;
    const {
      nome,
      dataNasc,
      cpf,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      partido,
      cargo,
      email,
      telefone,
    } = req.body;
    const funcionario = new FuncionarioModel(
      id,
      nome,
      dataNasc,
      cpf,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      partido,
      cargo,
      email,
      telefone
    );

    try {
      await funcionario.atualizar(id, funcionario);
      return res.status(201).json({ message: "Atualização com successo" });
    } catch (error) {
      console.log("Erro ao cadastrar funcionario:" + error);
      res.status(500).json({ error: "Erro ao atualizar funcionario" });
    }
  }
  async excluir(req, res) {
    const id = req.params.id;
    try {
      await funcionarioModel.delete(id);
      res.status(200).json({ message: "Item removido" });
    } catch (error) {
      console.log("Erro ao tentar excluir cidadao", error);
      res.status(500).json({ error: "Erro ao tentar excluir funcionario" });
    }
  }

  async filtrar(req, res) {
    const termoBusca = req.params.termoBusca;
    const funcionarios = await funcionarioModel.filtrar(termoBusca);
    return res.status(200).json(funcionarios);
  }
}

module.exports = FuncionarioController;
