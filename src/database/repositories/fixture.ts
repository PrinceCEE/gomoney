import { Model } from "mongoose";
import { Fixture } from "../entities";

export class FixtureRepository {
  constructor(private readonly fixtureModel: Model<Fixture>) {}

  async create() {}

  async update() {}

  async findOneById(id: string) {}

  async findMany() {}

  async delete() {}
}
