const API_BASE_URL = "http://localhost:4000";

class SolicitacaoService {
  async obterTodos() {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitacao`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao listar Solicitações");
      }

      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao listar Solicitações:", error);
      throw error;
    }
  }

  async obterPorId(id) {
    const response = await fetch(`${API_BASE_URL}/solicitacao/${id}`, {
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

  async adicionar(SolicitacaoDados) {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitacao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SolicitacaoDados),
      });

      if (!response.ok) {
        console.log("Ocorreu um erro ao adicionar");
        throw new Error("Erro ao cadastrar Solicitacao");
      }
    } catch (error) {
      throw error;
    }
  }

  async atualizar(idSolicitacao, SolicitacaoDados) {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitacao/${idSolicitacao}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(SolicitacaoDados),
        }
      );

      if (!response.ok) {
        console.log("Ocorreu um erro ao atualizar");
        throw new Error("Erro ao atualizar Solicitacaos");
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(idSolicitacao) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/solicitacao/${idSolicitacao}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log("Ocorreu um erro ao deletar");
        throw new Error("Erro ao deletar solicitação");
      }
    } catch (error) {
      throw error;
    }
  }

  async filtrar(termoBusca) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/Solicitacaos/filtrar/${termoBusca}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao filtrar Solicitações");
      }

      const dados = await response.json();
      return dados; // Retorna diretamente os dados filtrados
    } catch (error) {
      console.error("Erro ao filtrar Solicitações:", error);
      throw error;
    }
  }
}

export default SolicitacaoService;