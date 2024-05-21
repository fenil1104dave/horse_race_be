import { globalContract } from "../utils/initContracts";
import { horsesContract } from "./horses";
import { raceContract } from "./race";
import { userContract } from "./user/userContract";

export const contracts = globalContract.router({
  ...horsesContract,
  ...raceContract,
  ...userContract,
});
