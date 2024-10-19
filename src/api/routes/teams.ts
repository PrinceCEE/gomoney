import { Router } from "express";
import { AuthMiddlewares } from "../middlewares";
import { TeamsController } from "../controllers";

export const setupTeamsRoutes = (
  authMiddleware: AuthMiddlewares,
  teamsController: TeamsController
) => {
  const r = Router();

  return r;
};
