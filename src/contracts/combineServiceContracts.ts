import { globalContract } from "../utils/initContracts";
import { horsesContract } from "./horses";
import { raceContract } from "./race";

export const contracts = globalContract.router({
  ...horsesContract,
  ...raceContract,
});
