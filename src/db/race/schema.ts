import mongoose from "mongoose";
import { playerSchema } from "../player/schema";
import { stadiumSchema } from "../stadium/schema";
import { trackSchema } from "../track/schema";
const { Schema } = mongoose;

export const raceHistorySchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date },
  stadium: { type: stadiumSchema, required: true },
  track: { type: trackSchema, required: true },
  players: [playerSchema],
  is_cancelled: { type: Boolean, default: false },
});
