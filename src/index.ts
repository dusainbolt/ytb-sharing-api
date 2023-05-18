/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const dotenv = require("dotenv");
import { AppDataSource } from "./config/database";
dotenv.config();

const app = express();
const port = process.env.PORT;

AppDataSource.initialize()
    .then(async () => {
        console.log("=============== DB init successful ==================");

        app.get("/", (req, res) => {
            res.send("Express + TypeScript Server");
        });

        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => console.log(error));
