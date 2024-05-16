import { z } from "zod";
import {
  ClientError,
  ServerError,
  SuccessStatus,
} from "../../utils/statusCodes";
import { Jockey } from "./types";
import { globalContract } from "../../utils/initContracts";

export const jockeyContract = globalContract.router(
  {
    createJockey: {
      method: "POST",
      path: "/jockey",
      responses: {
        [SuccessStatus.CREATED]: globalContract.type<Jockey>(),
        [ServerError.INTERNAL_SERVER_ERROR]: globalContract.type<Error>(),
      },
      body: z.object({
        name: z.string(),
        is_deleted: z.boolean().optional(),
      }),
      summary: "Add a jockey.",
    },
    getJockeys: {
      method: "GET",
      path: "/jockeys",
      responses: {
        [SuccessStatus.OK]: globalContract.type<{
          jockeys: Jockey[];
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
        include_deleted: z.boolean().optional(),
      }),
      summary: "Get all jockeys",
    },
    getJockey: {
      method: "GET",
      path: "/jockeys/:id",
      responses: {
        [SuccessStatus.OK]: globalContract.type<Jockey | null>(),
      },
      summary: "Get a jockey",
    },
    deleteJockey: {
      method: "DELETE",
      path: "/jockeys/:id",
      body: z.any(),
      responses: {
        [SuccessStatus.OK]: globalContract.type<Jockey | null>(),
      },
      summary: "Soft-Delete a jockey",
    },
    updateJockey: {
      method: "PUT",
      path: "/jockeys/:id",
      body: z.object({
        name: z.string({ message: "Please enter valid name." }).min(1),
      }),
      responses: {
        [SuccessStatus.OK]: globalContract.type<Jockey | null>(),
        [ClientError.BAD_REQUEST]: globalContract.type<string>(),
      },
      summary: "Update a jockey",
    },
  },
  {
    pathPrefix: "/api/v1",
  }
);
