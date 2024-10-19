import { Router } from "express";
import { IAuthMiddleware, ITeamController } from "src/types";
import { CreateTeamDto, UpdateTeamDto } from "../dtos";

export const setupTeamsRoutes = (
  authMiddleware: IAuthMiddleware,
  teamsController: ITeamController
) => {
  const r = Router();

  r.post(
    "/",
    authMiddleware.validateUser,
    authMiddleware.validatePayload(CreateTeamDto),
    teamsController.createTeam
  );

  r.put(
    "/:teamId",
    authMiddleware.validateUser,
    authMiddleware.validatePayload(UpdateTeamDto),
    teamsController.updateTeam
  );

  r.get("/", authMiddleware.validateUser, teamsController.getTeams);
  r.get("/:teamId", authMiddleware.validateUser, teamsController.getTeam);
  r.delete("/:teamId", authMiddleware.validateUser, teamsController.deleteTeam);
  return r;
};
