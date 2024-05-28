import { initServer } from "@ts-rest/express";
import { userContract } from "../../contracts/user/userContract";
import {
    refreshAuthToken,
    registerUser,
    validateUserLogin,
} from "../../controllers/userController";
import { errorResponse, successResponse } from "../../utils/responseUtils";

const server = initServer();

export const userRouters = server.router(userContract, {
    createUser: async ({ body }) => {
        try {
            const user = await registerUser(body);

            return { status: 201, body: successResponse(user) };
        } catch (err) {
            return {
                status: 500,
                body: errorResponse(
                    "Internal Server Error",
                    (err as Error)?.message
                ),
            };
        }
    },
    authUser: async ({ body }) => {
        try {
            const token = await validateUserLogin(body);

            return { status: 200, body: token };
        } catch (err) {
            return { status: 401, body: errorResponse("Unauthorized", err) };
        }
    },
    refreshToken: async ({ body }) => {
        try {
            const token = await refreshAuthToken(body.token);

            return { status: 200, body: { token } };
        } catch (err) {
            return { status: 401, body: errorResponse("Unauthorized", err) };
        }
    },
});
