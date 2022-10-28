import { NextFunction, Request, Response } from 'express';
import ThrowException from './exceptions/ThrowException';

const errorMiddleware = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status = 500, message } = error as ThrowException;
  return res.status(status).json({ message });
};

export default errorMiddleware;