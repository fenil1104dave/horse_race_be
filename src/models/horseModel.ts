import mongoose, { Document } from "mongoose";

interface IHorse extends Document {
  name: string;
  created_at: Date;
  is_deleted: boolean;
}

const { Schema } = mongoose;

const horseSchema = new Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
});

export const Horse = mongoose.model<IHorse>("HR_horses", horseSchema);
