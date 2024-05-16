import { Express } from "express";
import { createExpressEndpoints } from "@ts-rest/express";
import { contracts } from "../contracts";
import { horseRouter } from "../routers/horses";

const combinedRouters = {
  ...horseRouter,
};

export const initRouters = (app: Express) => {
  createExpressEndpoints(contracts, combinedRouters, app);
};
