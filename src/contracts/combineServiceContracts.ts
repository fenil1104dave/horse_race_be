import { globalContract } from "../utils/initContracts";
import { horsesContract } from "./horses/horseContract";
import { jockeyContract } from "./jockey/jockeyContract";

export const contracts = globalContract.router({
  ...horsesContract,
  ...jockeyContract,
});
