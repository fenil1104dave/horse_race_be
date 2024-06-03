import { z } from "zod";
import { Horse } from "./types";
import { globalContract } from "../../utils/initContracts";
import {
  createHorseSchema,
  updateHorseSchema,
} from "../../schemas/horseSchema";
import {
  createItemResponses,
  deleteItemByIdResponse,
  getAllItemsResponses,
  getItemByIdResponse,
  updateItemByIdResponse,
} from "../../utils/contractResponseutils";

export const horsesContract = globalContract.router(
  {
    createHorse: {
      method: "POST",
      path: "/horse",
      responses: createItemResponses<Horse>(),
      body: createHorseSchema,
      summary: "Add a horse.",
    },
    getHorses: {
      method: "GET",
      path: "/horses",
      responses: getAllItemsResponses<Horse>(),
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
      responses: getItemByIdResponse<Horse>(),
      summary: "Get a horse",
    },
    deleteHorse: {
      method: "DELETE",
      path: "/horses/:id",
      body: z.any(),
      responses: deleteItemByIdResponse<Horse>(),
      summary: "Soft-Delete a horse",
    },
    updateHorse: {
      method: "PUT",
      path: "/horses/:id",
      body: updateHorseSchema,
      responses: updateItemByIdResponse<Horse>(),
      summary: "Update a horse",
    },
  },
  {
    pathPrefix: "/api/v1",
  }
);
