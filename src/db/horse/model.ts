import mongoose from "mongoose";
import { horseSchema } from "./schema";

export const Horse = mongoose.model("HR_horses", horseSchema);
