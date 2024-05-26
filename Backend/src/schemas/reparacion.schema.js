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
  //accesorios_dejados: z.array(z.string()).optional(),
  accesorios_dejados: z.string().optional().transform((str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return [];  // Devuelve un array vacío si hay un error al parsear
    }
  }),  
  description_problema: z.string().optional(),
  garantia: z.string().optional().transform((num) => parseInt(num)),
  costo: z.string().optional().transform((num) => parseInt(num)),
  //fotos: z.array(z.string()).optional(),
  fotos: z.string().optional().transform((str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return [];  // Devuelve un array vacío si hay un error al parsear
    }}),
  aceptacion_cambios: z.string().optional().transform((val) => val === 'true'),});