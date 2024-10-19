import { NextFunction, Request, Response } from "express";
import { NotImplementedError } from "src/errors";
import { ApiResponse, Application } from "src/types";
import { Handler } from "src/utils";

export class TeamsController extends Application {
  @Handler()
  async createTeam(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async updateTeam(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async getTeam(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async getTeams(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async deleteTeam(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }
}
