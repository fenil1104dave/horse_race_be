import mongoose from "mongoose";
import { playerSchema } from "src/db/player/schema";
import { stadiumSchema } from "src/db/stadium/schema";
import { trackSchema } from "src/db/track/schema";
const { Schema } = mongoose;

export const raceHistorySchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date },
  stadium: { type: stadiumSchema, required: true },
  track: { type: trackSchema, required: true },
  players: [playerSchema],
  is_cancelled: { type: Boolean, default: false },
});
