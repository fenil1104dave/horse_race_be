import {
    InternalServerError,
    ResourceAlreadyExistError,
    UnauthorizedError,
    ValidationError,
} from "../utils/errors";
import { CreateUser, LoginUserBody } from "../contracts/user/types";
import { login, refreshAccessToken, register } from "../services/authServices";
import {
    findUserByUsername,
    isPasswordStringValid,
} from "../utils/authentication/authHelpers";

export const registerUser = async (data: CreateUser) => {
    try {
        const { username, password, name } = data;
        const isUserExist = await findUserByUsername(data.username);

        if (isUserExist)
            throw new ResourceAlreadyExistError("Username already exist.");

        if (!isPasswordStringValid(data.password))
            throw new ValidationError(
                "Password should have at least 8 characters, special characters and combination if capital and small letters."
            );

        const user = register({ username, password, name });

        return user;
    } catch (err) {
        throw new InternalServerError("Unknown error.");
    }
};

export const validateUserLogin = async (data: LoginUserBody) => {
    try {
        const { username, password } = data;
        const token = await login({ username, password });
        return token;
    } catch (err) {
        throw new UnauthorizedError("Wrong username or password.");
    }
};

export const refreshAuthToken = async (refreshToken: string) => {
    try {
        const { accessToken } = await refreshAccessToken(refreshToken);
        return accessToken;
    } catch (err) {
        throw new InternalServerError(
            "Unable to fetch token please try again later."
        );
    }
};
