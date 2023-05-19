/* eslint-disable @typescript-eslint/no-var-requires */
import "reflect-metadata";
import "source-map-support/register";

// Set env to test
process.env.NODE_ENV = "unit_test";

// Set env variables from .env file
import { config } from "dotenv";
config();

import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { createServer, Server as HttpServer } from "http";

import express from "express";
const request = require("supertest");
import * as supertest from "supertest";
import app from "../src";
import { join } from "path";

/**
 * TestFactory
 * - Loaded in each unit test
 * - Starts server and DB connection
 */

export class TestFactory {
    private _app: express.Application;
    private _connection: Connection;
    private _server: HttpServer;

    // DB connection options
    private options: ConnectionOptions = {
        type: "sqljs",
        database: new Uint8Array(),
        location: "database",
        logging: false,
        synchronize: true,
        entities: [join(__dirname, "..", "src/**/*.entity.js")],
    };

    public get app(): supertest.SuperTest<supertest.Test> {
        return request(this._app);
    }

    public get connection(): Connection {
        return this._connection;
    }

    public get server(): HttpServer {
        return this._server;
    }

    /**
     * Connect to DB and start server
     */
    public async init(): Promise<void> {
        this._connection = await createConnection(this.options);
        this._app = app;
        this._server = createServer(this._app).listen(process.env.PORT);
    }

    /**
     * Close server and DB connection
     */
    public async close(): Promise<void> {
        this._server.close();
        this._connection.close();
    }
}
