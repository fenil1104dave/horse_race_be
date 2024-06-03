import mongoose from "mongoose";
import {
    HR_MDB_DB,
    HR_MDB_HOST,
    HR_MDB_PORT,
    MAX_RETRIES,
    RETRY_DELAY,
} from "../config";

let retries = 0;

export const connectDB = async () => {
    const connectWithRetry = async () => {
        try {
            await mongoose.connect(`mongodb://${HR_MDB_HOST}:${HR_MDB_PORT}/`, {
                //   user: HR_MDB_USER,
                //   pass: HR_MDB_PASSWORD,
                dbName: HR_MDB_DB,
            });
            console.log("CONNECTED TO THE DATABASE.");
            retries = 0; // Reset retries on successful connection
        } catch (error) {
            retries += 1;
            console.error(
                `FAILED TO CONNECT WITH THE DATABASE. Retry ${retries}/${MAX_RETRIES}`,
                error
            );

            if (retries < MAX_RETRIES) {
                setTimeout(connectWithRetry, RETRY_DELAY);
            } else {
                console.error("Max retries reached. Exiting...");
                process.exit(1);
            }
        }
    };

    await connectWithRetry();
};

export const disconnectDB = async () => {
    await mongoose.connection.close();
    console.log("DISCONNECTED FROM THE DATABASE.");
};

// Graceful shutdown
const gracefulShutdown = async () => {
    console.log("Shutting down gracefully...");
    try {
        await disconnectDB();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
    }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
