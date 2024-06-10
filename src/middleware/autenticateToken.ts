import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret";
const prisma = new PrismaClient();

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res
        .status(403)
        .json({ error: "No tienes acceso a este recurso." });
    }
    res.locals.user = user;
    next();
  } catch (error) {
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

export default authenticateToken;
