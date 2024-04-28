import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../services/password.service";
import prisma from "../models/user.prisma";
import { generateToken } from "../services/auth.service";
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, name, email, password } = req.body;
  try {
    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }
    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "Password is required" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    const user = await prisma.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error: any) {
    console.error("Registration error:", error);

    let statusCode = 500;
    let errorMessage = "There was an error in the register";
    // Verifica si el error es debido a un correo electrónico duplicado
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      statusCode = 400;
      errorMessage = "The email entered already exists.";
    }
    // Enviar respuesta con el código de estado y mensaje adecuados
    res.status(statusCode).json({ error: errorMessage });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      res.status(400).json({ message: "The email is required." });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "The password is required" });
    }
    const user = await prisma.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        error: "Username and passwords do not match",
      });
      return;
    }
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.log("error: ", error);
  }
};
