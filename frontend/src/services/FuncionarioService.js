const API_BASE_URL = "http://localhost:3001";
class FuncionarioService {
  async obterTodos() {
    const response = await fetch(`${API_BASE_URL}/funcionarios`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("ocorreu um erro ao listar");
    } else {
      const dados = await response.json();
      return dados;
    }
  }

  async obterPorId(id) {
    const response = await fetch(`${API_BASE_URL}/funcionarios/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("ocorreu um erro ao listar");
    } else {
      const dados = await response.json();
      return dados;
    }
  }

  async adicionar(funcionariosDados) {
    try {
      const response = await fetch(`${API_BASE_URL}/funcionarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(funcionariosDados),
      });

      if (!response.ok) {
        console.log("ocorreu um erro ao adicionar");
        throw new Error("Erro ao cadastrar funcionarios");
      }
    } catch (error) {
      throw error;
    }
  }

  async atualizar(idfuncionarios, funcionariosDados) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/funcionarios/${idfuncionarios}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(funcionariosDados),
        }
      );

      if (!response.ok) {
        console.log("Ocorreu um erro ao atualizar");
        throw new Error("Erro ao atualizar funcionarios");
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(idfuncionarios) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/funcionarios/${idfuncionarios}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log("Ocorreu um erro ao deletar");
        throw new Error("Erro ao deletar funcionário");
      }
    } catch (error) {
      throw error;
    }
  }
  async filtrar(termoBusca) {
    const response = await fetch(
      `${API_BASE_URL}/funcionarios/filtrar/${termoBusca}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("ocorreu um erro ao listar");
    } else {
      const dados = await response.json();
      return dados;
    }
  }
}

export default FuncionarioService;
