import { Request, Response } from "express";
import prismaUser from "../models/user.prisma";

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Obtener la información del usuario del middleware authenticateToken
    const user = res.locals.user;
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    console.log("User from res.locals:", user); // Verifica si el usuario está siendo obtenido correctamente

    // Obtener los datos del usuario desde la base de datos
    const userData = await prismaUser.findUnique({
      where: { id: user.id },
      // Incluir aquí cualquier otro modelo que necesites
    });

    console.log("User data from database:", userData); // Verifica los datos del usuario obtenidos de la base de datos

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
