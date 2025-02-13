import { Router } from 'express';
import { createTodo, getToDos, removeToDo, updateToDo } from '../controllers/todos';
const router = Router();

router.post('/', createTodo);
router.get('/', getToDos)
router.patch('/:id', updateToDo);
router.delete('/:id', removeToDo);

export default router;