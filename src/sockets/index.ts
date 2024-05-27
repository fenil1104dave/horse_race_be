import { Server, Socket } from "socket.io";
import { raceSocket } from "./raceSocket";

const setupSockets = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("A user connected:", socket.id);

        // Import socket event handlers
        raceSocket(socket, io);
    });
};

export default setupSockets;
