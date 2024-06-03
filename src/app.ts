import express from "express";
import "./utils/initContracts";
import { initRouters } from "./utils/initRouters";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

import authenticate from "./middlewares/authenticate";

dotenv.config();

const app = express();

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
            { url: "/api/v1/refresh", methods: ["POST"] },
        ],
    })
);

// Initialize routes
initRouters(app);

export default app;
