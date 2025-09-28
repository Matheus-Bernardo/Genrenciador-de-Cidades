import { Router } from "express";
import { criarFilme, listarFilmes } from "../controllers/filmeController.js";

const router = Router();

router.post("/", criarFilme);
router.get("/", listarFilmes);

export default router;
