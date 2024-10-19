import { Model } from "mongoose";
import { User } from "../entities";

export class UserRepository {
  constructor(private readonly userModel: Model<User>) {}

  async create() {}

  async update() {}

  async findOneById(id: string) {}

  async findOneByEmail(email: string) {}

  async findOneByUsername(username: string) {}

  async findMany() {}

  async delete() {}
}
