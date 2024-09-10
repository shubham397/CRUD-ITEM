import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }
      // req.user = user as JwtPayload;
      next();
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

export default authenticateJWT;
