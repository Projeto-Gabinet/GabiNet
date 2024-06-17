const DataBase = require("../DataBase");

const database = new DataBase();
class FuncionarioModel{
    constructor(id, nome, data_nasc, cpf, cep, endereco, numero, bairro, cidade, estado, partido, cargo, email, telefone){
        this.id = id;
        this.nome = nome;
        this.data_nasc = data_nasc;
        this.cpf = cpf;
        this.cep = cep;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.partido = partido;
        this.cargo = cargo;
        this.email = email;
        this.telefone = telefone;

    } 
    async obterTodos(){
        const listaFuncionario=  await  database.ExecutaComando('SELECT * FROM funcionario ORDER BY nome;');
       return listaFuncionario; 
     }

     async obterPorId(id) {
      const result = await database.ExecutaComando('SELECT * FROM funcionario WHERE id = ?', [id]);
      return result[0];
    }
    async adicionar (dadosFuncionario){
        await database.ExecutaComandoNonQuery('insert into funcionario set ?',dadosFuncionario)
      }

      async atualizar (id,dadosFuncionario){
        await database.ExecutaComandoNonQuery('update funcionario set ? where id= ?',[dadosFuncionario, id])

    }
    async delete (id){
      await database.ExecutaComandoNonQuery('delete from funcionario where id=?',[id])
    }


    async filtrar(termoBusca) {
      const funcionarios = await database.ExecutaComando("select * from funcionario where nome like ?", [`%${termoBusca}%`]);
      return funcionarios;
    }
  }
      
module.exports = FuncionarioModel;