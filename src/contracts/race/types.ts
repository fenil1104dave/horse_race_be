import {
  createRaceSchema,
  raceSchema,
  updateRaceBodySchema,
} from "schemas/raceSchema";
import { z } from "zod";

export type Race = z.TypeOf<typeof raceSchema>;

export type CreateRace = z.TypeOf<typeof createRaceSchema>;

export type UpdateRaceBody = Partial<z.TypeOf<typeof updateRaceBodySchema>>;
