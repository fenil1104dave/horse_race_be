import { initServer } from "@ts-rest/express";
import { userContract } from "../../contracts/user/userContract";
import {
  registerUser,
  validateUserLogin,
} from "../../controllers/userController";

const server = initServer();

export const userRouters = server.router(userContract, {
  createUser: async ({ body }) => {
    try {
      const user = await registerUser(body);

      return { status: 201, body: user };
    } catch (err) {
      return { status: 500, body: err as Error };
    }
  },
  authUser: async ({ body }) => {
    try {
      const token = await validateUserLogin(body);

      return { status: 200, body: { token } };
    } catch (err) {
      console.log(err);
      return { status: 401, body: err as Error };
    }
  },
});
