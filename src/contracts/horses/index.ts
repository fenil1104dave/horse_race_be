import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ClientError, SuccessStatus } from "../../utils/statusCodes";
import { Horse } from "./types";

const c = initContract();

export const horsesContract = c.router({
  createHorse: {
    method: "POST",
    path: "/horse",
    responses: {
      [SuccessStatus.CREATED]: c.type<Horse>(),
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
      [SuccessStatus.OK]: c.type<{ horses: Horse[]; total: number }>(),
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
      [SuccessStatus.OK]: c.type<Horse>(),
    },
    summary: "Get a horse",
  },
});
