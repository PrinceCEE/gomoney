import mongoose from "mongoose";
import { BaseEntity } from "./baseEntity";
import { UserRoles } from "src/constants";

export class User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: UserRoles; // for basic rbac for the users
  password: string;
}

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(UserRoles),
    },
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
