import Log from "../../../utils/logs/log.utils";
import EError from "../../commonTypes/errors/error";

import { Color } from "./color";
import { NNumber } from "./number";

import ChessBoard from "../chessBoard";
import Move from "../move/move";
import Step from "../move/step";

/**
 * The Class ChessPiece.
 */
export default abstract class Piece {

    /** The color. */
    private color: Color;

    /** The number. */
    private number: NNumber;

    /**
     * Instantiates a new chess piece.
     *
     * @param color the color
     * @param nnumber the number
     */
    public constructor(color: Color, nnumber: NNumber) {
        this.color = color;
        this.number = nnumber;
    }

    /**
     * Gets the color.
     *
     * @return the color
     */
    public getColor(): Color {
        return this.color;
    }

    public getNumber(): NNumber {
        return this.number;
    }

    /**
     * Sets the color.
     *
     * @param color the new color
     */
    public setColor(color: Color): void {
        this.color = color;
    }

    public moves(): Move[] {
        return undefined;
    }

    /**
     * Potential moves.
     *
     * @param board the board
     * @return the list
     */
    public abstract potentialMoves(board: ChessBoard): Move[];

    /**
     * Steps.
     *
     * @param board the board
     * @return the list
     */
    public abstract steps(board: ChessBoard): Step[];

    /**
     * Gets the name.
     *
     * @return the name
     */
    public getName(): string {
        return this.constructor.name;
    }

    /**
     * Gets the full name.
     *
     * @return the full name
     */
    public getFullName(): string {
        return Log.format("%s %s %s", this.getColor(), this.getName(), this.getNumber());
    }

    public toJSON() {
        return {
            color: this.getColor(),
            number: this.getNumber(),
            name: this.getName()
        };
    }
}
