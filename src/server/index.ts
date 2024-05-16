import express from "express";
import * as bodyParser from "body-parser";

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

export { server };
