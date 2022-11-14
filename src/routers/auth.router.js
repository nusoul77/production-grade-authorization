import { Router } from 'express';

import AuthController from '../controllers/auth.controller.js';
import AuthService from '../services/auth.service.js';
import UserService from '../services/user.service.js';
import UserRepository from '../repositories/user.repository.js';
import LoginValidation from '../middleware/login-model-validation.js';
import RegisterValidation from '../middleware/register-model-validation.js';

const authRouter = Router();
const authController = new AuthController(new AuthService(new UserService(new UserRepository())));

authRouter.post('/api/register', RegisterValidation, authController.signUp());
authRouter.post('/api/login', LoginValidation, authController.signIn());

export default authRouter;
