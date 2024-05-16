import mongoose from "mongoose";
const { Schema } = mongoose;

export const jockeySchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
});
