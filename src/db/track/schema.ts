import mongoose from "mongoose";
const { Schema } = mongoose;

export const trackSchema = new Schema({
  name: { type: String, required: true },
  track_number: { type: Number, required: true },
  length: { type: Number, required: true },
  no_of_lanes: { type: Number, required: true },
  is_closed: { type: Boolean, default: false },
});
