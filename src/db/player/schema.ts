import mongoose from "mongoose";
import { horseSchema } from "../horse/schema";
import { jockeySchema } from "../jockey/schema";
const { Schema } = mongoose;

export const playerSchema = new Schema(
  {
    jockey: { type: jockeySchema, required: true },
    horse: { type: horseSchema, required: true },
    lane_number: { type: Number, required: true },
  },
  { _id: false }
);
