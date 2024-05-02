import { Request, Response } from "express";
import { hashPassword } from "../services/password.service";
import { PrismaClient } from "@prisma/client";
import bankPrisma from "../models/bank.prisma";
import { generateToken } from "../services/auth.service"; // Importa la función para generar tokens
const prisma = new PrismaClient();

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, name, email, dni, password, bank, phone, verified } =
      req.body;

    if (
      !username ||
      !name ||
      !email ||
      !password ||
      !dni ||
      !verified ||
      !bank ||
      !phone
    ) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const idBank = await bankPrisma.findUnique({
      where: {
        id: bank,
      },
    });
    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        dni,
        verified,
        bank: {
          connect: {
            id: idBank?.id,
          },
        },
        phone,
      },
    });

    // Genera el token
    const token = generateToken(user);

    // Agrega el token a la respuesta
    res.status(201).json({ ...user, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// El resto de tus controladores aquí...

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    const usersWithoutPassword = users.map((user) => ({
      ...user,
      token: user.verified ? generateToken(user) : undefined, // Agregar el token solo si el usuario está verificado
      password: undefined, // Eliminar el campo de contraseña del usuario
    }));
    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error try later." });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: number = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const userWithoutPassword = {
      ...user,
      token: user.verified ? generateToken(user) : undefined, // Agregar el token solo si el usuario está verificado
      password: undefined, // Eliminar el campo de contraseña del usuario
    };
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error try later." });
  }
};
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: number = parseInt(req.params.id);
  const { username, email, password, dni, bankId, phoneId, verified } =
    req.body;
  try {
    let dataToUpdate: any = {}; // Objeto para almacenar los datos a actualizar

    // Verificar y actualizar el nombre de usuario
    if (username) {
      dataToUpdate.username = username;
    }

    // Verificar y actualizar el correo electrónico
    if (email) {
      dataToUpdate.email = email;
    }

    // Verificar y actualizar la contraseña
    if (password) {
      const hashedPassword = await hashPassword(password);
      dataToUpdate.password = hashedPassword;
    }

    // Verificar y actualizar el número de identificación (dni)
    if (dni) {
      dataToUpdate.dni = dni;
    }

    // Verificar y actualizar el ID del banco
    if (bankId) {
      dataToUpdate.bankId = bankId;
    }

    // Verificar y actualizar el ID del teléfono
    if (phoneId) {
      dataToUpdate.phoneId = phoneId;
    }

    // Verificar y actualizar el estado de verificación
    if (verified !== undefined) {
      dataToUpdate.verified = verified;
    }

    // Actualizar los datos del usuario utilizando Prisma
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // Especificar el usuario que se actualizará
      data: dataToUpdate, // Pasar los datos a actualizar
    });

    // Responder con el usuario actualizado
    res.status(200).json(updatedUser);
  } catch (error: any) {
    // Manejar errores
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({ error: "The email entered already exists" });
    } else if (error?.code === "P2025") {
      res.status(404).json("User not found");
    } else {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "There was an error, try later" });
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: number = parseInt(req.params.id);
  try {
    await prisma.user.delete({ where: { id: userId } });
    res.status(200).json({ message: `The user ${userId} has been deleted` });
  } catch (error: any) {
    if (error?.code === "P2025") {
      res.status(404).json("User not found");
    } else {
      console.log(error);
      res.status(500).json({
        error: "There was an error, try later",
      });
    }
  }
};
