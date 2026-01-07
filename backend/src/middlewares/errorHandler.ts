import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({
    success: false,
    message: err.message || "Server error",
    // error: err,
  });
};
