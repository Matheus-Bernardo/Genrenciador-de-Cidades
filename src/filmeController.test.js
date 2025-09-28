import * as filmeController from './controllers/filmeController.js';
import db from './models/index.js';

jest.mock('./models/index.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Filme Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('listarFilmes retorna filmes', async () => {
    db.Filme.findAll.mockResolvedValue([{ id: 1, titulo: 'Matrix' }]);
    const res = mockRes();
    await filmeController.listarFilmes({}, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, titulo: 'Matrix' }]);
  });

  test('listarFilmes erro', async () => {
    db.Filme.findAll.mockRejectedValue(new Error('erro'));
    const res = mockRes();
    await filmeController.listarFilmes({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'erro' });
  });

  test('criarFilme sucesso', async () => {
    db.Filme.create.mockResolvedValue({ id: 1, titulo: 'Matrix' });
    const req = { body: { titulo: 'Matrix' } };
    const res = mockRes();
    await filmeController.criarFilme(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, titulo: 'Matrix' });
  });

  test('criarFilme erro', async () => {
    db.Filme.create.mockRejectedValue(new Error('erro'));
    const req = { body: { titulo: 'Matrix' } };
    const res = mockRes();
    await filmeController.criarFilme(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'erro' });
  });

  // Testes extras para mock de associações
  test('listarFilmes inclui aluguéis', async () => {
    db.Filme.findAll.mockResolvedValue([{ id: 1, titulo: 'Matrix', Aluguel: [] }]);
    const res = mockRes();
    await filmeController.listarFilmes({}, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, titulo: 'Matrix', Aluguel: [] }]);
  });

  // Testes negativos
  test('criarFilme sem título', async () => {
    const req = { body: {} };
    const res = mockRes();
    await filmeController.criarFilme(req, res);
    // Não há validação, então não retorna erro
    expect(res.status).not.toHaveBeenCalledWith(400);
  });

  test('listarFilmes retorna array vazio', async () => {
    db.Filme.findAll.mockResolvedValue([]);
    const res = mockRes();
    await filmeController.listarFilmes({}, res);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  test('criarFilme retorna objeto com campos esperados', async () => {
    db.Filme.create.mockResolvedValue({ id: 2, titulo: 'Toy Story', diretor: 'John', ano: 1995, disponivel: true });
    const req = { body: { titulo: 'Toy Story', diretor: 'John', ano: 1995, disponivel: true } };
    const res = mockRes();
    await filmeController.criarFilme(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 2, titulo: 'Toy Story', diretor: 'John', ano: 1995, disponivel: true });
  });
});
