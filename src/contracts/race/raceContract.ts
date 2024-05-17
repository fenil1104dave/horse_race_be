import { z } from "zod";
import {
  ClientError,
  ServerError,
  SuccessStatus,
} from "../../utils/statusCodes";
import { globalContract } from "../../utils/initContracts";
import { Race } from "./types";

const TrackSchema = z.object({
  name: z.string(),
  track_number: z.number().min(1),
  length: z.number().min(100),
  no_of_lanes: z.number().min(1),
  is_closed: z.boolean(),
});

const playerSchema = z.object({
  horse: z.string(),
  jockey: z.string(),
  lane_number: z.number(),
});

const CreateRaceSchema = z.object({
  name: z.string({ message: "Please enter valid name." }).min(1),
  started_at: z.string(),
  stadium: z.string(),
  track: z.string(),
  players: z.array(playerSchema),
  is_cancelled: z.boolean().optional(),
});

export const raceContract = globalContract.router(
  {
    createRace: {
      method: "POST",
      path: "/race",
      responses: {
        [SuccessStatus.CREATED]: globalContract.type<Race>(),
        [ServerError.INTERNAL_SERVER_ERROR]: globalContract.type<Error>(),
      },
      body: CreateRaceSchema,
      summary: "Create a Race.",
    },
    getRaces: {
      method: "GET",
      path: "/races",
      responses: {
        [SuccessStatus.OK]: globalContract.type<{
          races: any[];
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
        include_cancelled: z.boolean().optional(),
      }),
      summary: "Get all Races",
    },
    //   getRace: {
    //     method: "GET",
    //     path: "/races/:id",
    //     responses: {
    //       [SuccessStatus.OK]: globalContract.type<Race | null>(),
    //     },
    //     summary: "Get a Race",
    //   },
    //   DeleteRace: {
    //     method: "DELETE",
    //     path: "/races/:id",
    //     body: z.any(),
    //     responses: {
    //       [SuccessStatus.OK]: globalContract.type<Race | null>(),
    //     },
    //     summary: "Cancel a race",
    //   },
    //   updateRace: {
    //     method: "PUT",
    //     path: "/races/:id",
    //     body: z.optional(CreateRaceSchema),
    //     responses: {
    //       [SuccessStatus.OK]: globalContract.type<Race | null>(),
    //       [ClientError.BAD_REQUEST]: globalContract.type<string>(),
    //     },
    //     summary: "Update a Race",
    //   },
  },
  {
    pathPrefix: "/api/v1",
  }
);
