import express = require("express");

import Log from "../utils/logs/log.utils";
import AbstractController from "./controller.abstract";

import Position, { ColumnEnum, LineEnum } from "../model/chess/move/position";
import { Color } from "../model/chess/piece/color";
import { NNumber } from "../model/chess/piece/number";

import ChessBoard from "../model/chess/chessBoard";

import Bishop from "../model/chess/piece/impl/bishop";
import King from "../model/chess/piece/impl/king";
import Knight from "../model/chess/piece/impl/knight";
import Pawn from "../model/chess/piece/impl/pawn";
import Queen from "../model/chess/piece/impl/queen";
import Rook from "../model/chess/piece/impl/rook";
import PieceConfiguration from "../model/chess/piece/pieceConfiguration";

/**
 * The Class Main.
 */
export default class MainController extends AbstractController {

    /**
     * Game1.
     */
    private static game1() {
        Log.info("Game 1");
        const chessBoard: ChessBoard = ChessBoard.init(
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.ONE),
                new Position(ColumnEnum.D, LineEnum.SEVEN)),
            new PieceConfiguration(new Knight(Color.WHITE, NNumber.TWO),
                new Position(ColumnEnum.D, LineEnum.TWO)),
            new PieceConfiguration(new Rook(Color.WHITE, NNumber.ONE),
                new Position(ColumnEnum.D, LineEnum.FIVE)));
        ChessBoard.potentialMoves(chessBoard);
    }

    private static game2() {
        Log.info("Game 2");
        const chessBoard: ChessBoard = ChessBoard.init(
            /* WHITE */
            new PieceConfiguration(new Rook(Color.WHITE, NNumber.ONE),
                new Position(ColumnEnum.A, LineEnum.ONE)),
            new PieceConfiguration(new Knight(Color.WHITE, NNumber.ONE),
                new Position(ColumnEnum.B, LineEnum.ONE)),
            new PieceConfiguration(new Bishop(Color.WHITE, NNumber.ONE),
                new Position(ColumnEnum.C, LineEnum.ONE)),
            new PieceConfiguration(new Queen(Color.WHITE),
                new Position(ColumnEnum.D, LineEnum.ONE)),
            new PieceConfiguration(new King(Color.WHITE),
                new Position(ColumnEnum.E, LineEnum.ONE)),
            new PieceConfiguration(new Bishop(Color.WHITE, NNumber.TWO),
                new Position(ColumnEnum.F, LineEnum.ONE)),
            new PieceConfiguration(new Knight(Color.WHITE, NNumber.TWO),
                new Position(ColumnEnum.G, LineEnum.ONE)),
            new PieceConfiguration(new Rook(Color.WHITE, NNumber.TWO),
                new Position(ColumnEnum.H, LineEnum.ONE)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.ONE),
                new Position(ColumnEnum.A, LineEnum.TWO)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.TWO),
                new Position(ColumnEnum.B, LineEnum.TWO)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.THREE),
                new Position(ColumnEnum.C, LineEnum.TWO)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.FOUR),
                new Position(ColumnEnum.D, LineEnum.TWO)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.FIVE),
                new Position(ColumnEnum.E, LineEnum.TWO)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.SIX),
                new Position(ColumnEnum.F, LineEnum.TWO)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.SEVEN),
                new Position(ColumnEnum.G, LineEnum.TWO)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.EIGHT),
                new Position(ColumnEnum.H, LineEnum.TWO)),
            /* BLACK */
            new PieceConfiguration(new Rook(Color.BLACK, NNumber.ONE),
                new Position(ColumnEnum.A, LineEnum.EIGHT)),
            new PieceConfiguration(new Knight(Color.BLACK, NNumber.ONE),
                new Position(ColumnEnum.B, LineEnum.EIGHT)),
            new PieceConfiguration(new Bishop(Color.BLACK, NNumber.ONE),
                new Position(ColumnEnum.C, LineEnum.EIGHT)),
            new PieceConfiguration(new Queen(Color.BLACK),
                new Position(ColumnEnum.D, LineEnum.EIGHT)),
            new PieceConfiguration(new King(Color.BLACK),
                new Position(ColumnEnum.E, LineEnum.EIGHT)),
            new PieceConfiguration(new Bishop(Color.BLACK, NNumber.TWO),
                new Position(ColumnEnum.F, LineEnum.EIGHT)),
            new PieceConfiguration(new Knight(Color.BLACK, NNumber.TWO),
                new Position(ColumnEnum.G, LineEnum.EIGHT)),
            new PieceConfiguration(new Rook(Color.BLACK, NNumber.TWO),
                new Position(ColumnEnum.H, LineEnum.EIGHT)),
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.ONE),
                new Position(ColumnEnum.A, LineEnum.SEVEN)),
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.TWO),
                new Position(ColumnEnum.B, LineEnum.SEVEN)),
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.THREE),
                new Position(ColumnEnum.C, LineEnum.SEVEN)),
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.FOUR),
                new Position(ColumnEnum.D, LineEnum.SEVEN)),
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.FIVE),
                new Position(ColumnEnum.E, LineEnum.SEVEN)),
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.SIX),
                new Position(ColumnEnum.F, LineEnum.SEVEN)),
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.SEVEN),
                new Position(ColumnEnum.G, LineEnum.SEVEN)),
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.EIGHT),
                new Position(ColumnEnum.H, LineEnum.SEVEN)));
        ChessBoard.potentialMoves(chessBoard);
    }

    /**
     * Game3.
     */
    private static game3() {
        Log.info("Game 3");
        const chessBoard: ChessBoard = ChessBoard.init(
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.ONE),
                new Position(ColumnEnum.D, LineEnum.SEVEN)),
            new PieceConfiguration(new Pawn(Color.BLACK, NNumber.TWO),
                new Position(ColumnEnum.F, LineEnum.FOUR)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.ONE),
                new Position(ColumnEnum.F, LineEnum.THREE)),
            new PieceConfiguration(new Pawn(Color.WHITE, NNumber.TWO),
                new Position(ColumnEnum.E, LineEnum.THREE)),
            new PieceConfiguration(new Knight(Color.BLACK, NNumber.ONE),
                new Position(ColumnEnum.D, LineEnum.FOUR)),
            new PieceConfiguration(new Rook(Color.WHITE, NNumber.ONE),
                new Position(ColumnEnum.D, LineEnum.FIVE)),
            new PieceConfiguration(new Bishop(Color.WHITE, NNumber.ONE),
                new Position(ColumnEnum.D, LineEnum.TWO)),
            new PieceConfiguration(new Queen(Color.WHITE),
                new Position(ColumnEnum.C, LineEnum.FIVE)),
            new PieceConfiguration(new King(Color.BLACK),
                new Position(ColumnEnum.G, LineEnum.SIX)));
        ChessBoard.potentialMoves(chessBoard);
    }

    public constructor() {
        super();
    }

    public initRoutes(appPrefix: string, router: import("express").Router): void {
        router
            .get("/game1", (req: express.Request, res: express.Response) => {
                MainController.game1();
                res.status(200).send("ok");
            })
            .get("/game2", (req: express.Request, res: express.Response) => {
                MainController.game2();
                res.status(200).send("ok");
            })
            .get("/game3", (req: express.Request, res: express.Response) => {
                MainController.game3();
                res.status(200).send("ok");
            });
    }

}
