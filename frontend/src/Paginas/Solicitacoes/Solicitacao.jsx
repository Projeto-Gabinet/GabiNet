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
import FuncionarioService from "../../services/FuncionarioService";

const funcionarioService = new FuncionarioService();

function Funcionarios() {
  const [listaFuncionarios, setListaFuncionarios] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const handleBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleFiltrar = async () => {
    await listarFuncionarios(termoBusca);
  };

  const listarFuncionarios = async (termoBusca) => {
    let dados = [];
    if (termoBusca) {
      dados = await funcionarioService.filtrar(termoBusca);
      setListaFuncionarios(dados);
    } else {
      dados = await funcionarioService.obterTodos();
      setListaFuncionarios(dados);
    }
  };


  useEffect(() => {
    listarFuncionarios();
  }, []);



  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await funcionarioService.delete(id);
        await listarFuncionarios();
      } catch (error) {
        console.error("Erro ao excluir cidadão:", error);
      }
    }
  };

  return (
    <>
      <h2 align="center">
        <FaListAlt /> Cadastro de Funcionários
      </h2>
      <Container className="mt-2">
        <Card>
          <Card.Body>
            <Row>
              <Col lg="2">
                <Button as={Link} to="/funcionarios/novo" variant="primary">
                  <FaPlus /> Adicionar
                </Button>
              </Col>

              <Col lg="6">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    onChange={handleBuscaChange}
                    placeholder="Pesquisar..."
                  />
                </Form.Group>
              </Col>

              <Col lg="2">
                <Button onClick={handleFiltrar} variant="secondary">
                  <FaSearch /> Pesquisar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mt-2">
        <Card>
          <Card.Header as="h5">Funcionários Cadastrados</Card.Header>
          <Card.Body>
            <Table striped bordered hover onChange={handleFiltrar}>
              <thead>
                <tr>
                  <th>#id</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Partido</th>
                </tr>
              </thead>
              <tbody>
                {listaFuncionarios.length <= 0
                  ? "Nenhum funcionário para listar"
                  : listaFuncionarios.map((funcionario) => (
                      <tr>
                        <td>{funcionario.id}</td>
                        <td>{funcionario.nome}</td>
                        <td>{funcionario.telefone}</td>
                        <td>{funcionario.partido}</td>
                        <td>
                          <Link
                            to={`/funcionarios/${funcionario.id}`}
                            className="btn btn-primary m-1"
                          >
                            {" "}
                            <FaEdit></FaEdit> Editar
                          </Link>
                          <Button
                            className="btn btn-danger"
                            onClick={() => handleExcluir(funcionario.id)}
                          >
                            {" "}
                            <FaTrashAlt></FaTrashAlt> Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Funcionarios;
