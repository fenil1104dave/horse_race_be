import { z } from "zod";

export const playerSchema = z.object({
  created_at: z.date().optional(),
  horse: z.string().nullable(),
  lane_number: z.number().nullable(),
});

export const createPlayerSchema = z.object({
  horse: z.string(),
  lane_number: z.number(),
});
