import express from "express";
import { connectDB } from "./db";
import "./utils/initContracts";
import { initRouters } from "./utils/initRouters";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import { Server, Socket } from "socket.io";
import { createServer } from "node:http";
import setupSockets from "./sockets";

import authenticate from "./middlewares/authenticate";

dotenv.config();

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // React app's URL
    },
});

setupSockets(io);

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport");

app.use(
    authenticate.unless({
        path: [
            { url: "/api/v1/login", methods: ["POST"] },
            { url: "/api/v1/register", methods: ["POST"] },
        ],
    })
);

// Database connection
connectDB();

// Initialize routes
initRouters(app);

export default server;
