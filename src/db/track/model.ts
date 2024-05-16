import mongoose from "mongoose";
import { trackSchema } from "./schema";

export const Track = mongoose.model("HR_jockeys", trackSchema);
