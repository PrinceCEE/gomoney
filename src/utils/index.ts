import { compare, genSalt, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { Fixture, Team, User } from "src/database";
import { UnauthorizedError } from "src/errors";
import { FixtureResponse, TeamResponse, UserResponse } from "src/types";
import { NextFunction, Request, Response } from "express";

export const hashPassword = async (pwd: string) => {
  const salt = await genSalt(10);
  return hash(pwd, salt);
};

export const comparePassword = (pwdHash: string, pwd: string) => {
  return compare(pwd, pwdHash);
};

export const generateAccessToken = async (data: { sub: string }) => {
  return sign(data, process.env.JWT_SECRET!, { expiresIn: "3d" });
};

export const verifyToken = async (token: string) => {
  try {
    return verify(token, process.env.JWT_SECRET!);
  } catch (err: any) {
    throw new UnauthorizedError(err.message);
  }
};

export const mapUserToUserResponse = (user: User): UserResponse => {
  return {
    id: String(user._id),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  };
};

export const mapTeamtoTeamResponse = (team: Team): TeamResponse => {
  return {
    id: String(team._id),
    name: team.name,
    shortName: team.shortName,
    location: team.location,
    stadium: team.stadium,
    yearFounded: team.yearFounded,
    manager: team.manager,
    website: team.website,
    logoUrl: team.logoUrl,
    createdAt: team.createdAt,
    updatedAt: team.updatedAt,
    deletedAt: team.deletedAt,
  };
};

export const mapFixtureToFixtureResponse = (fixture: Fixture): FixtureResponse => {
  return {
    id: String(fixture._id),
    homeTeam: mapTeamtoTeamResponse(fixture.homeTeam as Team),
    awayTeam: mapTeamtoTeamResponse(fixture.awayTeam as Team),
    time: fixture.time,
    stadium: fixture.stadium,
    status: fixture.status,
    referee: fixture.referee,
    score: fixture.score,
  };
};

export const generateID = () => uuid();

export const Handler = (): MethodDecorator => {
  return function (_: Object, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
    const originalFn: Function = descriptor.value;

    descriptor = {
      enumerable: false,
      configurable: true,
      get() {
        const self = this;
        const boundFn = async function (req: Request, res: Response, next: NextFunction) {
          try {
            const data = await originalFn.call(self, req, res);
            res.json(data);
          } catch (err: any) {
            next(err);
          }
        }.bind(self);

        // memoize the bound function
        Object.defineProperty(self, propertyName as string, {
          writable: true,
          configurable: true,
          value: boundFn,
        });

        return boundFn;
      },
    };
  };
};
