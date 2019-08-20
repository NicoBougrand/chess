import fs from "fs";
import _ from "lodash";
import path from "path";

import Config from "../../config/config";
import Log from "../../utils/logs/log.utils";
import EError from "../commonTypes/errors/error";
import MMap from "../commonTypes/map";

import Move from "./move/move";
import Position, { ColumnEnum, LineEnum } from "./move/position";
import { Color } from "./piece/color";
import { NNumber } from "./piece/number";

import Bishop from "./piece/impl/bishop";
import King from "./piece/impl/king";
import Knight from "./piece/impl/knight";
import Pawn from "./piece/impl/pawn";
import Queen from "./piece/impl/queen";
import Rook from "./piece/impl/rook";
import Piece from "./piece/piece";
import PieceConfiguration from "./piece/pieceConfiguration";

export default class ChessBoard {

    /**
     * Inits the.
     *
     * @param pieces the pieces
     * @return the chess board
     */
    public static init(id: string | number, ...configurations: PieceConfiguration[]): ChessBoard {
        Log.info("ChessBoard reinitialize with new game");
        return new ChessBoard(id, ...configurations);
    }

    public static newGame(id: string | number): ChessBoard {
        const chessBoard: ChessBoard = ChessBoard.init(id,
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
        Log.debug(chessBoard);
        ChessBoard.save(chessBoard);
        return chessBoard;
    }

    public static save(chessBoard: ChessBoard): void {
        try {
            fs.writeFileSync(path.join(Config.get().getSrcName(), "/games", chessBoard.id + ".json"), JSON.stringify(Array.from(chessBoard.board.entries())));
            Log.info("Chess game %s saved", chessBoard.id);
        } catch (e) {
            throw new EError(e, "An error occured when saving chess game %s", chessBoard.id);
        }
    }

    public static load(id: string): ChessBoard {
        let chessBoard: ChessBoard;
        try {
            const jsonString = fs.readFileSync(path.join(Config.get().getSrcName(), "/games", id + ".json"));
            Log.info("Chess game %s loaded", id);
            chessBoard = ChessBoard.toChessBoard(id, jsonString.toString());
            Log.debug(chessBoard);
        } catch (e) {
            throw new EError(e, "An error occured when loading chess game %s", id);
        }
        return chessBoard;
    }

    /** The format. */
    private static format: string = "%s : %s %s %s";

    private static toChessBoard(id: string, jsonChessboard: string): ChessBoard {
        const _inner = new MMap(JSON.parse(jsonChessboard));
        const board = new MMap();
        _inner.forEach((value: any, positionKey: string) => {
            board.set(positionKey, Object.setPrototypeOf(_.omit(value, "name"), PieceConfiguration.getPiecePrototype(value.name)));
        });
        return Object.setPrototypeOf({ id, board }, ChessBoard.prototype);
    }

    private id: string | number;

    /** The positions.
     * The key is construct position asKey
     */
    private board: MMap<string, Piece> = new MMap();

    /**
     * Instantiates a new chess board.
     *
     * @param pieces the pieces
     */
    private constructor(id: string | number, ...configurations: PieceConfiguration[]) {
        try {
            this.id = id;
            _(configurations).forEach((configuration: PieceConfiguration) => {
                this.board.set(configuration.getPosition().asKey(), configuration.getPiece());
            });

        } catch (e) {
            new EError(e, "Impossible to instanciate a " + this.constructor.name).log();
        }
    }

    /**
     * Moves.
     *
     * @param piece the piece
     */
    public potentialMovesFor(piece: Piece): void {
        Log.info(/*Level.NONE,*/ "---");
        const moves: Move[] = piece.potentialMoves(this);
        if (moves.length > 0) {
            _(moves).forEach((move: Move) => Log.info(/*Level.NONE,*/
                ChessBoard.format,
                piece.getFullName(),
                this.getPosition(piece).toString(),
                move.eatChessPiece() ? "x" : "-",
                move.toString()));
        } else {
            Log.info(/*Level.NONE,*/ "No move for " + piece.getFullName());
        }
    }

    /**
     * Gets the position.
     *
     * @param piece the piece
     * @return the position
     */
    public getPosition(piece: Piece): Position {
        const potentialPositions: Position[] = [];
        this.board.forEach((_piece: Piece, _positionKey: string) => {
            const position: Position = Position.fromKey(_positionKey);
            if (position && piece === _piece) {
                potentialPositions.push(position);
            }
        });
        if (potentialPositions.length === 0) {
            Log.error("The piece %s doesn't exist in the chessboard", piece.getFullName());
            return undefined;
        } else if (potentialPositions.length > 1) {
            Log.error("The piece %s exist multiple times in the chessboard", piece.getFullName());
            return undefined;
        } else {
            return potentialPositions.pop();
        }
    }

    /**
     * Potential moves.
     */
    public potentialMoves(): void {
        for (const piece of this.board.values()) {
            this.potentialMovesFor(piece);
        }
    }

    /**
     * Gets the piece.
     *
     * @param position the position
     * @return the piece
     */
    public getPiece(position: Position): Piece {
        return this.board.get(position.asKey());
    }

    public getId(): string | number {
        return this.id;
    }

}
