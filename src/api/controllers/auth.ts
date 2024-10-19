import { NextFunction, Request, Response } from "express";
import { ApiResponse, Application } from "src/types";
import { NotImplementedError } from "src/errors";
import { Handler } from "src/utils";

export class AuthController extends Application {
  @Handler()
  async signUp(req: Request, res: Response): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }

  @Handler()
  async login(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<null>> {
    throw new NotImplementedError();
  }
}
