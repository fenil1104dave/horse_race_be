import { z } from "zod";
import {
  ClientError,
  ServerError,
  SuccessStatus,
} from "../../utils/statusCodes";
import { User } from "./types";
import { globalContract } from "../../utils/initContracts";
import { createUserSchema, loginUserSchema } from "../../schemas/userSchema";
import { MIN_PASSWORD_LENGTH } from "../../utils/authentication/authenticationConstant";

export const userContract = globalContract.router(
  {
    createUser: {
      method: "POST",
      path: "/register",
      responses: {
        [SuccessStatus.CREATED]: globalContract.type<User>(),
        [ServerError.INTERNAL_SERVER_ERROR]: globalContract.type<Error>(),
      },
      body: createUserSchema,
      summary: "Register a user.",
    },
    authUser: {
      method: "POST",
      path: "/login",
      responses: {
        [SuccessStatus.OK]: z.object({ token: z.string() }),
        [ClientError.UNAUTHORIZED]: globalContract.type<Error>(),
        [ServerError.INTERNAL_SERVER_ERROR]: globalContract.type<Error>(),
      },
      body: loginUserSchema,
      summary: "Authenticate a user.",
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
