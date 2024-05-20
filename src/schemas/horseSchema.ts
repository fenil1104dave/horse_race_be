import { z } from "zod";

export const horseSchema = z.object({
  name: z.string(),
  created_at: z.date().optional(),
  is_deleted: z.boolean().default(false),
});

export const createHorseSchema = z.object({
  name: z.string(),
  is_deleted: z.boolean().default(false),
});
