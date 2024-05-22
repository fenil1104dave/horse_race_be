import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    created_at: z.date().optional(),
    is_deleted: z.boolean().default(false),
  })
  .strict();

export const createUserSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
    is_deleted: z.boolean().default(false),
  })
  .strict();

export const loginUserSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();
