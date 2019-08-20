import express from "express";

import _ from "lodash";

import EError from "../model/commonTypes/errors/error";
import Log from "../utils/logs/log.utils";
import App from "./app";
import Config from "./config";

import CronUtils from "../utils/cron/cron.utils";

import AbstractError from "../model/commonTypes/errors/abstract.error";

import ChessController from "../controllers/chess.controller";
import AbstractController from "../controllers/controller.abstract";
import MainController from "../controllers/main.controller";
import Position from "../model/chess/move/position";

export default class Server {
    public static get(): Server {
        if (!this.instance) {
            this.instance = new Server();
        }
        return this.instance;
    }
    private static instance: Server;

    private application: App;
    private healthy: boolean = false;

    private constructor() {
        this.application = new App();
        this._configureStandardRoutes();
    }

    public start(): void {
        // start the express server
        const config: Config = this.application.config;
        this.application.app
            .listen(config.getPort(), async () => {
                Log.forceInfo("Application %s is started in mode %s", config.getAppName(), config.getEnv());
                Log.forceInfo("Host : %s - Port : %s - Prefix : %s", config.getHost(), config.getPort(), config.getRoutePrefix());
                CronUtils.launchAll();
                try {
                    await this.loadRoutes();
                    this.healthy = true;
                } catch (e) {
                    throw new EError(e).log();
                }
            });
    }

    public async loadRoutes(): Promise<void> {
        Log.info("Loading the routes");
        const controllers: AbstractController[] = [];
        controllers.push(new MainController());
        controllers.push(new ChessController());
        this.application.router.stack = [];
        if (controllers !== undefined) {
            _.forEach(controllers, (controller) => controller.init(this.application.app, this.application.router));
        }
        this._configureErrorRoutes();
        Log.info("Routes are loaded");
    }

    private _configureStandardRoutes(): void {
        const routePrefix: string = this.application.config.getRoutePrefix();
        this.application.app
            .get(`${routePrefix}/healthy`, (req, res) => {
                if (this.healthy) {
                    res.status(200).send("healthy");
                } else {
                    res.status(503).render("pages/error/default.pug", {errorCode: 503, errorMessage: "Service Unavailable"});
                }
            }).get(`${routePrefix}/alive`, (req, res) => {
                res.status(200).send("alive");
            })
            ;
    }

    private _configureErrorRoutes(): void {
        this.application.app
            // Handle 404
            .use((req, res) => {
                res.status(404).render("pages/error/404.pug");
            })
            // Handle 500
            .use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
                if (error instanceof AbstractError) {
                    error.log();
                } else {
                    Log.error(error);
                }
                res.status(500).render("pages/error/500.pug", {error});
            });
    }
}
