import mongoose from "mongoose";
import { raceHistorySchema } from "./schema";

export const RaceHistory = mongoose.model("HR_race_history", raceHistorySchema);
