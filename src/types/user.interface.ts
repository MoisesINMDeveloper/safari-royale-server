import { Bank, Phone } from "@prisma/client";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string | null;
  dni?: string | null;
  bankName: string | "" | null; // Campo de referencia al ID del banco
  phoneCode: string | "" | null;
  bank?: Bank; // Relación con el banco  phoneId?: number | null;
  CodePhone?: Phone;
}
