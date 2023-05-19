/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
import { AppDataSource } from "./config/database";
import userRoute from "./routes/user.route";
import videoRoute from "./routes/video.route";
dotenv.config();

const app = express();
const port = process.env.PORT;

AppDataSource.initialize()
    .then(async () => {
        console.log("=============== DB init successful ==================");

        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });

        // for parsing application/x-www-form-urlencoded
        app.use(express.urlencoded({ extended: true }));

        // for parsing multipart/form-data
        // app.use(_upload.array());
        // app.use(express.static("public"));
        app.use(express.static(__dirname + "/public"));

        app.use(cors({ origin: "http://localhost:3000" }));

        // Add headers
        app.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader("Access-Control-Allow-Origin", "*");

            // Request methods you wish to allow
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

            // Request headers you wish to allow
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader("Access-Control-Allow-Credentials", true);

            // Pass to next layer of middleware
            next();
        });

        // parse requests of content-type - application/json
        app.use(express.json()); /* bodyParser.json() is deprecated */

        // parse requests of content-type - application/x-www-form-urlencoded
        app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

        // simple route
        app.get("/", (req, res) => {
            res.json({ message: "Welcome to dulh181199@gmail.com application." });
        });

        app.use("/api/user", userRoute);
        app.use("/api/video", videoRoute);
    })
    .catch((error) => console.log(error));
