import { Model } from "mongoose";
import { Team } from "../entities";

export class TeamRepository {
  constructor(private readonly teamModel: Model<Team>) {}

  async create() {}

  async update() {}

  async findOneById(id: string) {}

  async findMany() {}

  async delete() {}
}
