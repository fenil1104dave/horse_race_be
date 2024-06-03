import { connectDB } from "./db";
import setupSockets from "./sockets";
import SocketSingleton from "./sockets/SocketSingleton";

const startServer = async () => {
    try {
        // Database connection
        await connectDB();

        await setupSockets();

        // Graceful shutdown
        const gracefulShutdown = async () => {
            console.log("Shutting down gracefully...");
            const socketSingleton = SocketSingleton.getInstance();
            const io = socketSingleton.io;

            if (io) {
                io.close(() => {
                    console.log("Socket.IO server closed.");
                    process.exit(0);
                });
            }
        };

        process.on("SIGINT", gracefulShutdown);
        process.on("SIGTERM", gracefulShutdown);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();
