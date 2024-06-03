import { Socket } from "socket.io";
import { raceSocket } from "./raceSocket";
import SocketSingleton from "./SocketSingleton";

const setupSockets = async () => {
    const socketSingleton = SocketSingleton.getInstance();
    const io = await socketSingleton.init();

    io.on("connection", (socket: Socket) => {
        console.log("A user connected:", socket.id);

        // Handle reconnection attempts
        socket.on("reconnect_attempt", (attemptNumber) => {
            console.log(
                `User ${socket.id} is trying to reconnect. Attempt: ${attemptNumber}`
            );
        });

        // Handle successful reconnection
        socket.on("reconnect", (attemptNumber) => {
            console.log(
                `User ${socket.id} reconnected after ${attemptNumber} attempts`
            );
        });

        // Import socket event handlers
        raceSocket(socket, io);
    });
};

export default setupSockets;
