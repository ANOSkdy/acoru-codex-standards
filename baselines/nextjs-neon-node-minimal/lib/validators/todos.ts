import { z } from "zod";

export const todoIdSchema = z.coerce.number().int().positive();

export const todoListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const createTodoSchema = z.object({
  title: z.string().trim().min(1).max(200),
});

export const patchTodoSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    completed: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided.",
  });
