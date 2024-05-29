import { Express } from "express";
import { createExpressEndpoints } from "@ts-rest/express";
import { contracts } from "../contracts";
import { horseRouter } from "../routers/horses";
import { raceRouter } from "../routers/race";
import { userRouters } from "../routers/user/userRouters";
import validateObjectId from "../middlewares/validateObjectId";

const combinedRouters = {
    ...horseRouter,
    ...raceRouter,
    ...userRouters,
};

export const initRouters = (app: Express) => {
    createExpressEndpoints(contracts, combinedRouters, app, {
        globalMiddleware: [validateObjectId],
    });
};
