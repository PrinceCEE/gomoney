import { NextFunction, Request, Response } from "express";
import { NotImplementedError } from "src/errors";
import { ApiResponse, Application } from "src/types";
import { Handler } from "src/utils";

export class FixturesController extends Application {
  @Handler()
  async createFixture(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async updateFixture(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async getFixture(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async getFixtures(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async deleteFixture(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async generateLink(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }
}
