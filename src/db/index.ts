import mongoose from "mongoose";
import { HR_MDB_DB, HR_MDB_HOST, HR_MDB_PORT } from "src/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${HR_MDB_HOST}:${HR_MDB_PORT}/`, {
      //   user: HR_MDB_USER,
      //   pass: HR_MDB_PASSWORD,
      dbName: HR_MDB_DB,
    });
    console.log("CONNECTED TO THE DATABASE.");
  } catch (error) {
    console.error("FAILED TO CONNECT WITH THE DATABASE.", error);
  }
};
