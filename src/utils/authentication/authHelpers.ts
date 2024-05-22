import { User } from "../../models/userModels";
import { VALID_PASSWORD_REGEX } from "./authenticationConstant";

export const findUserByUsername = async (username: string) => {
  const user = await User.findOne({ username }).exec();

  return user?.toObject();
};

export const isPasswordStringValid = (password: string) => {
  return VALID_PASSWORD_REGEX.test(password);
};
