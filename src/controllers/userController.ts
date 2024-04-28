import { Request, Response } from "express";
import { hashPassword } from "../services/password.service";
import prisma from "../models/user.prisma";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, name, email, password } = req.body;
    if (!username) {
      res.status(400).json({ message: "The username is required" });
      return;
    }
    if (!name) {
      res.status(400).json({ message: "The name is required" });
      return;
    }
    if (!email) {
      res.status(400).json({ message: "The email is required" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "The password is required" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.create({
      data: {
        username,
        name,
        email,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error: any) {
    console.error("Error try again later: ", error);
    let statusCode: number = 500;
    let errorMessage: string = "There was an error try later";

    // Verifica si el error es debido a un correo electrónico duplicado
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      statusCode = 400;
      errorMessage = "El email ingresado ya existe.";
    }

    // Enviar respuesta con el código de estado y mensaje adecuados
    res.status(statusCode).json({ error: errorMessage });
  }
};
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.findMany();
    res.status(200).json(users);
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
    const user = await prisma.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
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
  const { username, name, email, password } = req.body;
  try {
    let dataToUpdate = { ...req.body };
    if (username) {
      dataToUpdate.username = username;
    }
    if (name) {
      dataToUpdate.name = name;
    }
    if (email) {
      dataToUpdate.email = email;
    }
    if (password) {
      const hashedPassword = await hashPassword(password);
      dataToUpdate.password = hashedPassword;
    }
    const user = await prisma.update({
      where: {
        id: userId,
      },
      data: dataToUpdate,
    });
    res.status(200).json(user);
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({ error: "The email entered already exists" });
    } else if (error?.code === "P2025") {
      res.status(404).json("User not found");
    } else {
      console.log(error);
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
    await prisma.delete({ where: { id: userId } });
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
