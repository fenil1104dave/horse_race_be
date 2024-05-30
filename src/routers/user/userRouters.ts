import { initServer } from "@ts-rest/express";
import { userContract } from "../../contracts/user/userContract";
import {
    refreshAuthToken,
    registerUser,
    validateUserLogin,
} from "../../controllers/userController";
import { errorResponse, successResponse } from "../../utils/responseUtils";
import { FormattedErrorParam } from "utils/errors";

const server = initServer();

export const userRouters = server.router(userContract, {
    createUser: async ({ body }) => {
        try {
            const user = await registerUser(body);

            return { status: 201, body: successResponse(user) };
        } catch (err) {
            const { message, name, status } = err as FormattedErrorParam;
            return {
                status: 500,
                body: errorResponse(message, name),
            };
        }
    },
    authUser: async ({ body }) => {
        try {
            const token = await validateUserLogin(body);

            return { status: 200, body: token };
        } catch (err) {
            const { message, name } = err as FormattedErrorParam;
            return { status: 401, body: errorResponse(message, name) };
        }
    },
    refreshToken: async ({ body }) => {
        try {
            const token = await refreshAuthToken(body.token);

            return { status: 200, body: { token } };
        } catch (err) {
            const { message, name } = err as FormattedErrorParam;
            return { status: 401, body: errorResponse(message, name) };
        }
    },
});
