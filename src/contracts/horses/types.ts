import { Types } from "mongoose";

export type Horse = {
  _id: Types.ObjectId;
  name: string;
  date: Date;
  is_deleted: boolean;
};
