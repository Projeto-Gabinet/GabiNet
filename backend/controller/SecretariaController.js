const SecretariaModel = require("../model/entidades/SecretariaModel");

const secretariaModel = new SecretariaModel();

class SecretariaController {
  async obterTodos(req, res) {
    try {
      const secretarias = await secretariaModel.obterTodos();
      return res.status(200).json(secretarias);
    } catch (error) {
      console.error("Erro ao obter todas as secretarias:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async obterPorId(req, res) {
    try {
      const id = req.params.id;
      const secretaria = await secretariaModel.obterPorId(id);
      return res.status(200).json(secretaria);
    } catch (error) {
      console.error("Erro ao obter secretaria por ID:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  async adicionar(req, res) {
    const {
      nome_secretaria,
      secretario,
      cpf,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      email,
      telefone,
    } = req.body;
    const secretaria = new SecretariaModel(
      0,
      nome_secretaria,
      secretario,
      cpf,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      email,
      telefone
    );

    try {
      await secretariaModel.adicionar(secretaria);
      return res
        .status(200)
        .json({ message: "Secretaria adicionada com sucesso!" });
    } catch (error) {
      console.log("Erro ao cadastrar Secretaria:" + error);
      res.status(500).json("Erro ao cadastrar Secretaria");
    }
    console.log(secretaria);
    return res
      .status(201)
      .json({ message: "Secretaria adicionada com sucesso!" });
  }
  async atualizar(req, res) {
    const id = req.params.id;
    const {
      nome_secretaria,
      secretario,
      cpf,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      email,
      telefone,
    } = req.body;

    const Secretaria = new SecretariaModel(
      id,
      nome_secretaria,
      secretario,
      cpf,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      email,
      telefone
    );

    try {
      await Secretaria.atualizar(id, Secretaria);
      return res.status(201).json({ message: "Atualização com sucesso" });
    } catch (error) {
      console.log("Erro ao atualizar Secretaria:" + error);
      res.status(500).json({ error: "Erro ao atualizar Secretaria" });
    }
  }
  async excluir(req, res) {
    const id = req.params.id;
    try {
      await secretariaModel.delete(id);
      res.status(200).json({ message: "Item removido" });
    } catch (error) {
      console.log("Erro ao tentar excluir Secretaria", error);
      res.status(500).json({ error: "Erro ao tentar excluir Secretaria" });
    }
  }

  async filtrar(req,res){
    const termoBusca =req.params.termoBusca;
    const secretarias = await secretariaModel.filtrar(termoBusca);
    return res.status(200).json(secretarias); 
  }
}

module.exports = SecretariaController;
