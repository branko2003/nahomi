import { z } from "zod";

export const createClienteSchema = z.object({
    nombre: z.string({
        required_error: "Requerido",
    }),
    password: z
        .string({
            required_error: "Contraseña requerida",
        })
        .min(6, {
            message: "Contraseña de al menos 6 caracteres",
        }),
    email: z
        .string({
            required_error: "Email requerido",
        })
        .email({
            message: "Email no valido",
        }),
});
