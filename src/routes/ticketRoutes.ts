import express from "express";
import {
  createTicket,
  getTicketById,
  getTickets,
  updateTicket,
} from "../controllers/ticketController";

const router = express.Router();

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.put("/:id", updateTicket);

export default router;
