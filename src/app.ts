import express from "express";
import { connectDB } from "./db";
import "./utils/initContracts";
import { initRouters } from "./utils/initRouters";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

initRouters(app);

export default app;
