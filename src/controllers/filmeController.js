import db from "../models/index.js";

const Filme = db.Filme;

export const criarFilme = async (req, res) => {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listarFilmes = async (req, res) => {
  try {
    const filmes = await Filme.findAll();
    res.json(filmes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
