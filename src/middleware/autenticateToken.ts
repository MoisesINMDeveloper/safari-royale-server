import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret";
const prisma = new PrismaClient();

const authenticateToken = (requiredRole?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      console.log("No token provided.");
      return res.status(401).json({ error: "No autorizado" });
    }
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });
      if (!user) {
        console.log("User not found for the given token.");
        return res
          .status(403)
          .json({ error: "No tienes acceso a este recurso." });
      }
      if (requiredRole && user.role !== requiredRole) {
        console.log("User does not have the required role.");
        return res
          .status(403)
          .json({ error: "No tienes acceso a este recurso." });
      }
      res.locals.user = user;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(403).json({ error: "El token ha expirado." });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ error: "Firma de token inválida." });
      } else {
        return res
          .status(403)
          .json({ error: "No tienes acceso a este recurso." });
      }
    }
  };
};

export default authenticateToken;
