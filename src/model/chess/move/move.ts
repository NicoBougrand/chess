
import Position from "./position";

export default class Move extends Position {
    /** The eat chess piece. */
    public _eatChessPiece: boolean;

    /**
     * Instantiates a new move.
     *
     * @param position the position
     * @param eatChessPiece the eat chess piece
     */
    public constructor(position: Position, eatChessPiece: boolean) {
        super(position.getColumn(), position.getLine());
        this._eatChessPiece = eatChessPiece;
    }

    public eatChessPiece(): boolean {
        return this._eatChessPiece;
    }
}
