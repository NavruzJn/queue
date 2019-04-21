// tslint:disable-next-line:no-reference
/// <reference path="./types.d.ts" />

import {createServer} from "http";
import "reflect-metadata";
import mongoose from "mongoose";

import {app} from "./app";
import config from "./config";

export const server = createServer(app.callback());

mongoose.connect(config.databaseUrl, { /*config: { autoIndex: false }*/ });

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.databaseUrl);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed through app termination');
        process.exit(0);
    });
});

server.listen(config.port, () => {
    console.log(`Test backend is up and running on port ${config.port}`);
});
