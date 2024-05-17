import { Express } from "express";
import { createExpressEndpoints } from "@ts-rest/express";
import { contracts } from "../contracts";
import { horseRouter } from "../routers/horses";
import { jockeyRouter } from "../routers/jockey";
import { raceRouter } from "../routers/race";
import { stadiumRouter } from "../routers/stadium";
import { trackRouter } from "../routers/tracks";

const combinedRouters = {
  ...horseRouter,
  ...jockeyRouter,
  ...raceRouter,
  ...stadiumRouter,
  ...trackRouter,
};

export const initRouters = (app: Express) => {
  createExpressEndpoints(contracts, combinedRouters, app);
};
