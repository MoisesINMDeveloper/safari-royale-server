import { Request, Response } from "express";
import { hashPassword } from "../services/password.service";
import userPrisma from "../models/user.prisma";
import { generateToken } from "../services/auth.service";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      username,
      name,
      email,
      dni,
      password,
      phone,
      bankName,
      phoneCode,
      verified,
    } = req.body;

    if (
      !username ||
      !name ||
      !email ||
      !password ||
      !dni ||
      !verified ||
      !phone ||
      !bankName ||
      !phoneCode
    ) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const userData = {
      username,
      name,
      email,
      password: hashedPassword,
      dni,
      verified,
      phone,
      phoneCode: phoneCode,

      bankName: bankName,
    };

    const user = await userPrisma.create({
      data: userData,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userPrisma.findMany();
    const usersWithoutPassword = users.map((user) => ({
      ...user,
      token: user.verified ? generateToken(user) : undefined,
      password: undefined,
    }));
    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: number = parseInt(req.params.id);
  try {
    const user = await userPrisma.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const userWithoutPassword = {
      ...user,
      token: user.verified ? generateToken(user) : undefined,
      password: undefined,
    };
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: number = parseInt(req.params.id);
  const {
    username,
    email,
    password,
    dni,
    bankName,
    phoneCode,
    verified,
    phone,
  } = req.body;
  try {
    let dataToUpdate: any = {};

    if (username) {
      dataToUpdate.username = username;
    }
    if (email) {
      dataToUpdate.email = email;
    }
    if (password) {
      const hashedPassword = await hashPassword(password);
      dataToUpdate.password = hashedPassword;
    }
    if (dni) {
      dataToUpdate.dni = dni;
    }
    if (bankName) {
      dataToUpdate.bankName = bankName;
    }
    if (phoneCode) {
      dataToUpdate.phoneCode = phoneCode;
    }
    if (verified !== undefined) {
      dataToUpdate.verified = verified;
    }
    if (phone !== undefined) {
      dataToUpdate.phone = phone;
    }

    const updatedUser = await userPrisma.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    res.status(200).json(updatedUser);
  } catch (error: any) {
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
    await userPrisma.delete({ where: { id: userId } });
    res.status(200).json({ message: `The user ${userId} has been deleted` });
  } catch (error: any) {
    if (error?.code === "P2025") {
      res.status(404).json("User not found");
    } else {
      console.error(error);
      res.status(500).json({ error: "There was an error, try later" });
    }
  }
};
