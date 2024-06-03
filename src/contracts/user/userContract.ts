import { z } from "zod";
import { User } from "./types";
import { globalContract } from "../../utils/initContracts";
import {
    createUserSchema,
    loginUserSchema,
    refreshTokenSchema,
} from "../../schemas/userSchema";
import { createItemResponses } from "../../utils/contractResponseutils";
import HttpStatusCode from "../../utils/HTTPStatusCode";

export const userContract = globalContract.router(
    {
        createUser: {
            method: "POST",
            path: "/register",
            responses: createItemResponses<User>(),
            body: createUserSchema,
            summary: "Register a user.",
        },
        authUser: {
            method: "POST",
            path: "/login",
            responses: {
                ...createItemResponses<User>(),
                [HttpStatusCode.OK]: z.object({
                    token: z.string(),
                    refreshToken: z.string(),
                }),
                [HttpStatusCode.UNAUTHORIZED]: globalContract.type<Error>(),
            },
            body: loginUserSchema,
            summary: "Authenticate a user.",
        },
        refreshToken: {
            method: "POST",
            path: "/refresh",
            responses: {
                ...createItemResponses<User>(),
                [HttpStatusCode.OK]: z.object({
                    token: z.string(),
                }),
                [HttpStatusCode.UNAUTHORIZED]: globalContract.type<Error>(),
            },
            body: refreshTokenSchema,
            summary: "Refresh a token",
        },
    },
    {
        pathPrefix: "/api/v1",
    }
);
