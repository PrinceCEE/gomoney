import { Router } from "express";
import { AuthMiddlewares } from "../middlewares";
import { AuthController } from "../controllers";

export const setupAuthRoutes = (
  authMiddleware: AuthMiddlewares,
  authController: AuthController
) => {
  const r = Router();

  return r;
};
