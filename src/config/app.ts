import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import _ from "lodash";
import sassMiddleware from "node-sass-middleware";
import path from "path";

import ServerToClient from "../middlewares/serverToClient";
import Config from "./config";

export default class App {
    public app: express.Application;
    public config: Config;
    public router: express.Router;

    public constructor() {
        this.app = express();
        this.router = express.Router();
        this._config();

        this._initializeMiddlewares();
    }

    private _initializeMiddlewares(): void {
        this.app
            .use(compression())
            // Parse URL-encoded bodies (as sent by HTML forms)
            .use(express.urlencoded({ extended: true }))
            // Parse JSON bodies (as sent by API clients)
            .use(express.json())
            .use(cookieParser(this.config.getSecretKey(), {}))
            .use(sassMiddleware({
                src: path.join(this.config.getSrcName(), "stylesheets"),
                dest: path.join(this.config.getPublicDir(), "css"),
                outputStyle: "compressed",
                debug: false,
                sourceMap: true,
                prefix: `${this.config.getPublicPrefix()}/css`,
            }))
            .use(ServerToClient.set({
                appName: this.config.getAppName(),
                routePrefix: this.config.getRoutePrefix()
            }))
            .use(this.config.getPublicPrefix(), express.static(this.config.getPublicDir())); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
    }

    private _config(): void {
        this.config = Config.get();
        this.app
            .set("host", this.config.getHost())
            .set("port", this.config.getPort())
            .set("appName", this.config.getAppName())
            .set("routePrefix", this.config.getRoutePrefix())
            .set("views", path.join(this.config.getSrcName(), "views"))
            .set("view engine", "pug");
    }
}
