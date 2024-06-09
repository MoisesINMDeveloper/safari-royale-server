import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prismaUser from "../models/user.prisma";

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Verificar si existe el token
    if (!token) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }

    // Decodificar el token JWT para obtener la información del usuario
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "default-secret"
    );

    // Verificar si el token es válido y contiene la información del usuario
    if (!decoded || !decoded.id) {
      res.status(403).json({ error: "Token inválido" });
      return;
    }

    // Buscar al usuario en la base de datos utilizando el ID obtenido del token
    const userData = await prismaUser.findUnique({
      where: { id: decoded.id },
      // Incluir aquí cualquier otro modelo que necesites
    });

    // Verificar si se encontraron los datos del usuario en la base de datos
    if (!userData) {
      res.status(404).json({ error: "Datos del usuario no encontrados" });
      return;
    }

    // Enviar los datos del usuario en la respuesta
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ error: "Hubo un error, intenta más tarde" });
  }
};
