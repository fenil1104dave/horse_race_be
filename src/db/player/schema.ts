import mongoose from "mongoose";
const { Schema } = mongoose;

export const playerSchema = new Schema({
  created_at: { type: Date, default: Date.now },
  horse: { type: mongoose.Schema.Types.ObjectId, ref: "HR_horses" },
  lane_number: { type: Number, required: true },
});
