import { FilterQuery } from "mongoose";
import { Fixture, FixtureRepository } from "src/database";
import { BadRequestError, InternalServerError, NotFoundError } from "src/errors";
import { CreateFixture } from "src/types";

export class FixturesService {
  constructor(private readonly fixtureRepository: FixtureRepository) {}

  async createFixture(createFixturePayload: CreateFixture) {
    if (
      await this.fixtureRepository.overlappingFixtureExists(
        createFixturePayload.homeTeam,
        createFixturePayload.awayTeam,
        createFixturePayload.time
      )
    ) {
      throw new BadRequestError("Overlapping fixture exists");
    }

    const fixture = await this.fixtureRepository.create(createFixturePayload);
    if (!fixture) {
      throw new InternalServerError("Error creating fixture. Please try again");
    }

    return fixture;
  }

  async updateFixture(fixtureId: string, updateFixturePayload: Partial<Fixture>) {
    const fixture = await this.fixtureRepository.update({ _id: fixtureId }, updateFixturePayload, {
      new: true,
    });
    if (!fixture) {
      throw new NotFoundError("Fixture not found");
    }

    return fixture;
  }

  async deleteFixture(fixtureId: string) {
    return this.fixtureRepository.delete({ _id: fixtureId });
  }

  async getFixtureById(fixtureId: string) {
    return this.fixtureRepository.findOneById(fixtureId);
  }

  async getFixtures(filter: FilterQuery<Fixture>, limit?: number, page?: number) {
    const response = await this.fixtureRepository.findMany(filter, {
      limit,
      page,
    });

    return response;
  }
}
