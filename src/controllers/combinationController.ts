import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCombination = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { animalId, colorId } = req.body;

  if (!animalId || !colorId) {
    res.status(400).json({ error: "animalId and colorId are required" });
    return;
  }

  try {
    // Verificar si la combinación ya existe
    const existingCombination = await prisma.combination.findFirst({
      where: { animalId: animalId, colorId: colorId },
    });

    if (existingCombination) {
      // Si la combinación existe, devolverla
      res.status(200).json({
        id: existingCombination.id,
        animal: existingCombination.animalId,
        color: existingCombination.colorId,
      });
      return;
    }

    // Obtener los nombres del animal y del color
    const animal = await prisma.animal.findUnique({ where: { id: animalId } });
    const color = await prisma.color.findUnique({ where: { id: colorId } });

    if (!animal || !color) {
      res.status(404).json({ error: "Animal or Color not found" });
      return;
    }

    // Crear la nueva combinación
    const newCombination = await prisma.combination.create({
      data: {
        animalId: animalId,
        colorId: colorId,
        animalName: animal.name,
        colorName: color.name,
      },
      include: {
        animal: true,
        color: true,
      },
    });

    res.status(201).json({
      id: newCombination.id,
      animal: newCombination.animal,
      color: newCombination.color,
    });
  } catch (error) {
    console.error("Error creating combination:", error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

// Los demás controladores se mantienen igual...

export const getCombinations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const combinations = await prisma.combination.findMany({
      include: {
        animal: true,
        color: true,
      },
    });

    const formattedCombinations = combinations.map((combination) => ({
      id: combination.id,
      animal: combination.animal,
      color: combination.color,
    }));

    res.status(200).json(formattedCombinations);
  } catch (error) {
    console.error("Error retrieving combinations:", error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const getCombinationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const combinationId: number = parseInt(req.params.id);
  try {
    const combination = await prisma.combination.findUnique({
      where: { id: combinationId },
      include: {
        animal: true,
        color: true,
      },
    });
    if (!combination) {
      res.status(404).json({ error: "Combination not found" });
      return;
    }
    res.status(200).json({
      id: combination.id,
      animal: combination.animal,
      color: combination.color,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error, try later." });
  }
};

export const updateCombination = async (
  req: Request,
  res: Response
): Promise<void> => {
  const combinationId: number = parseInt(req.params.id);
  const { colorId, animalId } = req.body;

  try {
    const animal = await prisma.animal.findUnique({ where: { id: animalId } });
    const color = await prisma.color.findUnique({ where: { id: colorId } });

    if (!animal || !color) {
      res.status(404).json({ error: "Animal or Color not found" });
      return;
    }

    const updatedCombination = await prisma.combination.update({
      where: {
        id: combinationId,
      },
      data: {
        colorId: colorId,
        animalId: animalId,
        animalName: animal.name,
        colorName: color.name,
      },
      include: {
        animal: true,
        color: true,
      },
    });

    res.status(200).json({
      id: updatedCombination.id,
      animal: updatedCombination.animal,
      color: updatedCombination.color,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error, intenta más tarde" });
  }
};

export const deleteCombination = async (
  req: Request,
  res: Response
): Promise<void> => {
  const combinationId: number = parseInt(req.params.id);
  try {
    await prisma.combination.delete({
      where: { id: combinationId },
    });
    res
      .status(200)
      .json({ message: `Combination ${combinationId} has been deleted` });
  } catch (error: any) {
    if (error?.code === "P2025") {
      res.status(404).json("Combination not found");
    } else {
      console.error(error);
      res.status(500).json({ error: "There was an error, try later" });
    }
  }
};
