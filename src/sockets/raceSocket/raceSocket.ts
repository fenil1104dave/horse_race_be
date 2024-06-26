import { Socket, Server } from "socket.io";
import { RaceSocketMessage } from "./raceSocketTypes";
import {
    GET_RACE_INTERVAL,
    RaceSocketMessageConstant,
} from "./raceSocketConstants";
import { getRaces } from "../../controllers/raceController";

let raceInterval: null | NodeJS.Timeout = null;

const emitRaces = async (io: Server) => {
    const races = await getRaces();

    const randomRaces = [];

    for (let i = 0; i < 6; i++) {
        randomRaces.push(races[Math.floor(Math.random() * races.length)]);
    }

    io.emit("raceMessage", {
        type: RaceSocketMessageConstant.GET_RACES,
        data: randomRaces,
    });
};

const getSocketRaces = async (io: Server) => {
    await emitRaces(io);
    raceInterval = setInterval(async () => {
        await emitRaces(io);
    }, GET_RACE_INTERVAL);
};

const disconnectRaces = (io: Server) => {
    if (raceInterval) clearInterval(raceInterval);
};

const raceSocketServiceMap = (data: RaceSocketMessage, io: Server) => {
    switch (data.type) {
        case RaceSocketMessageConstant.GET_RACES:
            getSocketRaces(io);
            break;
        case RaceSocketMessageConstant.DISCONNECT_RACES:
            disconnectRaces(io);
            break;
        default:
            break;
    }
};

export const raceSocket = (socket: Socket, io: Server) => {
    socket.on("raceMessage", (data: RaceSocketMessage) => {
        raceSocketServiceMap(data, io);
    });

    socket.on("disconnect", () => {
        disconnectRaces(io);
        console.log("Races disconnected");
    });
};
