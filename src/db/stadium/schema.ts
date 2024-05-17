import mongoose from "mongoose";
const { Schema } = mongoose;

export const stadiumSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "HR_tracks" }],
  is_closed: { type: Boolean, default: false },
});
