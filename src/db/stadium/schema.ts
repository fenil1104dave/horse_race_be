import mongoose from "mongoose";
import { trackSchema } from "db/track/schema";
const { Schema } = mongoose;

export const stadiumSchema = new Schema({
  location: { type: String, required: true },
  tracks: [trackSchema],
  is_closed: { type: Boolean, default: false },
});
