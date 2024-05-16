import { Types } from "mongoose";

export type Jockey = {
  _id: Types.ObjectId;
  name: string;
  date: Date;
  is_deleted: boolean;
};
