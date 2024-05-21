import { CreateUser, LoginUserBody } from "../contracts/user/types";
import { login, register } from "../services/authServices";
import {
  findUserByUsername,
  isPasswordStringValid,
} from "../utils/authentication/authHelpers";

export const registerUser = async (data: CreateUser) => {
  try {
    const { username, password, name } = data;
    const isUserExist = await findUserByUsername(data.username);

    if (isUserExist) throw new Error("Username already exist.");

    if (!isPasswordStringValid(data.password))
      throw new Error(
        "Password should have at least 8 characters, special characters and combination if capital and small letters."
      );

    const user = register({ username, password, name });

    return user;
  } catch (err) {
    return err as Error;
  }
};

export const validateUserLogin = async (data: LoginUserBody) => {
  try {
    const { username, password } = data;
    const token = await login({ username, password });
    return token;
  } catch (err) {
    throw err;
  }
};
