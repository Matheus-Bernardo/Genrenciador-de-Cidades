
import express from 'express';
import db from './models/index.js';
import clienteRoutes from './routes/clienteRoute.js';
import filmeRoutes from './routes/filmeRoute.js';
import aluguelRoutes from './routes/aluguelRoute.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(express.json());


// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/clientes', clienteRoutes);
app.use('/filmes', filmeRoutes);
app.use('/alugueis', aluguelRoutes);

// Conexão com banco
db.sequelize.authenticate()
  .then(() => console.log('Conectado ao banco com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
