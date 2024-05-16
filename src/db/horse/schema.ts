import mongoose from "mongoose";
const { Schema } = mongoose;

export const horseSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});
