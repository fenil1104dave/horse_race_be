import mongoose from "mongoose";
import { jockeySchema } from "./schema";

export const Jockey = mongoose.model("HR_jockeys", jockeySchema);
