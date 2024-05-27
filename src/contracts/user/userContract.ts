import { z } from "zod";
import { ClientError, SuccessStatus } from "../../utils/statusCodes";
import { User } from "./types";
import { globalContract } from "../../utils/initContracts";
import {
    createUserSchema,
    loginUserSchema,
    refreshTokenSchema,
} from "../../schemas/userSchema";
import { createItemResponses } from "../../utils/contractResponseutils";

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
                [SuccessStatus.OK]: z.object({
                    token: z.string(),
                    refreshToken: z.string(),
                }),
                [ClientError.UNAUTHORIZED]: globalContract.type<Error>(),
            },
            body: loginUserSchema,
            summary: "Authenticate a user.",
        },
        refreshToken: {
            method: "POST",
            path: "/refresh",
            responses: {
                ...createItemResponses<User>(),
                [SuccessStatus.OK]: z.object({
                    token: z.string(),
                }),
                [ClientError.UNAUTHORIZED]: globalContract.type<Error>(),
            },
            body: refreshTokenSchema,
            summary: "Refresh a token",
        },

        // updateUser: {
        //   method: "PUT",
        //   path: "/user/:id",
        //   body: z.object({
        //     name: z.string({ message: "Please enter valid name" }).min(1),
        //     new_password: z
        //       .string({ message: "Please enter valid password." })
        //       .min(MIN_PASSWORD_LENGTH),
        //   }),
        //   responses: {
        //     [SuccessStatus.OK]: globalContract.type<User | null>(),
        //     [ClientError.BAD_REQUEST]: globalContract.type<string>(),
        //   },
        //   summary: "Update a user",
        // },
    },
    {
        pathPrefix: "/api/v1",
    }
);
