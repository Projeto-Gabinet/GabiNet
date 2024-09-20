import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Button,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";
import { FaArrowLeft, FaCheckCircle, FaRegSave } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import SolicitacaoService from "../../services/SolicitacaoService";
import CidadaoService from "../../services/CidadaoService";
import UsuarioService from "../../services/UsuarioService";
import SecretariaService from "../../services/SecretariaService";

const solicitacaoService = new SolicitacaoService();

function SolicitacaoCadastro() {
  const [validated, setValidated] = useState(false);
  const [cidadao, setCidadao] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [data, setData] = useState("");
  const [assunto, setAssunto] = useState("");
  const [solicitacao, setSolicitacao] = useState("");
  const [secretaria, setSecretaria] = useState(null);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [sucessoMensagem, setSucessoMensagem] = useState("");
  const { idSolicitacao, idCidadao, idUsuario, idSecretaria } = useParams();

  useEffect(() => {
    const obterSolicitacao = async () => {
      const [solicitacao, cidadao, usuario, secretaria] = await Promise.all([
        idSolicitacao
          ? solicitacaoService.obterPorId(solicitacao.id)
          : Promise.resolve(null),
        
        idCidadao
          ? CidadaoService.obterPorId(cidadao.id)
          : Promise.resolve(null),
        idUsuario
          ? UsuarioService.obterPorId(usuario.id)
          : Promise.resolve(null),
        idSecretaria
          ? SecretariaService.obterPorId(secretaria.id)
          : Promise.resolve(null),
      ])
      const dados = await SolicitacaoService.obterPorId(idSolicitacao);
      setCidadao(dados.Cidadao.nome);
      setUsuario(dados.Usuario.nome);
      setAssunto(dados.assunto);
      setData(new Date(moment(dados.data).format("YYYY-MM-DD")));
      setSolicitacao(dados.solicitacao);
      setSecretaria(dados.Secretaria.nome_secretaria);
      setStatus(dados.status);
      
    };

    if (idSolicitacao !== undefined) {
      obterSolicitacao();
    }
  });

  const handleAssuntoChange = (e) => {
    const value = e.target.value;
    setAssunto(value);
    if (value.length === 0 || value.length > 100) {
      setErrors((prev) => ({
        ...prev,
        assunto: "O assunto deve ter entre 1 e 100 caracteres.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, assunto: null }));
    }
  };

  const handleSolicitacaoChange = (e) => {
    const value = e.target.value;
    setSolicitacao(value);
    if (value.length === 0 || value.length > 500) {
      setErrors((prev) => ({
        ...prev,
        solicitacao: "A solicitação deve ter entre 1 e 500 caracteres.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, solicitacao: null }));
    }
  };

  handleSecretariaChange = (e) => {
    const value = e.target.value;
    setSecretaria(value);
    if (value.length === 0 || value.length > 100) {
      setErrors((prev) => ({
        ...prev,
        secretaria: "A secretaria deve ter entre 1 e 100 caracteres.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, secretaria: null }));
    }
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    if (value.length === 0 || value.length > 100) {
      setErrors((prev) => ({
        ...prev,
        status: "O status deve ter entre 1 e 100 caracteres.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, status: null }));
    }
  };


    async function handleSalvar(event) {
    event.preventDefault();
    const form = event.currentTarget;
    let newErrors = {};

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (!assunto) {
      newErrors.assunto = "O assunto não pode estar vazio.";
    } else if (assunto.length > 100) {
      newErrors.assunto = "O assunto não pode ter mais de 100 caracteres.";
    }

    if (!solicitacao) {
      newErrors.solicitacao = "A solicitação não pode estar vazia.";
    } else if (solicitacao.length > 500) {
      newErrors.solicitacao = "A solicitação não pode ter mais de 500 caracteres.";

    }

    if (!secretaria) {
      newErrors.secretaria = "A secretaria não pode estar vazia.";
    } else if (secretaria.length > 100) {
      newErrors.secretaria = "A secretaria não pode ter mais de 100 caracteres.";
    }

    if (!status) {
      newErrors.status = "O status não pode estar vazio.";
    } else if (status.length > 100) {
      newErrors.status = "O status não pode ter mais de 100 caracteres.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const solicitacao = {
        id: 0,
        data: form.data.value,
        assunto: form.assunto.value,
        solicitacao: form.solicitacao.value,
        secretaria: form.secretaria.value,
        status: form.status.value,
      };
       

      if (idSolicitacao === undefined) {
        await SolicitacaoService.adicionar(solicitacao);
        setSucessoMensagem("Solicitação cadastrada com  sucesso!");
      } else {
        await SolicitacaoService.atualizar(idSolicitacao, solicitacao);
        setSucessoMensagem("Solicitação atualizada com  sucesso!");
      }
    }

    setValidated(true);
  }

  return (
    <>
      <Container className="mt-5">
        <Card>
          <Card.Header>
            <Row className="align-items-center">
              <Col className="text-center">
                <h2>Cadastro de Solicitações</h2>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSalvar}>
              <Row>
                <Form.Group as={Col} md="6" controlId="Cidadao">
                  <Form.Label>Nome do Cidadao</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={cidadao.nome}
                    isInvalid={!!errors.nome}
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="Cidadao">
                  <Form.Label>Nome do Usuário</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={usuario.nome}
                    isInvalid={!!errors.nome}
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" controlId="data">
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    defaultValue={data}
                    isInvalid={!!errors.data}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.data}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" controlId="assunto">
                  <Form.Label>Assunto</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={assunto}
                    onChange={handleAssunto}
                    isInvalid={!!errors.assunto}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.assunto}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="solicitacao">
                  <Form.Label>Solicitação</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={solicitacao}
                    onChange={handleSolicitacao}
                    isInvalid={!!errors.solicitacao}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.solicitacao}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" controlId="secretaria">
                  <Form.Label>Secretaria</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={secretaria}
                    onChange={handleSecretaria}
                    isInvalid={!!errors.secretaria}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.secretaria}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={status}
                    onChange={handleStatus}
                    isInvalid={!!errors.status}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              
              <Alert variant="success" show={sucessoMensagem !== ""}>
                {" "}
                <b>
                  <FaCheckCircle></FaCheckCircle>
                </b>{" "}
                {sucessoMensagem}
              </Alert>
              <Button type="submit" variant="success m-1">
                {" "}
                <FaRegSave></FaRegSave> Salvar
              </Button>
              <Button variant="secondary" as={Link} to="/funcionarios">
                {" "}
                <FaArrowLeft></FaArrowLeft> Voltar
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center">
            <small className="text-muted">GabiNet © 2024</small>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}

export default FuncionariosCadastro;
