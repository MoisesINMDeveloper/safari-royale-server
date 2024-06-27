import prisma from "../models/phone.prisma";
import { Request, Response } from "express";

export const createPhone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code } = req.body;
    if (!code) {
      res.status(400).json({ error: `The code is required` });
      return;
    }

    // Verificar si el teléfono ya existe
    let phone = await prisma.findUnique({
      where: { code },
    });

    if (!phone) {
      // Crear el teléfono si no existe
      phone = await prisma.create({
        data: {
          code,
        },
      });
    }

    res.status(201).json(phone);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, try later." });
  }
};

export const getAllPhone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const phones = await prisma.findMany();
    res.status(200).json(phones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, try later." });
  }
};

export const getPhoneById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const phone_id: number = parseInt(req.params.id);
  try {
    const phone = await prisma.findUnique({ where: { id: phone_id } });
    if (!phone) {
      res.status(404).json({ error: "Phone not found" });
      return;
    }
    res.status(200).json(phone);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, try later." });
  }
};

export const updatePhone = async (
  req: Request,
  res: Response
): Promise<void> => {
  const phone_id: number = parseInt(req.params.id);
  const { code } = req.body;
  try {
    let dataToUpdate = { ...req.body };
    if (code) {
      dataToUpdate.code = code;
    }

    const phone = await prisma.update({
      where: {
        id: phone_id,
      },
      data: dataToUpdate,
    });
    res.status(200).json(phone);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const deletePhone = async (
  req: Request,
  res: Response
): Promise<void> => {
  const phone_id: number = parseInt(req.params.id);
  try {
    await prisma.delete({ where: { id: phone_id } });
    res.status(200).json({ message: `The phone ${phone_id} has been deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};
