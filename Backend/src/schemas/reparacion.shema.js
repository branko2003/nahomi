import { z } from "zod";

export const createReparacionSchema = z.object({
  cliente: z.string({
    required_error: "Requerido",
  }),
  tecnico: z.string({
    required_error: "Requerido",
  }),
  fecha_recepcion: z.string().datetime().optional(),
  fecha_devolucion: z.string().datetime().optional(),
  accesorios_dejados: z.array(z.string()).optional(),
  description_problema: z.string().optional(),
  garantia: z.number().int().positive().optional(),
  costo: z.number().int().positive().optional(),
  fotos: z.array(z.string()).optional(),
  aceptacion_cambios: z.boolean().optional(),
});