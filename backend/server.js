require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { verifyRole } = require('./middleware/authMiddleware');

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

app.use('/users', userRoutes); // Corrigido o caminho da rota

app.use('/solicitacao', verifyRole("assessor")  , solicitacaoRoutes); // Adicionado caminho para a rota de solicitações
app.use('/cidadao', verifyRole("assessor"), cidadaoRoutes); // Adicionado caminho para a rota de cidadãos
app.use('/funcionario', verifyRole("assessor"), funcionarioRoutes); // Adicionado caminho para a rota de funcionários
app.use('/secretaria', verifyRole("assessor"), secretariaRoutes); // Adicionado caminho para a rota de secretarias

app.listen(port, () => {
  console.log(`Executando na porta ${port}!`);
});
