import { z } from "zod";
import { ServerError, SuccessStatus } from "src/utils/statusCodes";
import { Horse } from "./types";
import { globalContract } from "src/contracts/combineServiceContracts";

export const horsesContract = globalContract.router(
  {
    createHorse: {
      method: "POST",
      path: "/horse",
      responses: {
        [SuccessStatus.CREATED]: globalContract.type<Horse>(),
        [ServerError.INTERNAL_SERVER_ERROR]: globalContract.type<Error>(),
      },
      body: z.object({
        name: z.string(),
        is_deleted: z.boolean().optional(),
      }),
      summary: "Add a horse.",
    },
    getHorses: {
      method: "GET",
      path: "/horses",
      responses: {
        [SuccessStatus.OK]: globalContract.type<{
          horses: Horse[];
          total: number;
        }>(),
      },
      headers: z.object({
        pagination: z.string().optional(),
      }),
      query: z.object({
        take: z.string().transform(Number).optional(),
        skip: z.string().transform(Number).optional(),
        search: z.string().optional(),
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
  },
  {
    pathPrefix: "/api/v1",
  }
);
