import { Express } from "express";
import { createExpressEndpoints } from "@ts-rest/express";
import { contracts } from "src/contracts";
import { horseRouter } from "src/routers/horses";

const combinedRouters = {
  ...horseRouter,
};

export const initRouters = (app: Express) => {
  createExpressEndpoints(contracts, combinedRouters, app);
};
