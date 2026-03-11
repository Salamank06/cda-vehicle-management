import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/clienteController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// client routes protected with auth
router.get('/', authenticate, getAll);
router.get('/:id', authenticate, getById);
router.post('/', authenticate, create);
router.put('/:id', authenticate, update);
router.delete('/:id', authenticate, remove);

export default router;
