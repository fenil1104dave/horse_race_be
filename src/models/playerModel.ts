import mongoose, { Document } from "mongoose";

interface IPlayer extends Document {
  created_at: Date;
  horse: mongoose.Types.ObjectId | null;
  lane_number: number;
}

const { Schema } = mongoose;

const playerSchema = new Schema({
  created_at: { type: Date, default: Date.now },
  horse: { type: mongoose.Schema.Types.ObjectId, ref: "HR_horses" },
  lane_number: { type: Number, required: true },
});

export const Player = mongoose.model<IPlayer>("HR_players", playerSchema);
