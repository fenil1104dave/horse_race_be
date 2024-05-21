import express from "express";
import { connectDB } from "./db";
import "./utils/initContracts";
import { initRouters } from "./utils/initRouters";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";

import authenticate from "./middlewares/authenticate";

dotenv.config();

const app = express();

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

connectDB();

initRouters(app);

export default app;
