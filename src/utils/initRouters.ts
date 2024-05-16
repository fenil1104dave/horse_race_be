import { Express } from "express";
import { createExpressEndpoints } from "@ts-rest/express";
import { contracts } from "../contracts";
import { horseRouter } from "../routers/horses";
import { jockeyRouter } from "../routers/jockey";

const combinedRouters = {
  ...horseRouter,
  ...jockeyRouter,
};

export const initRouters = (app: Express) => {
  createExpressEndpoints(contracts, combinedRouters, app);
};
