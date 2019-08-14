import Position from "../move/position";
import Piece from "./piece";

/**
 * The Class PieceConfiguration.
 */
export default class PieceConfiguration {

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
