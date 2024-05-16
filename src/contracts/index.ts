import { initContract } from "@ts-rest/core";
import { horsesContract } from "./horses";

const c = initContract();

export const contracts = c.router(
  {
    horses: horsesContract,
  },
  {
    pathPrefix: "/api/v1",
  }
);
