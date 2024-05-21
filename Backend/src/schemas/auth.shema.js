import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Usuario no valido",
  }),
  email: z
    .string({
      required_error: "Email requerido",
    })
    .email({
      message: "Email no valido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, {
      message: "Contraseña de al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
  .string({
    required_error: "Email requerido",
  }).email({message: "Email invalido"}),
  password: z.string({
    required_error: "Contraseña requerida",
  }).min(6,{
    message: "Contraseña de al menos 6 caracteres",
  }),
});