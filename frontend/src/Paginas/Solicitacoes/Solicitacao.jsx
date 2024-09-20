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
import SolicitacaoService from "../../services/SolicitacaoService";

const solicitacaoService = new SolicitacaoService();

function solicitacao() {
  const [listaSolicitacoes, setlistaSolicitacoes] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const handleBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleFiltrar = async () => {
    await listarSolicitacoes(termoBusca);
  };

  const listarSolicitacoes = async (termoBusca) => {
    let dados = [];
    if (termoBusca) {
      dados = await SolicitacaoService.filtrar(termoBusca);
      setlistaSolicitacoes(dados);
    } else {
      dados = await SolicitacaoService.obterTodos();
      setlistaSolicitacoes(dados);
    }
  };


  useEffect(() => {
    listarSolicitacoes();
  }, []);



  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await SolicitacaoService.delete(id);
        await listarSolicitacoes();
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
                <Button as={Link} to="/solicitacao/novo" variant="primary">
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
          <Card.Header as="h5">Solicitações Cadastradas</Card.Header>
          <Card.Body>
            <Table striped bordered hover onChange={handleFiltrar}>
              <thead>
                <tr>
                  <th>#id</th>
                  <th>Cidadao</th>
                  <th>Assunto</th>
                  <th>Andamento</th>
                </tr>
              </thead>
              <tbody>
                {listaSolicitacoes.length <= 0
                  ? "Nenhum funcionário para listar"
                  : listaSolicitacoes.map((Solicitacao) => (
                      <tr>
                        <td>{Solicitacao.id}</td>
                        <td>{Solicitacao.cidadao}</td>
                        <td>{Solicitacao.assunto}</td>
                        <td>{Solicitacao.status}</td>
                        <td>
                          <Link
                            to={`/solicitacao/${Solicitacao.id}`}
                            className="btn btn-primary m-1"
                          >
                            {" "}
                            <FaEdit></FaEdit> Editar
                          </Link>
                          <Button
                            className="btn btn-danger"
                            onClick={() => handleExcluir(Solicitacao.id)}
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

export default solicitacao;
