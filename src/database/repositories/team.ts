import { ClientSession, FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { Team } from "../entities";
import { CreateTeam, PaginationOptions } from "src/types";
import { getPaginationMeta, getPaginationOptions } from "src/utils";

export class TeamRepository {
  constructor(private readonly teamModel: Model<Team>) {}

  async create(createTeamPayload: CreateTeam, session?: ClientSession) {
    const team = await new this.teamModel(createTeamPayload).save({ session });
    return team;
  }

  async update(filter: FilterQuery<Team>, update: UpdateQuery<Team>, options?: QueryOptions) {
    filter = { ...filter, deletedAt: { $exists: false } };
    const team = await this.teamModel.findOneAndUpdate(filter, update, options);
    return team;
  }

  async findOneById(id: string) {
    const team = await this.teamModel.findById(id);
    return team;
  }

  async findOneByShortname(shortName: string) {
    const team = await this.teamModel.findOne({ shortName });
    return team;
  }

  async findMany(filter: FilterQuery<Team>, paginationOptions: PaginationOptions = {}) {
    filter = { ...filter, deletedAt: { $exists: false } };

    const { limit, skip, page } = getPaginationOptions(paginationOptions);
    const totalDocs = await this.teamModel.countDocuments(filter);
    const teams = await this.teamModel.find(filter).skip(skip).limit(limit);

    return {
      teams,
      meta: getPaginationMeta(page, limit, totalDocs),
    };
  }

  async delete(filter: FilterQuery<Team>, session?: ClientSession) {
    filter = { ...filter, deletedAt: { $exists: false } };
    const team = await this.teamModel.findOne(filter);
    if (!team) {
      return;
    }

    team.deletedAt = new Date();
    await team.save({ session });
  }
}
