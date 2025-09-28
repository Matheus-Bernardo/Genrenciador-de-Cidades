import * as aluguelController from './controllers/aluguelController.js';
import db from './models/index.js';

jest.mock('./models/index.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Aluguel Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('listarAlugueis retorna aluguéis', async () => {
    db.Aluguel.findAll.mockResolvedValue([{ id: 1, status: 'ativo' }]);
    const res = mockRes();
    await aluguelController.listarAlugueis({}, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, status: 'ativo' }]);
  });

  test('listarAlugueis erro', async () => {
    db.Aluguel.findAll.mockRejectedValue(new Error('erro'));
    const res = mockRes();
    await aluguelController.listarAlugueis({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'erro' });
  });

  test('criarAluguel sucesso', async () => {
    db.Aluguel.create.mockResolvedValue({ id: 1, status: 'ativo' });
    db.Aluguel.findByPk.mockResolvedValue({ id: 1, status: 'ativo', Cliente: {}, Filme: {} });
    const req = { body: { clienteId: 1, filmeId: 1 } };
    const res = mockRes();
    await aluguelController.criarAluguel(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, status: 'ativo', Cliente: {}, Filme: {} });
  });

  test('criarAluguel erro', async () => {
    db.Aluguel.create.mockRejectedValue(new Error('erro'));
    const req = { body: { clienteId: 1, filmeId: 1 } };
    const res = mockRes();
    await aluguelController.criarAluguel(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'erro' });
  });

  // Testes extras para mock de associações
  test('listarAlugueis inclui cliente e filme', async () => {
    db.Aluguel.findAll.mockResolvedValue([{ id: 1, status: 'ativo', Cliente: {}, Filme: {} }]);
    const res = mockRes();
    await aluguelController.listarAlugueis({}, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, status: 'ativo', Cliente: {}, Filme: {} }]);
  });

  // Testes negativos
  test('criarAluguel sem clienteId', async () => {
    const req = { body: { filmeId: 1 } };
    const res = mockRes();
    await aluguelController.criarAluguel(req, res);
    // Não há validação, então não retorna erro
    expect(res.status).not.toHaveBeenCalledWith(400);
  });

  test('criarAluguel sem filmeId', async () => {
    const req = { body: { clienteId: 1 } };
    const res = mockRes();
    await aluguelController.criarAluguel(req, res);
    // Não há validação, então não retorna erro
    expect(res.status).not.toHaveBeenCalledWith(400);
  });

  test('listarAlugueis retorna array vazio', async () => {
    db.Aluguel.findAll.mockResolvedValue([]);
    const res = mockRes();
    await aluguelController.listarAlugueis({}, res);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  test('criarAluguel retorna objeto com campos esperados', async () => {
    db.Aluguel.create.mockResolvedValue({ id: 2, status: 'ativo', clienteId: 1, filmeId: 1 });
    db.Aluguel.findByPk.mockResolvedValue({ id: 2, status: 'ativo', clienteId: 1, filmeId: 1, Cliente: {}, Filme: {} });
    const req = { body: { clienteId: 1, filmeId: 1 } };
    const res = mockRes();
    await aluguelController.criarAluguel(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 2, status: 'ativo', clienteId: 1, filmeId: 1, Cliente: {}, Filme: {} });
  });
});
