import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { IConfig } from "src/types";
import { routers } from "./routes";
import { AuthMiddlewares, ErrorMiddlewares } from "./middlewares";
import { AuthController, TeamsController, FixturesController } from "./controllers";

export const startServer = async (config: IConfig) => {
  const app = express();
  const api = express();

  const authMiddleware = new AuthMiddlewares(config);
  const errorMiddleware = new ErrorMiddlewares(config);
  const authController = new AuthController(config);
  const teamsController = new TeamsController(config);
  const fixturesController = new FixturesController(config);

  app.use(cors());
  app.use(helmet());
  app.use(express.json({ limit: "100kb" }));
  app.use(morgan("dev"));
  app.use("/api/v1", api);
  api.use("/auth", routers.setupAuthRoutes(authMiddleware, authController));
  api.use("/fixtures", routers.setupFixturesRoutes(authMiddleware, fixturesController));
  api.use("/teams", routers.setupTeamsRoutes(authMiddleware, teamsController));
  app.use(errorMiddleware.handleError);
  app.use(errorMiddleware.handle404);

  const server = http.createServer(app);
  server.listen(config.env.PORT, () => {
    console.log(`Server started on port :${config.env.PORT}`);
  });

  return server;
};
