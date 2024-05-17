import { z } from "zod";
import {
  ClientError,
  ServerError,
  SuccessStatus,
} from "../../utils/statusCodes";
import { Track } from "./types";
import { globalContract } from "../../utils/initContracts";

const TrackSchema = z.object({
  name: z.string(),
  track_number: z.number().min(1),
  length: z.number().min(100),
  no_of_lanes: z.number().min(1),
  stadium: z.string(),
  is_closed: z.boolean().optional(),
});

export const trackContract = globalContract.router(
  {
    createTrack: {
      method: "POST",
      path: "/track",
      responses: {
        [SuccessStatus.CREATED]: globalContract.type<Track>(),
        [ServerError.INTERNAL_SERVER_ERROR]: globalContract.type<Error>(),
      },
      body: TrackSchema,
      summary: "Add a Track.",
    },
    getTracks: {
      method: "GET",
      path: "/tracks",
      responses: {
        [SuccessStatus.OK]: globalContract.type<{
          tracks: Track[];
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
      summary: "Get all tracks",
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
