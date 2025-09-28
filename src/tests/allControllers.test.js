import { describe, it, expect, vi, beforeEach } from "vitest";
import clienteController from "../controllers/clienteController.js";
import { criarFilme, listarFilmes } from "../controllers/filmeController.js";
import { criarAluguel, listarAlugueis } from "../controllers/aluguelController.js";
import db from "../models/index.js";

// Mock do db
vi.mock("../models/index.js");

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("Controllers - Vitest", () => {
  let res;

  beforeEach(() => {
    res = mockRes();
  });

  // ================= CLIENTE =================
  it("Deve criar um cliente com sucesso", async () => {
    const req = { body: { nome: "Matheus", email: "m@teste.com", telefone: "123" } };
    db.Cliente.create = vi.fn().mockResolvedValue({ id: 1, ...req.body });

    await clienteController.criar(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
  });

  it("Deve retornar erro ao criar cliente sem nome", async () => {
    const req = { body: { email: "m@teste.com" } };
    await clienteController.criar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Nome é obrigatório" });
  });

  it("Deve listar clientes", async () => {
    const clientes = [{ id: 1, nome: "Matheus" }];
    db.Cliente.findAll = vi.fn().mockResolvedValue(clientes);

    await clienteController.listar({}, res);

    expect(res.json).toHaveBeenCalledWith(clientes);
  });

  it("Deve buscar cliente por ID", async () => {
    const cliente = { id: 1, nome: "Matheus" };
    db.Cliente.findByPk = vi.fn().mockResolvedValue(cliente);
    const req = { params: { id: 1 } };

    await clienteController.buscarPorId(req, res);

    expect(res.json).toHaveBeenCalledWith(cliente);
  });

  it("Deve retornar 404 ao buscar cliente inexistente", async () => {
    db.Cliente.findByPk = vi.fn().mockResolvedValue(null);
    const req = { params: { id: 999 } };

    await clienteController.buscarPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cliente não encontrado" });
  });

  it("Deve atualizar cliente existente", async () => {
    const cliente = { id: 1, update: vi.fn() };
    db.Cliente.findByPk = vi.fn().mockResolvedValue(cliente);
    const req = { params: { id: 1 }, body: { nome: "Novo nome" } };

    await clienteController.atualizar(req, res);

    expect(cliente.update).toHaveBeenCalledWith({ nome: "Novo nome" });
    expect(res.json).toHaveBeenCalledWith(cliente);
  });

  it("Deve retornar 404 ao atualizar cliente inexistente", async () => {
    db.Cliente.findByPk = vi.fn().mockResolvedValue(null);
    const req = { params: { id: 999 }, body: { nome: "Novo nome" } };

    await clienteController.atualizar(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cliente não encontrado" });
  });

  it("Deve deletar cliente existente", async () => {
    const cliente = { id: 1, destroy: vi.fn() };
    db.Cliente.findByPk = vi.fn().mockResolvedValue(cliente);
    const req = { params: { id: 1 } };

    await clienteController.deletar(req, res);

    expect(cliente.destroy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: "Cliente removido com sucesso" });
  });

  it("Deve retornar 404 ao deletar cliente inexistente", async () => {
    db.Cliente.findByPk = vi.fn().mockResolvedValue(null);
    const req = { params: { id: 999 } };

    await clienteController.deletar(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cliente não encontrado" });
  });

  // ================= FILME =================
  it("Deve criar um filme com sucesso", async () => {
    const req = { body: { titulo: "Matrix" } };
    db.Filme.create = vi.fn().mockResolvedValue({ id: 1, ...req.body });

    await criarFilme(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
  });

  it("Deve listar filmes", async () => {
    const filmes = [{ id: 1, titulo: "Matrix" }];
    db.Filme.findAll = vi.fn().mockResolvedValue(filmes);

    await listarFilmes({}, res);

    expect(res.json).toHaveBeenCalledWith(filmes);
  });

  // ================= ALUGUEL =================
  it("Deve criar um aluguel", async () => {
    const req = { body: { clienteId: 1, filmeId: 1 } };
    db.Aluguel.create = vi.fn().mockResolvedValue({ id: 1, status: "ativo", ...req.body });

    await criarAluguel(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, status: "ativo", ...req.body });
  });

  it("Deve retornar erro ao criar aluguel com dados inválidos", async () => {
    db.Aluguel.create = vi.fn().mockRejectedValue(new Error("Erro de validação"));
    const req = { body: {} };

    await criarAluguel(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro de validação" });
  });

  it("Deve listar alugueis", async () => {
    const alugueis = [{ id: 1, status: "ativo", Cliente: {}, Filme: {} }];
    db.Aluguel.findAll = vi.fn().mockResolvedValue(alugueis);

    await listarAlugueis({}, res);

    expect(res.json).toHaveBeenCalledWith(alugueis);
  });

  it("Deve retornar erro ao listar alugueis", async () => {
    db.Aluguel.findAll = vi.fn().mockRejectedValue(new Error("Erro interno"));
    await listarAlugueis({}, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro interno" });
  });

  // ================= TESTES DE ERROS CLIENTE =================
  it("Deve retornar erro ao listar clientes", async () => {
    db.Cliente.findAll = vi.fn().mockRejectedValue(new Error("Erro interno"));
    await clienteController.listar({}, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro interno" });
  });

  it("Deve retornar erro ao buscar cliente por ID", async () => {
    db.Cliente.findByPk = vi.fn().mockRejectedValue(new Error("Erro interno"));
    const req = { params: { id: 1 } };
    await clienteController.buscarPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro interno" });
  });

  it("Deve retornar erro ao atualizar cliente", async () => {
    db.Cliente.findByPk = vi.fn().mockRejectedValue(new Error("Erro interno"));
    const req = { params: { id: 1 }, body: { nome: "Teste" } };
    await clienteController.atualizar(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro interno" });
  });

  it("Deve retornar erro ao deletar cliente", async () => {
    db.Cliente.findByPk = vi.fn().mockRejectedValue(new Error("Erro interno"));
    const req = { params: { id: 1 } };
    await clienteController.deletar(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro interno" });
  });
});
