import { NextFunction, Request, Response } from "express";
import { BaseError } from "src/errors";
import { ApiResponse, Application } from "src/types";

export class ErrorMiddlewares extends Application {
  async handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    const response: ApiResponse = {
      success: false,
      message: err.message,
    };

    res.status(err instanceof BaseError ? err.statusCode : 500).json(response);
  }

  async handle404(req: Request, res: Response, next: NextFunction) {
    const response: ApiResponse = {
      success: false,
      message: "Not found",
    };
    res.status(404).json(response);
  }
}
