import ChessBoard from "../../chessBoard";
import Move from "../../move/move";
import MoveUtil from "../../move/move.util";
import Step from "../../move/step";
import StepUtil from "../../move/step.util";
import { Color } from "../color";
import { NNumber } from "../number";
import Piece from "../piece";

/**
 * The Class Bishop.
 */
export default class Bishop extends Piece {

    /**
     * Instantiates a new queen.
     *
     * @param color the color
     * @param number the number
     */
    public constructor(color: Color, nnumber: NNumber) {
        super(color, nnumber);
    }

    /**
     * {@inheritDoc}
     */
    public potentialMoves(board: ChessBoard): Move[] {
        return MoveUtil.recursiveMove(board, this, this.steps(board));
    }

    /**
     * {@inheritDoc}
     */
    public steps(board: ChessBoard): Step[] {
        return StepUtil.diags();
    }

}
