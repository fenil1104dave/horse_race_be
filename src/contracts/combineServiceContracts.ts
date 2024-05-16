import { globalContract } from "../utils/initContracts";
import { horsesContract } from "./horses/horseContract";

export const contracts = globalContract.router({
  ...horsesContract,
});
