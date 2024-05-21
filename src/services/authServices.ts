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
  return token;
};
