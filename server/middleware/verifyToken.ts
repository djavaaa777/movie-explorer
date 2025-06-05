import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization header missing or malformed' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log("🛡 VERIFYING TOKEN WITH JWT_SECRET:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    console.log("✅ Token verified:", decoded);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", (err as Error).message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
