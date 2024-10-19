import { ClientSession, FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { addHours } from "date-fns";
import { Fixture } from "../entities";
import { CreateFixture, PaginationOptions } from "src/types";
import { getPaginationMeta, getPaginationOptions } from "src/utils";

export class FixtureRepository {
  constructor(private readonly fixtureModel: Model<Fixture>) {}

  async create(createFixturePayload: CreateFixture, session?: ClientSession) {
    const fixture = await new this.fixtureModel({
      homeTeam: createFixturePayload.homeTeam,
      awayTeam: createFixturePayload.awayTeam,
      time: createFixturePayload.time,
      stadium: createFixturePayload.stadium,
      referee: createFixturePayload.referee,
    })
      .save({ session })
      .then((f) => f.populate("homeTeam awayTeam"));

    return fixture;
  }

  async overlappingFixtureExists(homeTeam: string, awayTeam: string, time: Date) {
    const fixtureExists = await this.fixtureModel.findOne({
      homeTeam,
      time: {
        $gte: time,
        $lte: addHours(time, 2), // assuming a normal game takes 2hrs with breaks et al
      },
    });

    return !!fixtureExists;
  }

  async update(filter: FilterQuery<Fixture>, update: UpdateQuery<Fixture>, options?: QueryOptions) {
    const fixture = await this.fixtureModel.findOneAndUpdate(filter, update, options);
    return fixture;
  }

  async findOneById(id: string) {
    const fixture = await this.fixtureModel.findById(id);
    return fixture;
  }

  async findMany(filter: FilterQuery<Fixture>, paginationOptions: PaginationOptions = {}) {
    const { limit, skip, page } = getPaginationOptions(paginationOptions);
    const totalDocs = await this.fixtureModel.countDocuments(filter);
    const fixtures = await this.fixtureModel.find(filter).skip(skip).limit(limit);

    return {
      fixtures,
      meta: getPaginationMeta(page, limit, totalDocs),
    };
  }

  async delete(filter: FilterQuery<Fixture>, session?: ClientSession) {
    const fixture = await this.fixtureModel.findOne({ ...filter, deletedAt: { $exists: false } });
    if (!fixture) {
      return;
    }

    fixture.deletedAt = new Date();
    await fixture.save({ session });
  }
}
