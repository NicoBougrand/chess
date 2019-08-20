import EError from "../../commonTypes/errors/error";

import Position from "../move/position";

import Bishop from "./impl/bishop";
import King from "./impl/king";
import Knight from "./impl/knight";
import Pawn from "./impl/pawn";
import Queen from "./impl/queen";
import Rook from "./impl/rook";
import Piece from "./piece";

/**
 * The Class PieceConfiguration.
 */
export default class PieceConfiguration {

    public static getPiecePrototype(pieceName: string) {
        switch (pieceName) {
            case "Bishop":
                return Bishop.prototype;
            case "King":
                return King.prototype;
            case "Knight":
                return Knight.prototype;
            case "Pawn":
                return Pawn.prototype;
            case "Queen":
                return Queen.prototype;
            case "Rook":
                return Rook.prototype;
            default:
                throw new EError(undefined, "Piece %s not defined", pieceName);
        }
    }

    /** The piece. */
    private piece: Piece;

    /** The position. */
    private position: Position;

    /**
     * Instantiates a new chess piece configuration.
     *
     * @param piece the piece
     * @param position the position
     */
    public constructor(piece: Piece, position: Position) {
        this.piece = piece;
        this.position = position;
    }

    /**
     * Gets the piece.
     *
     * @return the piece
     */
    public getPiece(): Piece {
        return this.piece;
    }

    /**
     * Gets the position.
     *
     * @return the position
     */
    public getPosition(): Position {
        return this.position;
    }

}
