import { Request, Response } from "express";
import prismaUser from "../models/user.prisma";

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Obtener la información del middleware authenticateToken
    const user = res.locals.user;
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    // Obtener los datos del usuario desde la base de datos
    const userData = await prismaUser.findUnique({
      where: { id: user.id },
      include: {
        bank: {
          select: {
            name: true, // Incluir solo el nombre del banco
          },
        },
        codePhone: {
          select: {
            code: true, // Incluir solo el código de teléfono
          },
        },
      },
    });

    if (!userData) {
      res.status(404).json({ error: "Datos del usuario no encontrados" });
      return;
    }

    // Crear un objeto con los datos del usuario excluyendo el id y el token
    const { password, ...filteredUserData } = {
      ...userData,
      bankName: userData.bank?.name,
      phoneCode: userData.codePhone?.code, // Ajustar según la estructura de Phone
    };

    // Enviar los datos del usuario en la respuesta
    res.status(200).json(filteredUserData);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ error: "Hubo un error, intenta más tarde" });
  }
};
