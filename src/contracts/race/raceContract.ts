import { z } from "zod";
import { globalContract } from "../../utils/initContracts";
import { Race } from "./types";
import { createRaceSchema } from "../../schemas/raceSchema";
import {
    createItemResponses,
    deleteItemByIdResponse,
    getAllItemsResponses,
    getItemByIdResponse,
    updateItemByIdResponse,
} from "../../utils/contractResponseutils";

export const raceContract = globalContract.router(
    {
        createRace: {
            method: "POST",
            path: "/race",
            responses: createItemResponses<Race>(),
            body: createRaceSchema,
            summary: "Create a Race.",
        },
        getRaces: {
            method: "GET",
            path: "/races",
            responses: getAllItemsResponses<Race>(),
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
            responses: getItemByIdResponse<Race>(),
            summary: "Get a Race",
        },
        deleteRace: {
            method: "DELETE",
            path: "/races/:id",
            body: z.any(),
            responses: deleteItemByIdResponse<Race>(),
            summary: "Cancel a race",
        },
        updateRace: {
            method: "PUT",
            path: "/races/:id",
            body: createRaceSchema.omit({ is_cancelled: true }).partial(),
            responses: updateItemByIdResponse<Race>(),
            summary: "Update a Race",
        },
    },
    {
        pathPrefix: "/api/v1",
    }
);
