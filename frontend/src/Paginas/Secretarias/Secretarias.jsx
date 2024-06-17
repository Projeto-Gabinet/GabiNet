import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import {
  FaListAlt,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SecretariaService from "../../services/SecretariaService";

const secretariaService = new SecretariaService();

function SecretariasTable({ secretarias, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#id</th>
          <th>Nome_Secretaria</th>
          <th>Secretario</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {secretarias.length <= 0 ? (
          <tr>
            <td colSpan={4}>Nenhuma secretaria para listar</td>
          </tr>
        ) : (
          secretarias.map((secretaria) => (
            <tr key={secretaria.id}>
              <td>{secretaria.id}</td>
              <td>{secretaria.nome_secretaria}</td>
              <td>{secretaria.secretario}</td>
              <td>
                <Link
                  to={`/secretarias/${secretaria.id}`}
                  className="btn btn-primary m-1"
                >
                  <FaEdit /> Editar
                </Link>
                <Button
                  className="btn btn-danger"
                  onClick={() => onDelete(secretaria.id)}
                >
                  <FaTrashAlt /> Excluir
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

function SecretariasPage() {
  const [listaSecretarias, setListaSecretarias] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    listarSecretarias();
  }, []);

  const handleBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleFiltrar = async () => {
    console.log("Filtrando com termo:", termoBusca);
    setIsLoading(true);
    try {
      const dados = await secretariaService.filtrar(termoBusca);
      console.log("Dados filtrados:", dados);
      setListaSecretarias(dados);
    } catch (error) {
      console.error("Erro ao filtrar secretarias:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const listarSecretarias = async () => {
    setIsLoading(true);
    try {
      const dados = await secretariaService.obterTodos();
      console.log("Todos os dados:", dados);
      setListaSecretarias(dados);
    } catch (error) {
      console.error("Erro ao listar secretarias:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      setIsLoading(true);
      try {
        await secretariaService.delete(id);
        await listarSecretarias();
      } catch (error) {
        console.error("Erro ao excluir secretaria:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <h2 align="center">
        <FaListAlt /> Cadastro de Secretarias
      </h2>
      <Container className="mt-2">
        <Card>
          <Card.Body>
            <Row>
              <Col lg="2">
                <Button as={Link} to="/secretarias/novo" variant="primary">
                  <FaPlus /> Adicionar
                </Button>
              </Col>

              <Col lg="6">
                <Form.Group className="mb-3">
                  <Form.Control
                    value={termoBusca}
                    type="text"
                    placeholder="Pesquisar..."
                    onChange={handleBuscaChange}
                  />
                </Form.Group>
              </Col>

              <Col lg="2">
                <Button
                  onClick={handleFiltrar}
                  variant="secondary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                      Carregando...
                    </>
                  ) : (
                    <>
                      <FaSearch /> Pesquisar
                    </>
                  )}
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mt-2">
        <Card>
          <Card.Header as="h5">Secretarias Cadastradas</Card.Header>
          <Card.Body>
            <SecretariasTable secretarias={listaSecretarias} onDelete={handleExcluir} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default SecretariasPage;