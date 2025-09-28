import clienteController from './controllers/clienteController.js';
import db from './models/index.js';

jest.mock('./models/index.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Cliente Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('listar retorna clientes', async () => {
    db.Cliente.findAll.mockResolvedValue([{ id: 1, nome: 'Matheus' }]);
    const res = mockRes();
    await clienteController.listar({}, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Matheus' }]);
  });

  test('listar erro', async () => {
    db.Cliente.findAll.mockRejectedValue(new Error('erro'));
    const res = mockRes();
    await clienteController.listar({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'erro' });
  });

  test('buscarPorId retorna cliente', async () => {
    db.Cliente.findByPk.mockResolvedValue({ id: 1, nome: 'Matheus' });
    const req = { params: { id: 1 } };
    const res = mockRes();
    await clienteController.buscarPorId(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Matheus' });
  });

  test('buscarPorId não encontrado', async () => {
    db.Cliente.findByPk.mockResolvedValue(null);
    const req = { params: { id: 2 } };
    const res = mockRes();
    await clienteController.buscarPorId(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Cliente não encontrado' });
  });

  test('criar cliente com nome', async () => {
    db.Cliente.create.mockResolvedValue({ id: 1, nome: 'Matheus', email: null, telefone: null });
    const req = { body: { nome: 'Matheus' } };
    const res = mockRes();
    await clienteController.criar(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Matheus', email: null, telefone: null });
  });

  test('criar cliente sem nome', async () => {
    const req = { body: {} };
    const res = mockRes();
    await clienteController.criar(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nome é obrigatório' });
  });

  test('criar erro', async () => {
    db.Cliente.create.mockRejectedValue(new Error('erro'));
    const req = { body: { nome: 'Matheus' } };
    const res = mockRes();
    await clienteController.criar(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'erro' });
  });

  test('atualizar cliente', async () => {
    const cliente = { update: jest.fn().mockResolvedValue(), ...{ id: 1, nome: 'Matheus' } };
    db.Cliente.findByPk.mockResolvedValue(cliente);
    const req = { params: { id: 1 }, body: { nome: 'Novo' } };
    const res = mockRes();
    await clienteController.atualizar(req, res);
    expect(cliente.update).toHaveBeenCalledWith({ nome: 'Novo' });
    expect(res.json).toHaveBeenCalledWith(cliente);
  });

  test('atualizar cliente não encontrado', async () => {
    db.Cliente.findByPk.mockResolvedValue(null);
    const req = { params: { id: 2 }, body: { nome: 'Novo' } };
    const res = mockRes();
    await clienteController.atualizar(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Cliente não encontrado' });
  });

  test('atualizar erro', async () => {
    db.Cliente.findByPk.mockRejectedValue(new Error('erro'));
    const req = { params: { id: 1 }, body: { nome: 'Novo' } };
    const res = mockRes();
    await clienteController.atualizar(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'erro' });
  });

  test('deletar cliente', async () => {
    const cliente = { destroy: jest.fn().mockResolvedValue(), ...{ id: 1, nome: 'Matheus' } };
    db.Cliente.findByPk.mockResolvedValue(cliente);
    const req = { params: { id: 1 } };
    const res = mockRes();
    await clienteController.deletar(req, res);
    expect(cliente.destroy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: 'Cliente removido com sucesso' });
  });

  test('deletar cliente não encontrado', async () => {
    db.Cliente.findByPk.mockResolvedValue(null);
    const req = { params: { id: 2 } };
    const res = mockRes();
    await clienteController.deletar(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Cliente não encontrado' });
  });

  test('deletar erro', async () => {
    db.Cliente.findByPk.mockRejectedValue(new Error('erro'));
    const req = { params: { id: 1 } };
    const res = mockRes();
    await clienteController.deletar(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'erro' });
  });

  // Testes extras para mock de associações
  test('listar inclui aluguéis', async () => {
    db.Cliente.findAll.mockResolvedValue([{ id: 1, nome: 'Matheus', Aluguel: [] }]);
    const res = mockRes();
    await clienteController.listar({}, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Matheus', Aluguel: [] }]);
  });

  test('buscarPorId inclui aluguéis', async () => {
    db.Cliente.findByPk.mockResolvedValue({ id: 1, nome: 'Matheus', Aluguel: [] });
    const req = { params: { id: 1 } };
    const res = mockRes();
    await clienteController.buscarPorId(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Matheus', Aluguel: [] });
  });
});
