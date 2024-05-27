import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/userModels";
import { JWT_SECRET } from "../config/JWTConfig";

export const register = async (userData: {
    username: string;
    password: string;
    name: string;
}) => {
    const { username, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, name });
    await user.save();
    return user.toObject();
};

export const login = async (userData: {
    username: string;
    password: string;
}) => {
    const { username, password } = userData;
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, JWT_SECRET!, { expiresIn: "7d" });

    user.refreshToken = refreshToken;
    await user.save();
    return { token, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const payload = jwt.verify(refreshToken, JWT_SECRET!) as { id: string };
        const user = await User.findById(payload.id);

        if (!user || user.refreshToken !== refreshToken) {
            throw new Error("Invalid refresh token");
        }

        const newAccessToken = jwt.sign({ id: user._id }, JWT_SECRET!, {
            expiresIn: "1h",
        });

        return { accessToken: newAccessToken };
    } catch (err) {
        throw new Error("Invalid refresh token");
    }
};
