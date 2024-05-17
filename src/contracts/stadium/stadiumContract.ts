import { z } from "zod";
import {
  ClientError,
  ServerError,
  SuccessStatus,
} from "../../utils/statusCodes";
import { Stadium } from "./types";
import { globalContract } from "../../utils/initContracts";

const StadiumSchema = z.object({
  name: z.string(),
  location: z.string(),
  tracks: z.array(z.any()).optional(),
  is_closed: z.boolean().optional(),
});

export const stadiumContract = globalContract.router(
  {
    createStadium: {
      method: "POST",
      path: "/stadium",
      responses: {
        [SuccessStatus.CREATED]: globalContract.type<Stadium>(),
        [ServerError.INTERNAL_SERVER_ERROR]: globalContract.type<Error>(),
      },
      body: StadiumSchema,
      summary: "Add a Stadium.",
    },
    getStadiums: {
      method: "GET",
      path: "/stadiums",
      responses: {
        [SuccessStatus.OK]: globalContract.type<{
          stadiums: Stadium[];
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
        is_closed: z.boolean().optional(),
      }),
      summary: "Get all stadiums",
    },
    // getHorse: {
    //   method: "GET",
    //   path: "/horses/:id",
    //   responses: {
    //     [SuccessStatus.OK]: globalContract.type<Horse | null>(),
    //   },
    //   summary: "Get a horse",
    // },
    // deleteHorse: {
    //   method: "DELETE",
    //   path: "/horses/:id",
    //   body: z.any(),
    //   responses: {
    //     [SuccessStatus.OK]: globalContract.type<Horse | null>(),
    //   },
    //   summary: "Soft-Delete a horse",
    // },
    // updateHorse: {
    //   method: "PUT",
    //   path: "/horses/:id",
    //   body: z.object({
    //     name: z.string({ message: "Please enter valid name." }).min(1),
    //   }),
    //   responses: {
    //     [SuccessStatus.OK]: globalContract.type<Horse | null>(),
    //     [ClientError.BAD_REQUEST]: globalContract.type<string>(),
    //   },
    //   summary: "Update a horse",
    // },
  },
  {
    pathPrefix: "/api/v1",
  }
);
