import { Stadium } from "contracts/stadium/types";

export interface Track extends BaseDBModel {
  track_number: number;
  length: number;
  no_of_lanes: number;
  // TODO: Update the type of stadium to Stadium | null
  stadium: any;
  is_closed: boolean;
}
