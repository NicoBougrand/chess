import _ from "lodash";

import Move from "./move";
import Position from "./position";
import Step from "./step";

import ChessBoard from "../chessBoard";
import { Color } from "../piece/color";
import Piece from "../piece/piece";

/**
 * The Class MoveUtil.
 */
export default class MoveUtil {

    /**
     * Recursiv move.
     *
     * @param board the board
     * @param myColor the my color
     * @param currentPosition the current position
     * @param nextStep the next step
     * @return the list
     */
    public static recursiveMove(board: ChessBoard, piece: Piece, nextSteps: Step[]): Move[] {
        return _.flatMap(
            _(nextSteps)
                .map((step: Step) => this._recursiveMove(board, piece.getColor(), ChessBoard.getPosition(board, piece), step))
                .value()
        );
    }

    /**
     * Move.
     *
     * @param board the board
     * @param myColor the my color
     * @param currentPosition the current position
     * @param nextStep the next step
     * @return the list
     */
    public static move(board: ChessBoard, piece: Piece, nextSteps: Step[]) {
        return _.flatMap(
            _(nextSteps)
                .map((step: Step) => this._move(board, piece.getColor(), ChessBoard.getPosition(board, piece), step))
                .value()
        );
    }

    /**
     * Recursiv move.
     *
     * @param board the board
     * @param myColor the my color
     * @param currentPosition the current position
     * @param nextStep the next step
     * @return the list
     */
    private static _recursiveMove(board: ChessBoard, color: Color, position: Position, nextStep: Step): Move[] {
        return this._nextMoves(board, color, position, nextStep, true);
    }

    /**
     * Move.
     *
     * @param board the board
     * @param myColor the my color
     * @param currentPosition the current position
     * @param nextStep the next step
     * @return the list
     */
    private static _move(board: ChessBoard, color: Color, position: Position, nextStep: Step): Move[] {
        return this._nextMoves(board, color, position, nextStep, false);
    }

    /**
     * Move.
     *
     * @param board the board
     * @param myColor the my color
     * @param currentPosition the current position
     * @param nextStep the next step
     * @param recursiv the recursiv
     * @return the list
     */
    private static _nextMoves(board: ChessBoard, myColor: Color, currentPosition: Position, nextStep: Step, isRecursive: boolean): Move[] {
        let moves: Move[] = [];

        const nextPosition: Position = nextStep.step(currentPosition);

        // nextPosition is null => board of a chess board
        if (!nextPosition) {
            return moves;
        } else {
            // We must check the square
            const nextPiece: Piece = board.getPiece(nextPosition);
            // nextPiece is null => square is empty => we can go on it
            if (!nextPiece) {
                moves.push(new Move(nextPosition, false));
                // If no limit of move, recursiv
                if (isRecursive) {
                    moves = _.concat(moves, this._nextMoves(board, myColor, nextPosition, nextStep, isRecursive));
                }
            } else {
                // There is another piece on the square
                const nextColor: Color = nextPiece.getColor();
                // Piece is of my color => no move on it possible
                if (nextColor === myColor) {
                    return moves;
                } else {
                    // We can eat the piece and go on the square
                    // But must check if the my king is check
                    moves.push(new Move(nextPosition, true));
                }
            }
        }
        return moves;
    }

    /**
     * Instantiates a new move util.
     */
    private constructor() {
    }
}
