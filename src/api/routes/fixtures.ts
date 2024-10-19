import { Router } from "express";
import { AuthMiddlewares } from "../middlewares";
import { FixturesController } from "../controllers";

export const setupFixturesRoutes = (
  authMiddleware: AuthMiddlewares,
  fixturesController: FixturesController
) => {
  const r = Router();

  return r;
};
