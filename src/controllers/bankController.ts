import prisma from "../models/bank.prisma";
import { Request, Response } from "express";

export const createBank = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code, name, id } = req.body;

    if (!code || !name) {
      res.status(400).json({ message: "Both code and name are required" });
      return;
    }

    // Verificar si el banco ya existe
    let bank = await prisma.findFirst({
      where: { code },
    });

    if (!bank) {
      // Crear el banco si no existe
      bank = await prisma.create({
        data: {
          id,
          name,
          code,
        },
      });
    }

    res.status(201).json(bank);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const getAllBanks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const banks = await prisma.findMany();
    res.status(200).json(banks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error try later." });
  }
};

export const getBankById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bank_id: number = parseInt(req.params.id);
  try {
    const bank = await prisma.findUnique({ where: { id: bank_id } });
    if (!bank) {
      res.status(404).json({ error: "Bank not found" });
      return;
    }
    res.status(200).json(bank);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error try later." });
  }
};

export const updateBank = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bank_id: number = parseInt(req.params.id);
  const { code, name } = req.body;
  try {
    let dataToUpdate = { ...req.body };
    if (code) {
      dataToUpdate.code = code;
    }
    if (name) {
      dataToUpdate.name = name;
    }
    const bank = await prisma.update({
      where: {
        id: bank_id,
      },
      data: dataToUpdate,
    });
    res.status(200).json(bank);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const deleteBank = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bank_id: number = parseInt(req.params.id);
  try {
    await prisma.delete({ where: { id: bank_id } });
    res.status(200).json({ message: `The bank ${bank_id} has been deleted` });
  } catch (error: any) {
    if (error?.code === "P2025") {
      res.status(404).json("Bank not found");
    } else {
      console.log(error);
      res.status(500).json({
        error: "There was an error, try later",
      });
    }
  }
};
