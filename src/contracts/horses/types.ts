import { createHorseSchema, horseSchema } from "../../schemas/horseSchema";
import { z } from "zod";

export type Horse = z.TypeOf<typeof horseSchema>;

export type CreateHorse = z.TypeOf<typeof createHorseSchema>;

export type UpdateHorseBody = { name: string };
