import { Request, Response } from "express";
import { PrismaClient, RaffleStatus } from "@prisma/client";
import { parse, isValid, format } from "date-fns";
import { enUS } from "date-fns/locale";

const prisma = new PrismaClient();

const parseDate = (dateStr: string): Date | null => {
  const parsedDate = parse(dateStr, "dd/MM/yyyy", new Date(), { locale: enUS });
  return isValid(parsedDate) ? parsedDate : null;
};

const parseTime = (timeStr: string): Date | null => {
  const parsedTime = parse(timeStr, "HH:mm:ss", new Date(), { locale: enUS });
  return isValid(parsedTime) ? parsedTime : null;
};

const formatDate = (date: Date): string => {
  return format(date, "dd-MM-yyyy");
};

const formatTime = (time: Date): string => {
  return format(time, "HH:mm:ss");
};

// Filtra las propiedades no necesarias de los ganadores
const filterWinnerData = (winners: any[]) => {
  return winners.map(({ id, username, verified, balance }) => ({
    id,
    username,
    verified,
    balance,
  }));
};

export const createRaffle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date, time, status } = req.body;

    if (!date || !time || !status) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const parsedDate = parseDate(date);
    const parsedTime = parseTime(time);

    if (!parsedDate || !parsedTime) {
      res.status(400).json({ message: "Invalid date or time format" });
      return;
    }

    const raffle = await prisma.raffle.create({
      data: {
        date: parsedDate,
        time: parsedTime,
        status: status as RaffleStatus,
      },
    });

    res.status(201).json({
      ...raffle,
      date: formatDate(raffle.date),
      time: formatTime(raffle.time),
    });
  } catch (error) {
    console.error("Error creating raffle:", error);
    res.status(500).json({ error: "Error creating raffle" });
  }
};

export const getRaffles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const raffles = await prisma.raffle.findMany();
    const formattedRaffles = raffles.map((raffle) => ({
      ...raffle,
      date: formatDate(raffle.date),
      time: formatTime(raffle.time),
    }));
    res.status(200).json(formattedRaffles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const getRaffleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const raffleId: number = parseInt(req.params.id);
  try {
    const raffle = await prisma.raffle.findUnique({
      where: { id: raffleId },
    });
    if (!raffle) {
      res.status(404).json({ error: "Raffle not found" });
      return;
    }
    res.status(200).json({
      ...raffle,
      date: formatDate(raffle.date),
      time: formatTime(raffle.time),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const updateRaffle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const raffleId: number = parseInt(req.params.id);
  const { winningCombinationId, status, winners } = req.body;

  try {
    const dataToUpdate: {
      winningCombinationId?: number;
      status?: RaffleStatus;
      winners?: { connect: { id: number }[] };
    } = {};

    if (winningCombinationId !== undefined) {
      const winningCombination = await prisma.combination.findUnique({
        where: { id: winningCombinationId },
        include: { animal: true, color: true },
      });

      if (!winningCombination) {
        res.status(404).json({ message: "Winning combination not found" });
        return;
      }

      dataToUpdate.winningCombinationId = winningCombinationId;

      const winningTickets = await prisma.ticket.findMany({
        where: {
          raffleId: raffleId,
          combinations: {
            some: { combinationId: winningCombinationId },
          },
        },
        select: { userId: true },
      });

      if (winningTickets.length > 0) {
        dataToUpdate.winners = {
          connect: winningTickets.map((ticket) => ({ id: ticket.userId })),
        };
      } else {
        res
          .status(404)
          .json({ message: "No users found with the winning combination" });
        return;
      }
    }

    if (status) dataToUpdate.status = status as RaffleStatus;

    const updatedRaffle = await prisma.raffle.update({
      where: { id: raffleId },
      data: dataToUpdate,
      include: { winners: true },
    });

    const filteredWinners = filterWinnerData(updatedRaffle.winners);

    res.status(200).json({
      ...updatedRaffle,
      date: formatDate(updatedRaffle.date),
      time: formatTime(updatedRaffle.time),
      winners: filteredWinners,
    });
  } catch (error: any) {
    if (error?.code === "P2025") {
      res.status(404).json("Raffle not found");
    } else {
      console.error("Error updating raffle:", error);
      res.status(500).json({ error: "There was an error, try later" });
    }
  }
};

export const deleteRaffle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const raffleId: number = parseInt(req.params.id);
  try {
    await prisma.raffle.delete({ where: { id: raffleId } });
    res
      .status(200)
      .json({ message: `The raffle ${raffleId} has been deleted` });
  } catch (error: any) {
    if (error?.code === "P2025") {
      res.status(404).json("Raffle not found");
    } else {
      console.error(error);
      res.status(500).json({ error: "There was an error, try later" });
    }
  }
};
