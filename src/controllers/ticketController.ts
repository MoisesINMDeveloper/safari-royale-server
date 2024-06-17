import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, raffleId, combinationIds } = req.body;

  if (
    !userId ||
    !raffleId ||
    !combinationIds ||
    !Array.isArray(combinationIds)
  ) {
    res
      .status(400)
      .json({ error: "userId, raffleId, and combinationIds are required" });
    return;
  }

  try {
    // Verifica si el usuario ya tiene un ticket para este sorteo
    const existingTicket = await prisma.ticket.findFirst({
      where: {
        userId,
        raffleId,
      },
    });

    if (existingTicket) {
      res
        .status(400)
        .json({ error: "User already has a ticket for this raffle" });
      return;
    }

    // Crea el ticket
    const newTicket = await prisma.ticket.create({
      data: {
        userId,
        raffleId,
        combinations: {
          create: combinationIds.map((combinationId: number) => ({
            combinationId,
          })),
        },
      },
      include: {
        combinations: true,
      },
    });

    // Formatear la respuesta para incluir combinationIds en el formato deseado
    const formattedTicket = {
      id: newTicket.id,
      userId: newTicket.userId,
      raffleId: newTicket.raffleId,
      combinationId: newTicket.combinations.map((c) => c.combinationId),
    };

    res.status(201).json(formattedTicket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const getTickets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        combinations: true,
      },
    });

    const formattedTickets = tickets.map((ticket) => ({
      id: ticket.id,
      userId: ticket.userId,
      raffleId: ticket.raffleId,
      combinationId: ticket.combinations.map((c) => c.combinationId),
    }));

    res.status(200).json(formattedTickets);
  } catch (error) {
    console.error("Error retrieving tickets:", error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const getTicketById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ticketId: number = parseInt(req.params.id);
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        combinations: true,
      },
    });

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    const formattedTicket = {
      id: ticket.id,
      userId: ticket.userId,
      raffleId: ticket.raffleId,
      combinationId: ticket.combinations.map((c) => c.combinationId),
    };

    res.status(200).json(formattedTicket);
  } catch (error) {
    console.error("Error retrieving ticket:", error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};

export const updateTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ticketId: number = parseInt(req.params.id);
  const { combinationIds } = req.body;

  if (!combinationIds || !Array.isArray(combinationIds)) {
    res.status(400).json({ error: "combinationIds are required" });
    return;
  }

  try {
    // Actualiza el ticket
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        combinations: {
          deleteMany: {}, // Elimina todas las combinaciones actuales
          create: combinationIds.map((combinationId: number) => ({
            combinationId,
          })),
        },
      },
      include: {
        combinations: true,
      },
    });

    const formattedTicket = {
      id: updatedTicket.id,
      userId: updatedTicket.userId,
      raffleId: updatedTicket.raffleId,
      combinationId: updatedTicket.combinations.map((c) => c.combinationId),
    };

    res.status(200).json(formattedTicket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: "There was an error, try later" });
  }
};
// export const deleteTicket = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const ticketId: number = parseInt(req.params.id);

//   try {
//     await prisma.ticketCombination.deleteMany({
//       where: { ticketId },
//     });

//     await prisma.ticket.delete({
//       where: { id: ticketId },
//     });

//     res.status(200).json({ message: `Ticket ${ticketId} has been deleted` });
//   } catch (error) {
//     console.error("Error deleting ticket:", error);
//     res.status(500).json({ error: "There was an error, try later" });
//   }
// };
