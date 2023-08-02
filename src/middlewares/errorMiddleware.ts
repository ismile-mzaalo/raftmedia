import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number = 500;
  console.log(err.message, err.stack);
  res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};

export { notFound, errorHandler };
