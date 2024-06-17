const API_BASE_URL = "http://localhost:3001";

class SecretariaService {
  async obterTodos() {
    try {
      const response = await fetch(`${API_BASE_URL}/secretarias`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao listar secretarias");
      }

      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao listar secretarias:", error);
      throw error;
    }
  }

  async obterPorId(id) {
    const response = await fetch(`${API_BASE_URL}/secretarias/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Ocorreu um erro ao listar");
    } else {
      const dados = await response.json();
      return dados;
    }
  }

  async adicionar(secretariaDados) {
    try {
      const response = await fetch(`${API_BASE_URL}/secretarias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(secretariaDados),
      });

      if (!response.ok) {
        console.log("Ocorreu um erro ao adicionar");
        throw new Error("Erro ao cadastrar secretarias");
      }
    } catch (error) {
      throw error;
    }
  }

  async atualizar(idSecretaria, secretariaDados) {
    try {
      const response = await fetch(`${API_BASE_URL}/secretarias/${idSecretaria}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(secretariaDados),
        }
      );

      if (!response.ok) {
        console.log("Ocorreu um erro ao atualizar");
        throw new Error("Erro ao atualizar secretarias");
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(idSecretaria) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/secretarias/${idSecretaria}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log("Ocorreu um erro ao deletar");
        throw new Error("Erro ao deletar cidadão");
      }
    } catch (error) {
      throw error;
    }
  }

  async filtrar(termoBusca) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/secretarias/filtrar/${termoBusca}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao filtrar secretarias");
      }

      const dados = await response.json();
      return dados; // Retorna diretamente os dados filtrados
    } catch (error) {
      console.error("Erro ao filtrar secretarias:", error);
      throw error;
    }
  }
}

export default SecretariaService;