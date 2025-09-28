import express from 'express';
import clienteController from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', clienteController.listar);
router.get('/:id', clienteController.buscarPorId);
router.post('/', clienteController.criar);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.deletar);

export default router;
