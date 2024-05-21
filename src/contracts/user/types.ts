import {
  createUserSchema,
  loginUserSchema,
  userSchema,
} from "../../schemas/userSchema";
import { z } from "zod";

export type User = z.TypeOf<typeof userSchema>;

export type CreateUser = z.TypeOf<typeof createUserSchema>;

export type LoginUserBody = z.TypeOf<typeof loginUserSchema>;
