import express from "express";
import _ from "lodash";

import EError from "../model/commonTypes/errors/error";

// type AbstractControllerClass = new <T extends AbstractController>(...args: T[]) => T;

export default abstract class AbstractController {
    public constructor() {
        if (this.constructor === AbstractController) {
            throw new EError(new TypeError("Abstract class 'AbstractController' cannot be instantiated directly"));
        }
    }

    public init(app: express.Application, router: express.Router): void {
        const appPrefix: string = app.get("routePrefix");
        this.initRoutes(appPrefix, router);
        app.use(appPrefix, router);
    }

    public abstract initRoutes(appPrefix: string, router: express.Router): void;
}
