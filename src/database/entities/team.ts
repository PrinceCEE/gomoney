import mongoose from "mongoose";
import { BaseEntity } from "./baseEntity";

export class Team extends BaseEntity {
  name: string;
  shortName: string;
  location: string;
  stadium: string;
  yearFounded: string;
  manager: string;
  website: string;
  logoUrl: string;
}

export const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    stadium: {
      type: String,
      required: true,
    },
    yearFounded: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
    website: { type: String },
    logoUrl: { type: String },
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
