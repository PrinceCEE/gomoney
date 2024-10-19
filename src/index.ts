import "reflect-metadata";
require("module-alias/register");
import dotenv from "dotenv";
import http from "http";
import { startServer } from "./api";
import { db, UserRepository, FixtureRepository, TeamRepository } from "./database";
import { UserService, FixturesService, TeamsService } from "./services";
import { IConfig } from "./types";
import { cache } from "./cache";

async function main() {
  dotenv.config();

  const usersRepository = new UserRepository(db.models.users);
  const teamsRepository = new TeamRepository(db.models.teams);
  const fixturesRepository = new FixtureRepository(db.models.fixtures);

  const usersService = new UserService(usersRepository);
  const teamsService = new TeamsService(teamsRepository);
  const fixturesService = new FixturesService(fixturesRepository);

  const config: IConfig = {
    env: {
      DB_URL: process.env.DB_URL!,
      PORT: process.env.PORT || "3000",
      JWT_SECRET: process.env.JWT_SECRET!,
      REDIS_URL: process.env.REDIS_URL!,
    },
    services: { usersService, teamsService, fixturesService },
  };

  db.connectDB(config.env.DB_URL);
  await cache.connectCache(config.env.REDIS_URL);
  const server = await startServer(config);

  process.on("SIGTERM", () => gracefulShutdown(server, "SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown(server, "SIGINT"));
}

async function gracefulShutdown(server: http.Server, signal: string) {
  try {
    console.log(`\nReceived ${signal} signal. Starting graceful shutdown\n`);

    await cache.disconnectCache();
    await new Promise((res, rej) => {
      server.close((err) => {
        if (err) {
          rej(err);
          return;
        }

        res(null);
      });
    });

    await db.disconnectDB();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
