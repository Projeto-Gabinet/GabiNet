require('dotenv').config();
const express = require('express')
const cors = require('cors')

/** ROTAS **/ 
const cidadaoRoutes = require('./routes/CidadaoRoutes.js');
const funcionarioRoutes = require('./routes/FuncionarioRoutes.js');
const secretariaRoutes = require('./routes/SecretariaRoutes.js');
const userRoutes = require('./routes/userRoutes.js')
const authRoutes = require('./routes/rotaAutenticacao.js')

const app =express();
const port =3000;
app.use(cors())
app.use(express.json())

app.use('.api/user', userRoutes)

app.use(authRoutes)

app.use(cidadaoRoutes);

app.use(funcionarioRoutes);

app.use(secretariaRoutes);

app.listen(port,()=>`Executando na porta ${port}!`);
