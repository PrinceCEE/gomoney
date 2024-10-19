import { Router } from "express";
import { LoginDto, SignupDto } from "../dtos";
import { IAuthController, IAuthMiddleware } from "src/types";

export const setupAuthRoutes = (
  authMiddleware: IAuthMiddleware,
  authController: IAuthController
) => {
  const r = Router();

  r.post("/sign-up", authMiddleware.validatePayload(SignupDto), authController.signUp);
  r.post("/login", authMiddleware.validatePayload(LoginDto), authController.login);

  return r;
};
