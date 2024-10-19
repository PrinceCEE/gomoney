import { Router } from "express";
import { IAuthMiddleware, IFixtureController } from "src/types";
import { CreateFixtureDto, UpdateFixtureDto } from "../dtos";

export const setupFixturesRoutes = (
  authMiddleware: IAuthMiddleware,
  fixturesController: IFixtureController
) => {
  const r = Router();

  r.post(
    "/",
    authMiddleware.validateUser,
    authMiddleware.validatePayload(CreateFixtureDto),
    fixturesController.createFixture
  );

  r.put(
    "/:fixtureId",
    authMiddleware.validateUser,
    authMiddleware.validatePayload(UpdateFixtureDto),
    fixturesController.updateFixture
  );

  r.get("/:fixtureId", authMiddleware.validateUser, fixturesController.getFixture);
  r.get("/", authMiddleware.validateUser, fixturesController.getFixtures);
  r.delete("/:fixtureId", authMiddleware.validateUser, fixturesController.deleteFixture);
  r.post("/:fixtureId/generate-link", authMiddleware.validateUser, fixturesController.generateLink);

  return r;
};
