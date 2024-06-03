import mongoose, { Document } from "mongoose";
import { applyIdVirtual } from "../utils/schemaUtils";

interface IRaceHistory extends Document {
    name: string;
    created_at: Date;
    started_at: Date;
    players: mongoose.Types.ObjectId[];
    is_cancelled: boolean;
}

const { Schema } = mongoose;

const raceHistorySchema = new Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    started_at: { type: Date, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "HR_players" }],
    is_cancelled: { type: Boolean, default: false },
});

applyIdVirtual(raceHistorySchema);

export const RaceHistory = mongoose.model<IRaceHistory>(
    "HR_race_history",
    raceHistorySchema
);
