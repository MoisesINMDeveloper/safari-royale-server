import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAnimal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const animal = await prisma.animal.create({
      data: { name },
    });
    res.status(201).json(animal);
  } catch (error) {
    console.error("Error creating animal:", error);
    res.status(500).json({ error: "Error creating animal" });
  }
};

export const getAllAnimals = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const animals = await prisma.animal.findMany();
    res.status(200).json(animals);
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.status(500).json({ error: "Error fetching animals" });
  }
};

export const getAnimalById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const animalId: number = parseInt(req.params.id);
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: animalId },
    });
    if (!animal) {
      res.status(404).json({ message: "Animal not found" });
      return;
    }
    res.status(200).json(animal);
  } catch (error) {
    console.error("Error fetching animal:", error);
    res.status(500).json({ error: "Error fetching animal" });
  }
};

export const updateAnimal = async (
  req: Request,
  res: Response
): Promise<void> => {
  const animalId: number = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const updatedAnimal = await prisma.animal.update({
      where: { id: animalId },
      data: { name },
    });
    res.status(200).json(updatedAnimal);
  } catch (error) {
    console.error("Error updating animal:", error);
    res.status(500).json({ error: "Error updating animal" });
  }
};

export const deleteAnimal = async (
  req: Request,
  res: Response
): Promise<void> => {
  const animalId: number = parseInt(req.params.id);
  try {
    await prisma.animal.delete({
      where: { id: animalId },
    });
    res
      .status(200)
      .json({ message: `Animal with ID ${animalId} has been deleted` });
  } catch (error) {
    console.error("Error deleting animal:", error);
    res.status(500).json({ error: "Error deleting animal" });
  }
};
