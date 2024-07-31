import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Requerido",
  }),
  tipo: z.string().optional(),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
});