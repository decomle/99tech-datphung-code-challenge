import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);
  if (err.message === 'NotFound') return res.status(404).json({ message: 'Todo not found' });
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
