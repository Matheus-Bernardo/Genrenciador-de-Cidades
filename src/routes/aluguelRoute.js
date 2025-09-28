import { Router } from "express";
import { criarAluguel, listarAlugueis } from "../controllers/aluguelController.js";

const router = Router();

router.post("/", criarAluguel);
router.get("/", listarAlugueis);

export default router;
