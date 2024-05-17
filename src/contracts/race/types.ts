import { Horse } from "contracts/horses/types";
import { Jockey } from "contracts/jockey/types";
import { Stadium } from "contracts/stadium/types";
import { Track } from "contracts/tracks/types";

export type Player = {
  horse: Horse;
  jockey: Jockey;
  lane_number: number;
};

export interface Race extends BaseDBModel {
  created_at: Date;
  started_at: Date;
  stadium: Stadium | null;
  track: Track | null;
  players: Player[];
  is_cancelled: boolean;
}
