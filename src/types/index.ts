import { Mock } from "node:test";
import { FixtureStatus, UserRoles } from "src/constants";
import { User } from "src/database";
import { FixturesService, TeamsService, UserService } from "src/services";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
export interface IConfig {
  env: {
    DB_URL: string;
    PORT: string;
    JWT_SECRET: string;
    REDIS_URL: string;
  };
  services: {
    usersService: UserService;
    teamsService: TeamsService;
    fixturesService: FixturesService;
  };
}

export abstract class Application {
  constructor(protected readonly config: IConfig) {}
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    totalPages: number;
    sizePerPage: number;
  };
}

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type FixtureResponse = {
  id: string;
  homeTeam: TeamResponse;
  awayTeam: TeamResponse;
  time: Date;
  stadium: string;
  status: FixtureStatus;
  referee: string;
  score: {
    home: number;
    away: number;
  };
};

export type TeamResponse = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  stadium: string;
  yearFounded: string;
  manager: string;
  website: string;
  logoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  username: string;
  password: string;
};

export type CreateTeam = {
  name: string;
  shortName: string;
  location: string;
  stadium: string;
  yearFounded: string;
  manager: string;
  website?: string;
  logoUrl?: string;
};

export type CreateFixture = {
  homeTeam: string;
  awayTeam: string;
  time: Date;
  stadium: string;
  referee: string;
};

export type PaginationOptions = {
  limit?: number;
  page?: number;
};

export type MockFn = Mock<() => any>;
