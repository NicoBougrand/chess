import Log from "../../../utils/logs/log.utils";

/**
 * The possible Column
 */
enum ColumnEnum {

    /** The a. */
    A,
    /** The b. */
    B,
    /** The c. */
    C,
    /** The d. */
    D,
    /** The e. */
    E,
    /** The f. */
    F,
    /** The g. */
    G,
    /** The h. */
    H
}

/**
 * The possible Line.
 */
enum LineEnum {

    /** The one. */
    ONE = 1,
    /** The two. */
    TWO = 2,
    /** The three. */
    THREE = 3,
    /** The four. */
    FOUR = 4,
    /** The five. */
    FIVE = 5,
    /** The six. */
    SIX = 6,
    /** The seven. */
    SEVEN = 7,
    /** The eight. */
    EIGHT = 8
}

/**
 * The position of a piece.
 */
export default class Position {
    public static up(current: Position): Position {
        let line: LineEnum;
        if (current) {
            switch (current.getLine()) {
                case LineEnum.ONE:
                    line = LineEnum.TWO;
                    break;
                case LineEnum.TWO:
                    line = LineEnum.THREE;
                    break;
                case LineEnum.THREE:
                    line = LineEnum.FOUR;
                    break;
                case LineEnum.FOUR:
                    line = LineEnum.FIVE;
                    break;
                case LineEnum.FIVE:
                    line = LineEnum.SIX;
                    break;
                case LineEnum.SIX:
                    line = LineEnum.SEVEN;
                    break;
                case LineEnum.SEVEN:
                    line = LineEnum.EIGHT;
                    break;
                case LineEnum.EIGHT:
                default:
                    return undefined;
            }
            return new Position(current.getColumn(), line);
        }
        return undefined;
    }

    public static down(current: Position): Position {
        let line: LineEnum;
        if (current) {
            switch (current.getLine()) {
                case LineEnum.TWO:
                    line = LineEnum.ONE;
                    break;
                case LineEnum.THREE:
                    line = LineEnum.TWO;
                    break;
                case LineEnum.FOUR:
                    line = LineEnum.THREE;
                    break;
                case LineEnum.FIVE:
                    line = LineEnum.FOUR;
                    break;
                case LineEnum.SIX:
                    line = LineEnum.FIVE;
                    break;
                case LineEnum.SEVEN:
                    line = LineEnum.SIX;
                    break;
                case LineEnum.EIGHT:
                    line = LineEnum.SEVEN;
                    break;
                case LineEnum.ONE:
                default:
                    return undefined;
            }
            return new Position(current.getColumn(), line);
        }
        return undefined;
    }

    public static left(current: Position): Position {
        let column: ColumnEnum;
        if (current!) {
            switch (current.getColumn()) {
                case ColumnEnum.B:
                    column = ColumnEnum.A;
                    break;
                case ColumnEnum.C:
                    column = ColumnEnum.B;
                    break;
                case ColumnEnum.D:
                    column = ColumnEnum.C;
                    break;
                case ColumnEnum.E:
                    column = ColumnEnum.D;
                    break;
                case ColumnEnum.F:
                    column = ColumnEnum.E;
                    break;
                case ColumnEnum.G:
                    column = ColumnEnum.F;
                    break;
                case ColumnEnum.H:
                    column = ColumnEnum.G;
                    break;
                case ColumnEnum.A:
                default:
                    return undefined;
            }
            return new Position(column, current.getLine());
        }
        return undefined;
    }

    public static right(current: Position): Position {
        let column: ColumnEnum;
        if (current) {
            switch (current.getColumn()) {
                case ColumnEnum.A:
                    column = ColumnEnum.B;
                    break;
                case ColumnEnum.B:
                    column = ColumnEnum.C;
                    break;
                case ColumnEnum.C:
                    column = ColumnEnum.D;
                    break;
                case ColumnEnum.D:
                    column = ColumnEnum.E;
                    break;
                case ColumnEnum.E:
                    column = ColumnEnum.F;
                    break;
                case ColumnEnum.F:
                    column = ColumnEnum.G;
                    break;
                case ColumnEnum.G:
                    column = ColumnEnum.H;
                    break;
                case ColumnEnum.H:
                default:
                    return undefined;
            }
            return new Position(column, current.getLine());
        }
        return undefined;
    }

    /** The column. */
    private column: ColumnEnum;

    /** The line. */
    private line: LineEnum;

    /**
     * Instantiates a new position.
     *
     * @param column the column
     * @param line the line
     */
    public constructor(column: ColumnEnum, line: LineEnum) {
        this.column = column;
        this.line = line;
    }

    /**
     * Gets the column.
     *
     * @return the column
     */
    public getColumn(): ColumnEnum {
        return this.column;
    }

    /**
     * Sets the column.
     *
     * @param column the new column
     */
    public setColumn(column: ColumnEnum): void {
        this.column = column;
    }

    /**
     * Gets the line.
     *
     * @return the line
     */
    public getLine(): LineEnum {
        return this.line;
    }

    /**
     * Sets the line.
     *
     * @param line the new line
     */
    public setLine(line: LineEnum): void {
        this.line = line;
    }
    public equals(other: Position): boolean {
        if (this.column !== other.column) {
            return false;
        }
        if (this.line !== other.line) {
            return false;
        }
        return true;
    }

    /**
     * {@inheritDoc}
     */
    public toString(): string {
        return Log.format("%s%d", ColumnEnum[this.getColumn()], this.getLine());
    }

}

export { ColumnEnum, LineEnum };
