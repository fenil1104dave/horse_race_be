import { Horse } from "contracts/horses/types";
import { Player } from "contracts/players/types";

export interface Race extends BaseDBModel {
  created_at: Date;
  started_at: Date;
  players: Player[];
  is_cancelled: boolean;
}
