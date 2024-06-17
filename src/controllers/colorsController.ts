import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createColor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const color = await prisma.color.create({
      data: { name },
    });
    res.status(201).json(color);
  } catch (error) {
    console.error("Error creating color:", error);
    res.status(500).json({ error: "Error creating color" });
  }
};

export const getAllColors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const colors = await prisma.color.findMany();
    res.status(200).json(colors);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ error: "Error fetching colors" });
  }
};

export const getColorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const colorId: number = parseInt(req.params.id);
  try {
    const color = await prisma.color.findUnique({
      where: { id: colorId },
    });
    if (!color) {
      res.status(404).json({ message: "Color not found" });
      return;
    }
    res.status(200).json(color);
  } catch (error) {
    console.error("Error fetching color:", error);
    res.status(500).json({ error: "Error fetching color" });
  }
};

export const updateColor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const colorId: number = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const updatedColor = await prisma.color.update({
      where: { id: colorId },
      data: { name },
    });
    res.status(200).json(updatedColor);
  } catch (error) {
    console.error("Error updating color:", error);
    res.status(500).json({ error: "Error updating color" });
  }
};

export const deleteColor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const colorId: number = parseInt(req.params.id);
  try {
    await prisma.color.delete({
      where: { id: colorId },
    });
    res
      .status(200)
      .json({ message: `Color with ID ${colorId} has been deleted` });
  } catch (error) {
    console.error("Error deleting color:", error);
    res.status(500).json({ error: "Error deleting color" });
  }
};
