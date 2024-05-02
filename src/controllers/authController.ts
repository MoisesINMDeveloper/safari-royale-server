import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../services/password.service";
import prisma from "../models/user.prisma";
import { generateToken } from "../services/auth.service";
import { sendCodeVerification } from "../services/email.service"; // Importa la función de envío de correo electrónico

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, name, email, password, dni, bank, phone } = req.body;
  try {
    if (!username || !name || !email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        // dni,
        // bank: {
        //   create: bank, // assuming bank is an object with 'name' and 'code' properties
        // },
        // phone: {
        //   create: phone, // assuming phone is an object with 'code' property
        // },
      },
    });

    const verificationCode = generarCodigoVerificacion(); // Genera un código de verificación de 6 dígitos
    sendCodeVerification(user.email, verificationCode); // Envía el código de verificación al correo del usuario registrado

    // Si el usuario está verificado, genera y envía el token
    if (user.verified) {
      const token = generateToken(user);
      // Filtrar las propiedades a mostrar
      const userToSend = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        dni: user.dni,
        verified: user.verified,
        bankId: user.bankId,
        phoneId: user.phoneId,
        token: token,
      };
      res.status(201).json(userToSend);
    } else {
      // Filtrar las propiedades a mostrar
      const userToSend = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        dni: user.dni,
        verified: user.verified,
        bankId: user.bankId,
        phoneId: user.phoneId,
      };
      res.status(201).json({
        message: "User registered successfully. Please verify your email.",
        user: userToSend,
      });
    }
  } catch (error: any) {
    console.error("Registration error:", error);

    let statusCode = 500;
    let errorMessage = "There was an error in the register";
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      statusCode = 400;
      errorMessage = "The email entered already exists.";
    }
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
      return;
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
    // Verifica si el usuario está verificado
    if (!user.verified) {
      res.status(403).json({
        error: "User is not verified. Please verify your email.",
      });
      return;
    }
    // Actualiza el token después de la verificación del usuario
    const token = generateToken(user);
    // Filtrar las propiedades a mostrar
    const userToSend = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      dni: user.dni,
      verified: user.verified,
      bankId: user.bankId,
      phoneId: user.phoneId,
      token: token,
    };
    res.status(200).json(userToSend);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Función para generar un código de verificación de 6 dígitos
function generarCodigoVerificacion(): number {
  return Math.floor(100000 + Math.random() * 900000); // Genera un número aleatorio de 6 dígitos
}
