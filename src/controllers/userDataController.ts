import { Request, Response } from "express";
import prismaUser from "../models/user.prisma";

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Petición recibida para obtener datos de usuario.");

    // Obtener el usuario desde res.locals
    const user = res.locals.user;
    if (!user) {
      console.log("Usuario no encontrado en res.locals.");
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Buscar al usuario en la base de datos utilizando el ID
    const userData = await prismaUser.findUnique({
      where: { id: user.id },
      // Incluir aquí cualquier otro modelo que necesites
    });

    if (!userData) {
      console.log("No se encontraron datos del usuario en la base de datos.");
      res.status(404).json({ error: "Datos del usuario no encontrados" });
      return;
    }

    // Eliminar la contraseña del usuario de la respuesta
    const { password, ...userWithoutPassword } = userData;

    console.log("Datos del usuario encontrados:", userWithoutPassword);
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ error: "Hubo un error, intenta más tarde" });
  }
};
