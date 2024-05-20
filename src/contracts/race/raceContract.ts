import { z } from "zod";
import {
  ClientError,
  ServerError,
  SuccessStatus,
} from "../../utils/statusCodes";
import { globalContract } from "../../utils/initContracts";
import { Race } from "./types";
import { createRaceSchema } from "../../schemas/raceSchema";

export const raceContract = globalContract.router(
  {
    createRace: {
      method: "POST",
      path: "/race",
      responses: {
        [SuccessStatus.CREATED]: globalContract.type<Race>(),
        [ServerError.INTERNAL_SERVER_ERROR]: globalContract.type<Error>(),
      },
      body: createRaceSchema,
      summary: "Create a Race.",
    },
    getRaces: {
      method: "GET",
      path: "/races",
      responses: {
        [SuccessStatus.OK]: globalContract.type<{
          data: any[];
          count: number;
        }>(),
      },
      headers: z.object({
        pagination: z.string().optional(),
      }),
      query: z.object({
        take: z.string().transform(Number).optional(),
        skip: z.string().transform(Number).optional(),
        search: z.string().optional(),
        include_cancelled: z.boolean().optional(),
      }),
      summary: "Get all Races",
    },
    getRace: {
      method: "GET",
      path: "/races/:id",
      responses: {
        [SuccessStatus.OK]: globalContract.type<Race | null>(),
      },
      summary: "Get a Race",
    },
    deleteRace: {
      method: "DELETE",
      path: "/races/:id",
      body: z.any(),
      responses: {
        [SuccessStatus.OK]: globalContract.type<Race | null>(),
      },
      summary: "Cancel a race",
    },
    updateRace: {
      method: "PUT",
      path: "/races/:id",
      body: z.optional(createRaceSchema.omit({ is_cancelled: true })),
      responses: {
        [SuccessStatus.OK]: globalContract.type<Race | null>(),
        [ClientError.BAD_REQUEST]: globalContract.type<string>(),
      },
      summary: "Update a Race",
    },
  },
  {
    pathPrefix: "/api/v1",
  }
);
