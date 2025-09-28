import db from "../models/index.js";

const Aluguel = db.Aluguel;

export const criarAluguel = async (req, res) => {
  try {
    const aluguel = await Aluguel.create(req.body);
    res.status(201).json(aluguel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listarAlugueis = async (req, res) => {
  try {
    const alugueis = await Aluguel.findAll({
      include: ["Cliente", "Filme"],
    });
    res.json(alugueis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
