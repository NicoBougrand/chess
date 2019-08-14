import express = require("express");

import Log from "../utils/logs/log.utils";
import AbstractController from "./controller.abstract";

/**
 * The Class Main.
 */
export default class ChessController extends AbstractController {
    public constructor() {
        super();
    }
    public initRoutes(appPrefix: string, router: express.Router): void {
        router.get("/", (req: express.Request, res: express.Response) => {
            res.render("pages/chessboard", {
                bonjour: "bonjour"
            });
        });
    }
}
