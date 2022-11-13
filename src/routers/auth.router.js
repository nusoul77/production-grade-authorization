import { Router } from "express";

import AuthController from "../controllers/auth.controller.js";
import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";
import UserRepository from "../repositories/user.repository.js";

const authRouter = Router();
const authController = new AuthController(
  new AuthService(new UserService(new UserRepository()))
);

authRouter.post("/api/register", authController.signUp());

export default authRouter;
