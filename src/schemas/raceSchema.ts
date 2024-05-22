import { z } from "zod";
import { createPlayerSchema } from "./playerSchema";
import { Types } from "mongoose";

export const raceSchema = z
  .object({
    name: z.string(),
    created_at: z.date().optional(),
    started_at: z.date(),
    players: z.array(z.instanceof(Types.ObjectId)),
    is_cancelled: z.boolean().default(false),
  })
  .strict();

export const createRaceSchema = z
  .object({
    name: z.string(),
    started_at: z.string(),
    players: z.array(createPlayerSchema),
    is_cancelled: z.boolean().default(false),
  })
  .strict();

export const updateRaceBodySchema = createRaceSchema
  .omit({
    is_cancelled: true,
  })
  .strict();
