import mongoose from "mongoose";
import { BaseEntity } from "./baseEntity";
import { Team } from "./team";
import { FixtureStatus } from "src/constants";

export class Fixture extends BaseEntity {
  homeTeam: string | Team;
  awayTeam: string | Team;
  time: Date;
  stadium: string;
  status: FixtureStatus;
  referee: string;
  score: {
    home: number;
    away: number;
  };
}

export const FixtureSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Team.name,
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Team.name,
    },
    time: {
      type: Date,
      required: true,
    },
    stadium: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(FixtureStatus),
      default: FixtureStatus.SCHEDULED,
    },
    referee: {
      type: String,
      required: true,
    },
    score: {
      type: {
        _id: false,
        home: Number,
        away: Number,
      },
      default: { home: 0, away: 0 },
    },
    deletedAt: { type: Date },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
