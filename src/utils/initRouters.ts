import { Express } from "express";
import { createExpressEndpoints } from "@ts-rest/express";
import { contracts } from "../contracts";
import { horseRouter } from "../routers/horses";
import { raceRouter } from "../routers/race";

const combinedRouters = {
  ...horseRouter,
  ...raceRouter,
};

export const initRouters = (app: Express) => {
  createExpressEndpoints(contracts, combinedRouters, app);
};
