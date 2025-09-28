import db from '../models/index.js';
const { Cliente } = db;

const listar = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, email , telefone } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    const cliente = await Cliente.create({ nome, email, telefone });
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    await cliente.update(req.body);
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletar = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    await cliente.destroy();
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { listar, buscarPorId, criar, atualizar, deletar };
