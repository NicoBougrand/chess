import _ from "lodash";

import ChessBoard from "../../chessBoard";
import Move from "../../move/move";
import MoveUtil from "../../move/move.util";
import { LineEnum } from "../../move/position";
import Position from "../../move/position";
import Step from "../../move/step";
import StepUtil from "../../move/step.util";
import { Color } from "../color";
import { NNumber } from "../number";
import Piece from "../piece";

/**
 * The Class Bishop.
 */
export default class Pawn extends Piece {

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
        return _.concat(this._movesWithoutEat(board), this._movesWithEat(board));
    }

    /**
     * {@inheritDoc}
     */
    public steps(board: ChessBoard): Step[] {
        if (this._isFirstMove(board)) {
            if (Color.BLACK === this.getColor()) {
                return [StepUtil.down(), StepUtil.down().then(StepUtil.down())];
            } else {
                return [StepUtil.up(), StepUtil.up().then(StepUtil.up())];
            }
        } else {
            if (Color.BLACK === this.getColor()) {
                return [StepUtil.down()];
            } else {
                return [StepUtil.up()];
            }
        }
    }

    /**
     * Steps for eat.
     *
     * @param board the board
     * @return the list
     */
    public stepsForEat(board: ChessBoard): Step[] {
        // Not managing spacial move ('en-passant' capturing)
        if (Color.BLACK === this.getColor()) {
            return [StepUtil.down().then(StepUtil.right()), StepUtil.down().then(StepUtil.left())];
        } else {
            return [StepUtil.up().then(StepUtil.right()), StepUtil.up().then(StepUtil.left())];
        }
    }

    /**
     * Moves without eat.
     *
     * @param board the board
     * @return the list
     */
    private _movesWithoutEat(board: ChessBoard): Move[] {
        return _.filter(MoveUtil.move(board, this, this.steps(board)), (m: Move) => !m.eatChessPiece());
    }

    /**
     * Moves witht eat.
     *
     * @param board the board
     * @return the list
     */
    private _movesWithEat(board: ChessBoard): Move[] {
        return _.filter(MoveUtil.move(board, this, this.stepsForEat(board)), (m: Move) => m.eatChessPiece());

    }

    /**
     * Checks if is first move.
     *
     * @param board the board
     * @return true, if is first move
     */
    private _isFirstMove(board: ChessBoard): boolean {
        const currentPos: Position = board.getPosition(this);
        const line: LineEnum = currentPos.getLine();
        if (Color.BLACK === this.getColor()) {
            return (LineEnum.SEVEN === line);
        } else {
            return (LineEnum.TWO === line);
        }
    }

}
