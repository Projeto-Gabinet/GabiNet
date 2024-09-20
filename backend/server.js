require('dotenv').config();
const express = require('express');
const cors = require('cors');

/** ROTAS **/
const cidadaoRoutes = require('./routes/CidadaoRoutes.js');
const funcionarioRoutes = require('./routes/FuncionarioRoutes.js');
const secretariaRoutes = require('./routes/SecretariaRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const solicitacaoRoutes = require('./routes/SolicitacaoRoutes.js');  

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes); // Corrigido o caminho da rota

app.use('/api/solicitacao', solicitacaoRoutes); // Adicionado caminho para a rota de solicitações
app.use('/api/cidadao', cidadaoRoutes); // Adicionado caminho para a rota de cidadãos
app.use('/api/funcionario', funcionarioRoutes); // Adicionado caminho para a rota de funcionários
app.use('/api/secretaria', secretariaRoutes); // Adicionado caminho para a rota de secretarias

app.listen(port, () => {
  console.log(`Executando na porta ${port}!`);
});
