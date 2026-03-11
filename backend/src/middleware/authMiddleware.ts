import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// define payload interface
interface JwtPayload {
  userId: number;
  email: string;
}

// extend express request type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

// protect routes with jwt
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  // check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
