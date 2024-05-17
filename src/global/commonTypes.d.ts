import { Types } from "mongoose";

declare global {
  interface BaseDBModel {
    _id: Types.ObjectId;
    name: string;
  }
}
