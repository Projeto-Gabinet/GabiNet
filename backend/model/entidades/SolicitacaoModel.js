const DataBase = require("../DataBase");

const database = new DataBase();
class SolicitacaoModel {
  constructor(
    id,
    id_cidadao,
    id_usuario,
    data,
    assunto,
    solicitacao,
    id_secretaria,
    status
  ) {
    this.id = id;
    this.id_cidadao = id_cidadao;
    this.id_usuario = id_usuario;
    this.data = data;
    this.assunto = assunto;
    this.solicitacao = solicitacao;
    this.id_secretaria = id_secretaria;
    this.status = status;
  }
  async obterTodos() {
    const listaSolicitacoes = await database.ExecutaComando(
      "select * from solicitacao order by id;"
    );
    return listaSolicitacoes;
  }

  async obterPorId(id) {
    const result = await database.ExecutaComando(
      "select * from solicitacao where id=? ",
      [id]
    );
    return result[0];
  }

async adicionar(dadosSolicitacao) {
console.log("dadosSolicitacao", dadosSolicitacao);
    await database.ExecutaComandoNonQuery(
      "insert into solicitacao set ?",
    dadosSolicitacao
    );
  }

async atualizar(id, dadosSolicitacao) {
    await database.ExecutaComandoNonQuery("update solicitacao set ? where id = ?", [
    dadosSolicitacao,
      id,
    ]);
  }

  async delete(id) {
    await database.ExecutaComandoNonQuery("delete from solicitacao where id = ?", [
      id,
    ]);
  }

  async filtrar(termoBusca) {
    const solicitacao = await database.ExecutaComando(
      "select * from solicitacao where nome like ?",
      [`%${termoBusca}%`]
    );
    return solicitacao;
  }
}

module.exports = SolicitacaoModel;
