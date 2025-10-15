import { validateCPF } from "@/app/utils/validate_cpf";
import z from "zod";

  export const schema = z
    .object({
      name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
      email: z.string().email("Email inválido"),
      cpf: z
        .string()
        .min(14, "CPF incompleto")
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00")
        .refine((cpf) => validateCPF(cpf), {
          message: "CPF inválido",
        }),
      password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
      confirmPassword: z.string().min(8, "Confirmação de senha deve ter pelo menos 8 caracteres")
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    })