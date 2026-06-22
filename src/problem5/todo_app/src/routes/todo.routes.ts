import { Router } from 'express';
import { todoController } from '../controllers/todo.controller';
import { validate } from '../middleware/validate.middleware';
import { createTodoSchema, updateTodoSchema } from '../validators/todo.validator';

const router = Router();

router.post('/', validate(createTodoSchema, 'body'), (req, res) => todoController.create(req, res));
router.get('/', (req, res) => todoController.list(req, res));
router.get('/:id', (req, res) => todoController.get(req, res));
router.put('/:id', validate(updateTodoSchema, 'body'), (req, res) => todoController.update(req, res));
router.delete('/:id', (req, res) => todoController.delete(req, res));

export default router;
