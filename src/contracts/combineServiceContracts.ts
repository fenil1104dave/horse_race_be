import { initContract } from "@ts-rest/core";
import { horsesContract } from "./horses/horseContract";

export const globalContract = initContract();

export const contracts = globalContract.router({
  ...horsesContract,
});
