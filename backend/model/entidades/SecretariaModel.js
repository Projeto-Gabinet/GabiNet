const DataBase = require("../DataBase");

const database = new DataBase();
class secretariaModel {
  constructor(
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
  ) {
    this.id = id;
    this.nome_secretaria = nome_secretaria;
    this.secretario = secretario;
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
    const listaSecretaria = await database.ExecutaComando(
      "SELECT * FROM secretaria ORDER BY nome_secretaria;"
    );
    return listaSecretaria;
  }

  async obterPorId(id) {
    const result = await database.ExecutaComando(
      "SELECT * FROM secretaria WHERE id=? ",
      [id]
    );
    return result[0];
  }

  async adicionar(dadosSecretaria) {
    await database.ExecutaComandoNonQuery(
      "INSERT INTO secretaria SET ?",
      dadosSecretaria
    );
  }

  async atualizar(idSecretaria, dadosSecretaria) {
    await database.ExecutaComandoNonQuery(
      'update secretaria set ? where id=?',
      [dadosSecretaria, idSecretaria]
    );
  }
  async delete(id) {
    await database.ExecutaComandoNonQuery("delete from secretaria where id=?", [
      id,
    ]);
  }

  async filtrar(termoBusca) {
    const secretarias = await database.ExecutaComando(`select * from secretaria where nome_secretaria like "%${termoBusca}%"`);
    return secretarias;
  }
}

module.exports = secretariaModel;
