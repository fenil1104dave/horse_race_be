import mongoose, { Document } from "mongoose";
import { applyIdVirtual } from "../utils/schemaUtils";

interface User extends Document {
    name: string;
    created_at: Date;
    password: string;
    username: string;
    refreshToken?: string;
    is_deleted: boolean;
}

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, require: true, select: false },
    refreshToken: { type: String },
    created_at: { type: Date, default: Date.now },
    is_deleted: { type: Boolean, default: false },
});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

applyIdVirtual(userSchema);

export const User = mongoose.model<User>("HR_users", userSchema);
