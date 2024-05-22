import mongoose, { Document } from "mongoose";

interface User extends Document {
  name: string;
  created_at: Date;
  password: string;
  username: string;
  is_deleted: boolean;
}

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
});

export const User = mongoose.model<User>("HR_users", userSchema);
