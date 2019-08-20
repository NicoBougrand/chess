import express = require("express");

import EError from "../model/commonTypes/errors/error";

import AbstractController from "./controller.abstract";

import ChessBoard from "../model/chess/chessBoard";
import Counter from "../model/commonTypes/counter";

/**
 * The Class Main.
 */
export default class ChessController extends AbstractController {

    private static chessCounter: Counter = new Counter();

    public constructor() {
        super();
    }
    public initRoutes(appPrefix: string, router: express.Router): void {
        router.get("/", (req: express.Request, res: express.Response) => {
            res.render("pages/chess");
        }).get("/new", (req: express.Request, res: express.Response) => {
            const chessId = ChessController.chessCounter.get();
            ChessBoard.newGame(chessId);
            ChessController.chessCounter.increment();
            res.redirect(appPrefix + "/load/" + chessId);
        }).get("/load/:id", (req: express.Request, res: express.Response) => {
            try {
                res.render("pages/chess", { chessBoard: ChessBoard.load(req.params.id) });
            } catch (e) {
                new EError(e).log();
                res.sendStatus(500);
            }
        }).post("/save", (req: express.Request, res: express.Response) => {
            try {
                ChessBoard.save(req.body.chessBoard);
                res.sendStatus(200);
            } catch (e) {
                new EError(e).log();
                res.sendStatus(500);
            }
        });
    }

}
