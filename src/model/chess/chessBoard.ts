import _ from "lodash";

import Log from "../../utils/logs/log.utils";
import EError from "../commonTypes/errors/error";
import MMap from "../commonTypes/map";

import Move from "./move/move";
import Position from "./move/position";
import Piece from "./piece/piece";
import PieceConfiguration from "./piece/pieceConfiguration";

export default class ChessBoard {

    /**
     * Inits the.
     *
     * @param pieces the pieces
     * @return the chess board
     */
    public static init(...configurations: PieceConfiguration[]): ChessBoard {
        Log.info("ChessBoard reinitialize with new game");
        return new ChessBoard(...configurations);
    }

    /**
     * Moves.
     *
     * @param piece the piece
     */
    public static potentialMovesFor(chessBoard: ChessBoard, piece: Piece): void {
        Log.info(/*Level.NONE,*/ "---");
        const moves: Move[] = piece.potentialMoves(chessBoard);
        if (moves.length > 0) {
            _(moves).forEach((move: Move) => Log.info(/*Level.NONE,*/
                this.format,
                piece.getFullName(),
                ChessBoard.getPosition(chessBoard, piece).toString(),
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
    public static getPosition(board: ChessBoard, piece: Piece): Position {
        // List < Entry < Position, ChessPiece >> potentialPositions = board.board.entrySet().stream()
        //     .filter(e -> piece.equals(e.getValue())).collect(Collectors.toList());

        const potentialPositions: Position[] = [];
        board.board.forEach((_piece: Piece, _position: Position) => {
            if (piece === _piece) {
                potentialPositions.push(_position);
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
    public static potentialMoves(chessBoard: ChessBoard): void {
        for (const piece of chessBoard.board.values()) {
            ChessBoard.potentialMovesFor(chessBoard, piece);
        }
    }

    /** The format. */
    private static format: string = "%s : %s %s %s";

    /** The positions. */
    private board: MMap<Position, Piece> = new MMap();

    /**
     * Instantiates a new chess board.
     *
     * @param pieces the pieces
     */
    private constructor(...configurations: PieceConfiguration[]) {
        try {
            _(configurations).forEach((configuration: PieceConfiguration) => {
                this.board.set(configuration.getPosition(), configuration.getPiece());
            });

        } catch (e) {
            new EError(e, "Impossible to instanciate a " + this.constructor.name).log();
        }
    }

    /**
     * Gets the piece.
     *
     * @param position the position
     * @return the piece
     */
    public getPiece(position: Position): Piece {
        return this.board.get(position);
    }

}
