import { Router } from 'express';

import UsersController from '../controllers/users.controller.js';
import UserService from '../services/user.service.js';
import UserRepository from '../repositories/user.repository.js';
import AuthorizationGuard from '../middleware/authorization-guard.js';
import AdminGuard from '../middleware/admin-guard copy.js';

const usersRouter = Router();
const usersController = new UsersController(new UserService(new UserRepository()));

usersRouter.get('/api/users', AdminGuard, usersController.getAll());
usersRouter.get('/api/users/:id', AuthorizationGuard, usersController.getOne());
usersRouter.patch('/api/users/:id', AuthorizationGuard, usersController.update());
usersRouter.delete('/api/users/:id', AuthorizationGuard, usersController.delete());

export default usersRouter;
