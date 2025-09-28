// Testes extras para garantir integração entre controllers
import clienteController from './controllers/clienteController.js';
import * as filmeController from './controllers/filmeController.js';
import * as aluguelController from './controllers/aluguelController.js';
import db from './models/index.js';

jest.mock('./models/index.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Integração Controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('criar cliente, filme e aluguel', async () => {
    db.Cliente.create.mockResolvedValue({ id: 1, nome: 'Matheus' });
    db.Filme.create.mockResolvedValue({ id: 1, titulo: 'Matrix' });
    db.Aluguel.create.mockResolvedValue({ id: 1, clienteId: 1, filmeId: 1 });
    db.Aluguel.findByPk.mockResolvedValue({ id: 1, clienteId: 1, filmeId: 1, Cliente: { id: 1, nome: 'Matheus' }, Filme: { id: 1, titulo: 'Matrix' } });

    const reqCliente = { body: { nome: 'Matheus' } };
    const reqFilme = { body: { titulo: 'Matrix' } };
    const reqAluguel = { body: { clienteId: 1, filmeId: 1 } };
    const res = mockRes();

    await clienteController.criar(reqCliente, res);
    await filmeController.criarFilme(reqFilme, res);
    await aluguelController.criarAluguel(reqAluguel, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, clienteId: 1, filmeId: 1, Cliente: { id: 1, nome: 'Matheus' }, Filme: { id: 1, titulo: 'Matrix' } });
  });

  test('listar todos os clientes, filmes e aluguéis', async () => {
    db.Cliente.findAll.mockResolvedValue([{ id: 1, nome: 'Matheus' }]);
    db.Filme.findAll.mockResolvedValue([{ id: 1, titulo: 'Matrix' }]);
    db.Aluguel.findAll.mockResolvedValue([{ id: 1, clienteId: 1, filmeId: 1 }]);
    const res = mockRes();
    await clienteController.listar({}, res);
    await filmeController.listarFilmes({}, res);
    await aluguelController.listarAlugueis({}, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, clienteId: 1, filmeId: 1 }]);
  });
});
