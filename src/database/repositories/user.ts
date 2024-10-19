import { ClientSession, FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { User } from "../entities";
import { CreateUser, PaginationOptions } from "src/types";
import { getPaginationMeta, getPaginationOptions } from "src/utils";

export class UserRepository {
  constructor(private readonly userModel: Model<User>) {}

  async create(createUserPayload: CreateUser, session?: ClientSession) {
    const user = await new this.userModel(createUserPayload).save({ session });
    return user;
  }

  async update(filter: FilterQuery<User>, update: UpdateQuery<User>, options?: QueryOptions) {
    const user = await this.userModel.findOneAndUpdate(filter, update, options);
    return user;
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async findMany(filter: FilterQuery<User>, paginationOptions: PaginationOptions = {}) {
    const { limit, skip, page } = getPaginationOptions(paginationOptions);
    const totalDocs = await this.userModel.countDocuments(filter);

    const users = await this.userModel.find(filter).skip(skip).limit(limit);
    return {
      users,
      meta: getPaginationMeta(page, limit, totalDocs),
    };
  }

  async delete(filter: FilterQuery<User>, session?: ClientSession) {
    await this.userModel.findOneAndDelete(filter, { session });
  }
}
