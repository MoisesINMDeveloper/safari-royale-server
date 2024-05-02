import { Bank } from "@prisma/client";

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  dni?: string | null;
  bankId: number | null; // Campo de referencia al ID del banco
  bank?: Bank; // Relación con el banco  phoneId?: number | null;
}
