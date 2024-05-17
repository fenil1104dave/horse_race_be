import { globalContract } from "../utils/initContracts";
import { horsesContract } from "./horses";
import { jockeyContract } from "./jockey";
import { raceContract } from "./race";
import { stadiumContract } from "./stadium";
import { trackContract } from "./tracks";

export const contracts = globalContract.router({
  ...horsesContract,
  ...jockeyContract,
  ...raceContract,
  ...stadiumContract,
  ...trackContract,
});
