import { FilterQuery } from "mongoose";
import { Team, TeamRepository } from "src/database";
import { BadRequestError, InternalServerError, NotFoundError } from "src/errors";
import { CreateTeam } from "src/types";

export class TeamsService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async createTeam(createTeamPayload: CreateTeam) {
    if (await this.getTeamByShortName(createTeamPayload.shortName)) {
      throw new BadRequestError("Team with same short name already exists");
    }

    const team = await this.teamRepository.create(createTeamPayload);
    if (!team) {
      throw new InternalServerError("Error creating team. Please try again");
    }

    return team;
  }

  async updateTeam(teamId: string, updateTeamPayload: Partial<Team>) {
    const team = await this.teamRepository.update({ _id: teamId }, updateTeamPayload, {
      new: true,
    });
    if (!team) {
      throw new NotFoundError("Team not found");
    }

    return team;
  }

  async deleteTeam(teamId: string) {
    return this.teamRepository.delete({ _id: teamId });
  }

  async getTeamById(teamId: string) {
    return this.teamRepository.findOneById(teamId);
  }

  async getTeamByShortName(shortName: string) {
    return this.teamRepository.findOneByShortname(shortName);
  }

  async getTeams(filter: FilterQuery<Team>, limit?: number, page?: number) {
    const response = await this.teamRepository.findMany(filter, {
      limit,
      page,
    });

    return response;
  }
}
