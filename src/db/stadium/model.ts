import mongoose from "mongoose";
import { stadiumSchema } from "./schema";

export const Stadium = mongoose.model("HR_stadiums", stadiumSchema);
