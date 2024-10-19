import mongoose from "mongoose";
import { Fixture, FixtureSchema, Team, TeamSchema, User, UserSchema } from "./entities";

const connectDB = async (dbUrl: string) => {
  await mongoose.connect(dbUrl);
};

const disconnectDB = async () => mongoose.disconnect();

const models = {
  users: mongoose.model<User>(User.name, UserSchema),
  teams: mongoose.model<Team>(Team.name, TeamSchema),
  fixtures: mongoose.model<Fixture>(Fixture.name, FixtureSchema),
};

export const db = { connectDB, models, disconnectDB };
