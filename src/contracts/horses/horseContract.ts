import { z } from "zod";
import {
  ClientError,
  ServerError,
  SuccessStatus,
} from "../../utils/statusCodes";
import { Horse } from "./types";
import { globalContract } from "../../utils/initContracts";
import { createHorseSchema } from "../../schemas/horseSchema";

export const horsesContract = globalContract.router(
  {
    createHorse: {
      method: "POST",
      path: "/horse",
      responses: {
        [SuccessStatus.CREATED]: globalContract.type<Horse>(),
        [ServerError.INTERNAL_SERVER_ERROR]: globalContract.type<Error>(),
      },
      body: createHorseSchema,
      summary: "Add a horse.",
    },
    getHorses: {
      method: "GET",
      path: "/horses",
      responses: {
        [SuccessStatus.OK]: globalContract.type<{
          data: Horse[];
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
        include_deleted: z.boolean().optional(),
      }),
      summary: "Get all horses",
    },
    getHorse: {
      method: "GET",
      path: "/horses/:id",
      responses: {
        [SuccessStatus.OK]: globalContract.type<Horse | null>(),
      },
      summary: "Get a horse",
    },
    deleteHorse: {
      method: "DELETE",
      path: "/horses/:id",
      body: z.any(),
      responses: {
        [SuccessStatus.OK]: globalContract.type<Horse | null>(),
      },
      summary: "Soft-Delete a horse",
    },
    updateHorse: {
      method: "PUT",
      path: "/horses/:id",
      body: z.object({
        name: z.string({ message: "Please enter valid name." }).min(1),
      }),
      responses: {
        [SuccessStatus.OK]: globalContract.type<Horse | null>(),
        [ClientError.BAD_REQUEST]: globalContract.type<string>(),
      },
      summary: "Update a horse",
    },
  },
  {
    pathPrefix: "/api/v1",
  }
);
