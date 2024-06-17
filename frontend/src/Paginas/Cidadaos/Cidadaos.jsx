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
import CidadaoService from "../../services/CidadaoService";

const cidadaoService = new CidadaoService();

function Cidadaos() {
  const [listaCidadaos, setListaCidadaos] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const handleBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleFiltrar = async () => {
    await listarCidadaos(termoBusca);
  };

  const listarCidadaos = async (termoBusca) => {
    let dados = [];
    if (termoBusca) {
      dados = await cidadaoService.filtrar(termoBusca);
      setListaCidadaos(dados);
    } else {
      dados = await cidadaoService.obterTodos();
      setListaCidadaos(dados);
    }
  };

  useEffect(() => {
    listarCidadaos();
  }, []);

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      await cidadaoService.delete(id);
      await listarCidadaos();
    }
  };

  return (
    <>
      <h2 align="center">
        <FaListAlt /> Cadastro de Cidadãos
      </h2>
      <Container className="mt-2">
        <Card>
          <Card.Body>
            <Row>
              <Col lg="2">
                <Button as={Link} to="/cidadaos/novo" variant="primary">
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
          <Card.Header as="h5">Cidadãos Cadastrados</Card.Header>
          <Card.Body>
            <Table striped bordered hover onChange={handleFiltrar}>
              <thead>
                <tr>
                  <th>#id</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {listaCidadaos.length <= 0
                  ? "Nenhum cidadão para listar"
                  : listaCidadaos.map((cidadao) => (
                      <tr>
                        <td>{cidadao.id}</td>
                        <td>{cidadao.nome}</td>
                        <td>{cidadao.telefone}</td>
                        <td>
                          <Link
                            to={`/cidadaos/${cidadao.id}`}
                            className="btn btn-primary m-1"
                          >
                            {" "}
                            <FaEdit></FaEdit>Editar
                          </Link>
                          <Button
                            className="btn btn-danger"
                            onClick={() => handleExcluir(cidadao.id)}
                          >
                            {" "}
                            <FaTrashAlt></FaTrashAlt>Excluir
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

export default Cidadaos;
