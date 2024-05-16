import mongoose from "mongoose";
import { playerSchema } from "./schema";

export const Player = mongoose.model("HR_horses", playerSchema);
