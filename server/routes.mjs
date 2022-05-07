import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from './controllers/tasks.mjs';
import { createUser, deleteUser, getUsers, getUser, updateUser } from './controllers/users.mjs';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

router.get('/tasks', getTasks)
router.post('/tasks', createTask)
router.put('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)

export default router;