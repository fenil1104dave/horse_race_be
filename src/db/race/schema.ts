import mongoose from "mongoose";
const { Schema } = mongoose;

export const raceHistorySchema = new Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  started_at: { type: Date, required: true },
  stadium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HR_stadiums",
    default: null,
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HR_tracks",
    default: null,
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "HR_players" }],
  is_cancelled: { type: Boolean, default: false },
});
