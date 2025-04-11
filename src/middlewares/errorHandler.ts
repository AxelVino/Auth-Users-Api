import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error capturado por errorHandler:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    name: err.name || "Error",
    message: err.message || "Internal Server Error",
  });
}
