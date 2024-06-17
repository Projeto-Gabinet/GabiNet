const DataBase = require("../DataBase");

const database = new DataBase();
class CidadaoModel {
  constructor(
    id,
    nome,
    data_nasc,
    rg,
    cpf,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    estado,
    email,
    telefone
  ) {
    this.id = id;
    this.nome = nome;
    this.data_nasc = data_nasc;
    this.rg = rg;
    this.cpf = cpf;
    this.cep = cep;
    this.endereco = endereco;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.email = email;
    this.telefone = telefone;
  }
  async obterTodos() {
    const listaCidadao = await database.ExecutaComando(
      "select * from cidadao order by nome;"
    );
    return listaCidadao;
  }

  async obterPorId(id) {
    const result = await database.ExecutaComando(
      "select * from cidadao where id=? ",
      [id]
    );
    return result[0];
  }

  async adicionar(dadosCidadao) {
    console.log("dadosCidadao", dadosCidadao);
    await database.ExecutaComandoNonQuery(
      "insert into cidadao set ?",
      dadosCidadao
    );
  }

  async atualizar(id, dadosCidadao) {
    await database.ExecutaComandoNonQuery("update cidadao set ? where id = ?", [
      dadosCidadao,
      id,
    ]);
  }

  async delete(id) {
    await database.ExecutaComandoNonQuery("delete from cidadao where id = ?", [
      id,
    ]);
  }

  async filtrar(termoBusca) {
    const cidadaos = await database.ExecutaComando(
      "select * from cidadao where nome like ?",
      [`%${termoBusca}%`]
    );
    return cidadaos;
  }
}

module.exports = CidadaoModel;
