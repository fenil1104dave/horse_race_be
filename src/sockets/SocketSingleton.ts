import { Server } from "socket.io";
import http from "http";
import { HR_EXPRESS_PORT } from "../config";
import app from "../app";

class SocketSingleton {
    private static instance: SocketSingleton;
    public io: Server | null = null;
    public server: http.Server | null = null;
    private port: number;

    private constructor() {
        this.port = HR_EXPRESS_PORT || 3000;
    }

    public static getInstance(): SocketSingleton {
        if (!SocketSingleton.instance) {
            SocketSingleton.instance = new SocketSingleton();
        }
        return SocketSingleton.instance;
    }

    public async init(): Promise<Server> {
        if (this.io) {
            console.log("Socket.IO is already initialized.");
            return this.io;
        }

        this.server = http.createServer(app);
        this.io = new Server(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });

        this.server.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });

        return this.io;
    }
}

export default SocketSingleton;
