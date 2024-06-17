const express =require('express')
const cors =require('cors')


/** ROTAS **/ 
const cidadaoRoutes = require('./routes/CidadaoRoutes');
const funcionarioRoutes = require('./routes/FuncionarioRoutes');
const secretariaRoutes = require('./routes/SecretariaRoutes');
const app =express();
const port =3001;
app.use(cors())
app.use(express.json())
app.use(cidadaoRoutes);

app.use(funcionarioRoutes);

app.use(secretariaRoutes);

app.listen(port,()=>`Executando na porta ${port}!`);
