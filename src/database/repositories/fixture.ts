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
    // assuming a normal game takes 2hrs with breaks et al
    if (
      await this.fixtureModel.findOne({
        homeTeam,
        time: {
          $gte: time,
          $lte: addHours(time, 2),
        },
      })
    ) {
      return true;
    }

    if (
      await this.fixtureModel.findOne({
        awayTeam,
        time: {
          $gte: time,
          $lte: addHours(time, 2),
        },
      })
    ) {
      return true;
    }

    return false;
  }

  async update(filter: FilterQuery<Fixture>, update: UpdateQuery<Fixture>, options?: QueryOptions) {
    const fixture = await this.fixtureModel
      .findOneAndUpdate(filter, update, options)
      .populate("homeTeam awayTeam");
    return fixture;
  }

  async findOneById(id: string) {
    const fixture = await this.fixtureModel.findById(id).populate("homeTeam awayTeam");
    return fixture;
  }

  async findMany(filter: FilterQuery<Fixture>, paginationOptions: PaginationOptions = {}) {
    const { limit, skip, page } = getPaginationOptions(paginationOptions);
    const totalDocs = await this.fixtureModel.countDocuments(filter);
    const fixtures = await this.fixtureModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .populate("homeTeam awayTeam");

    return {
      fixtures,
      meta: getPaginationMeta(page, limit, totalDocs),
    };
  }

  async delete(filter: FilterQuery<Fixture>, session?: ClientSession) {
    await this.fixtureModel.findOneAndDelete(filter, { session });
  }
}
