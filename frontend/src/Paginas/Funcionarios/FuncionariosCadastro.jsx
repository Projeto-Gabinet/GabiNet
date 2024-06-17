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
import FuncionarioService from "../../services/FuncionarioService";
import validator from "validator";
import moment from "moment";

const funcionarioService = new FuncionarioService();

function FuncionariosCadastro() {
  const [validated, setValidated] = useState(false);
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [partido, setPartido] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [errors, setErrors] = useState({});
  const [sucessoMensagem, setSucessoMensagem] = useState("");
  const { idFuncionario } = useParams();

  useEffect(() => {
    const obterFuncionario = async () => {
      const dados = await funcionarioService.obterPorId(idFuncionario);
      setNome(dados.nome);
      setDataNasc(new Date(moment(dados.dataNasc).format("YYYY-MM-DD")));
      setCpf(dados.cpf);
      setCep(dados.cep);
      setEndereco(dados.endereco);
      setNumero(dados.numero);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setPartido(dados.partido);
      setCargo(dados.cargo);
      setEmail(dados.email);
      setTelefone(dados.telefone);
    };

    if (idFuncionario !== undefined) {
      obterFuncionario();
    }
  });
  const handleNomeChange = (e) => {
    const value = e.target.value;
    setNome(value);
    if (value.length === 0 || value.length > 100) {
      setErrors((prev) => ({
        ...prev,
        nome: "O nome deve ter entre 1 e 100 caracteres.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, nome: null }));
    }
  };

  const handleDataNascChange = (e) => {
    const value = e.target.value;
    setDataNasc(value);
    if (new Date(value) >= new Date()) {
      setErrors((prev) => ({
        ...prev,
        dataNasc: "A data de nascimento não pode ser futura.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, dataNasc: null }));
    }
  };
  

  const handleCpfChange = (e) => {
    let value = e.target.value;

    let maskedValue = value.replace(/\D/g, "");
    if (maskedValue.length > 0) {
      maskedValue =
        maskedValue.slice(0, 3) +
        "." +
        maskedValue.slice(3, 6) +
        "." +
        maskedValue.slice(6, 9) +
        "-" +
        maskedValue.slice(9, 11);
    }

    setCpf(maskedValue);

    if (maskedValue.length !== 14) {
      setErrors((prev) => ({
        ...prev,
        cpf: "CPF inválido. Deve ter 14 caracteres.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, cpf: null }));
    }
  };

  const handleCepChange = async (e) => {
    const value = e.target.value;
    setCep(value);

    if (value.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();

        if (!response.ok) {
          setErrors((prev) => ({
            ...prev,
            cep: "Erro ao buscar informações do CEP.",
          }));
          setEndereco("");
          setCidade("");
          setBairro("");
          setEstado("");
        } else {
          setEndereco(data.logradouro);
          setCidade(data.localidade);
          setBairro(data.bairro);
          setEstado(data.uf);
          setErrors((prev) => ({ ...prev, cep: null }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          cep: "Erro ao buscar informações do CEP.",
        }));
        setEndereco("");
        setCidade("");
        setBairro("");
        setEstado("");
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        cep: "CEP inválido. Deve ter 8 caracteres.",
      }));
      setEndereco("");
      setCidade("");
      setBairro("");
      setEstado("");
    }
  };
  const handleEnderecoChange = (e) => {
    const value = e.target.value;
    setEndereco(value);
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        endereco: "O endereço não pode ser vazio.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, endereco: null }));
    }
  };

  const handleNumeroChange = (e) => {
    const value = e.target.value;
    setNumero(value);
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        numero: "O número não pode ser vazio.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, numero: null }));
    }
  };

  const handleBairroChange = (e) => {
    const value = e.target.value;
    setBairro(value);
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        bairro: "O bairro não pode ser vazio.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, bairro: null }));
    }
  };

  const handleCidadeChange = (e) => {
    const value = e.target.value;
    setCidade(value);
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        cidade: "A cidade não pode ser vazia.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, cidade: null }));
    }
  };


  const handleEstadoChange = (e) => {
    const value = e.target.value;
    setEstado(value);
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        estado: "O estado não pode ser vazio.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, estado: null }));
    }
  };

  const handlePartidoChange = (e) => {
    const value = e.target.value;
    setPartido(value);
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        partido: "O partido não pode ser vazio.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, partido: null }));
    }
  };

  const handleCargoChange = (e) => {
    const value = e.target.value;
    setCargo(value);
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, cargo: "O cargo não pode ser vazio." }));
    } else {
      setErrors((prev) => ({ ...prev, cargo: null }));
    }
  };


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        email: "O email não pode estar vazio.",
      }));
    } else if (!validator.isEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Email inválido." }));
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  };


  const handleTelefoneChange = (e) => {
    let value = e.target.value;

    let maskedValue = value.replace(/\D/g, "");
    if (maskedValue.length > 0) {
      maskedValue = `(${maskedValue.slice(0, 2)}) ${maskedValue.slice(
        2,
        7
      )}-${maskedValue.slice(7, 15)}`;
    }

    setTelefone(maskedValue);

    if (maskedValue.length !== 15) {
      setErrors((prev) => ({
        ...prev,
        telefone: "Telefone inválido. Deve ter 10 ou 11 dígitos.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, telefone: null }));
    }
  };

    async function handleSalvar(event) {
    event.preventDefault();
    const form = event.currentTarget;
    let newErrors = {};

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (!nome) {
      newErrors.nome = "O nome não pode estar vazio.";
    } else if (nome.length > 100) {
      newErrors.nome = "O nome não pode ter mais de 100 caracteres.";
    }

    if (!dataNasc) {
      newErrors.dataNasc = "A data de nasciment não pode ser vazia";
    } else if (new Date(dataNasc) > new Date()) {
      newErrors.dataNascimento =
        "Não é permitido informar uma data de nascimento posterior a data atual.";
    }

    if (!cpf) {
      newErrors.cpf = "O CPF não pode estar vazio.";
    } else if (cpf.length > 15) {
      newErrors.cpf = "O CPF não pode ter mais de 15 caracteres.";
    }

    if (!cep) {
      newErrors.cep = "O CEP não pode estar vazio.";
    } else if (cep.length > 8) {
      newErrors.cep = "O CEP não pode ter mais de 8 caracteres.";
    }

    if (!endereco) {
      newErrors.endereco = "O endereço não pode estar vazio.";
    } else if (endereco.length > 100) {
      newErrors.endereco = "O endereço não pode ter mais de 100 caracteres.";
    }

    if (!numero) {
      newErrors.numero = "O número não pode estar vazio.";
    } else if (numero.length > 10) {
      newErrors.numero = "O número não pode ter mais de 10 caracteres.";
    }

    if (!bairro) {
      newErrors.bairro = "O bairro não pode estar vazio.";
    } else if (bairro.length > 100) {
      newErrors.bairro = "O bairro não pode ter mais de 100 caracteres.";
    }

    if (!cidade) {
      newErrors.cidade = "A cidade não pode estar vazia.";
    } else if (cidade.length > 100) {
      newErrors.cidade = "A cidade não pode ter mais de 100 caracteres.";
    }

    if (!estado) {
      newErrors.estado = "O estado não pode estar vazio.";
    } else if (estado.length > 2) {
      newErrors.estado = "O estado não pode ter mais de 2 caracteres.";
    }

    if (!cargo) {
      newErrors.cargo = "O cargo não pode estar vazio.";
    } else if (cargo.length > 40) {
      newErrors.cargo = "O cargo não pode ter mais de 40 caracteres.";
    }

    if (!partido) {
      newErrors.partido = "O partido não pode estar vazio.";
    } else if (partido.length > 40) {
      newErrors.partido = "O partido não pode ter mais de 40 caracteres.";
    }

    if (!email) {
      newErrors.email = "O email não pode estar vazio.";
    } else if (!validator.isEmail(email)) {
      newErrors.email = "Email inválido.";
    }

    if (!telefone) {
      newErrors.telefone = "O telefone não pode estar vazio.";
    } else if (telefone.length > 15) {
      newErrors.telefone = "O telefone não pode ter mais de 15 dígitos.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const funcionario = {
        id: 0,
        nome: form.nome.value,
        dataNasc: form.dataNasc.value,
        cpf: form.cpf.value,
        cep: form.cep.value,
        endereco: form.endereco.value,
        numero: form.numero.value,
        bairro: form.bairro.value,
        cidade: form.cidade.value,
        estado: form.estado.value,
        partido: form.partido.value,
        cargo: form.cargo.value,
        email: form.email.value,
        telefone: form.telefone.value,
      };

      if (idFuncionario === undefined) {
        await funcionarioService.adicionar(funcionario);
        setSucessoMensagem("Funcionário cadastrado com  sucesso!");
      } else {
        await funcionarioService.atualizar(idFuncionario, funcionario);
        setSucessoMensagem("Funcionário atualizado com  sucesso!");
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
                <h2>Cadastro de Funcionários</h2>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSalvar}>
              <Row>
                <Form.Group as={Col} md="6" controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={nome}
                    onChange={handleNomeChange}
                    isInvalid={!!errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="dataNasc">
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    defaultValue={dataNasc}
                    isInvalid={!!errors.dataNasc}
                    onChange={handleDataNascChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataNasc}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" controlId="cpf">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={cpf}
                    isInvalid={!!errors.cpf}
                    onChange={handleCpfChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cpf}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="cep">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={cep}
                    isInvalid={!!errors.cep}
                    onChange={handleCepChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cep}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="endereco">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={endereco}
                    isInvalid={!!errors.endereco}
                    onChange={handleEnderecoChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endereco}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="numero">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={numero}
                    isInvalid={!!errors.numero}
                    onChange={handleNumeroChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.numero}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" controlId="bairro">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={bairro}
                    isInvalid={!!errors.bairro}
                    onChange={handleBairroChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.bairro}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="cidade">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={cidade}
                    isInvalid={!!errors.cidade}
                    onChange={handleCidadeChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cidade}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={estado}
                    isInvalid={!!errors.estado}
                    onChange={handleEstadoChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.estado}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="partido">
                  <Form.Label>Partido</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={partido}
                    isInvalid={!!errors.partido}
                    onChange={handlePartidoChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.partido}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="cargo">
                  <Form.Label>Cargo</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={cargo}
                    isInvalid={!!errors.cargo}
                    onChange={handleCargoChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cargo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    defaultValue={email}
                    isInvalid={!!errors.email}
                    onChange={handleEmailChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="telefone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={telefone}
                    isInvalid={!!errors.telefone}
                    onChange={handleTelefoneChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telefone}
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
