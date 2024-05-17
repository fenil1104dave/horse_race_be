import { Track } from "contracts/tracks/types";

export interface Stadium extends BaseDBModel {
  location: string;
  // TODO: Update tracks value to Track[]
  tracks: any[];
  is_closed: boolean;
}
