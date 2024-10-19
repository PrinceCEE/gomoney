import { FilterQuery } from "mongoose";
import { User, UserRepository } from "src/database";
import { BadRequestError, InternalServerError, NotFoundError } from "src/errors";
import { CreateUser } from "src/types";
import { hashPassword } from "src/utils";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserPayload: CreateUser) {
    if (await this.userRepository.findOneByEmail(createUserPayload.email)) {
      throw new BadRequestError("User with the email exists");
    }
    if (await this.userRepository.findOneByUsername(createUserPayload.username)) {
      throw new BadRequestError("User with the username exists");
    }

    createUserPayload.password = await hashPassword(createUserPayload.password);
    const user = await this.userRepository.create(createUserPayload);
    if (!user) {
      throw new InternalServerError("Error creating user. Please try again");
    }

    return user;
  }

  async updateUser(userId: string, updateUserPayload: Partial<User>) {
    const user = await this.userRepository.update({ _id: userId }, updateUserPayload, {
      new: true,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async deleteUser(userId: string) {
    return this.userRepository.delete({ _id: userId });
  }

  async getUserById(userId: string) {
    return this.userRepository.findOneById(userId);
  }

  async getUserByUsername(username: string) {
    return this.userRepository.findOneByUsername(username);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async getUsers(filter: FilterQuery<User>, limit?: number, page?: number) {
    const response = await this.userRepository.findMany(filter, {
      limit,
      page,
    });

    return response;
  }
}
