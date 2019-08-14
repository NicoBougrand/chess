import _ from "lodash";

import Position from "./position";
import Step from "./step";
/**
 * The Class MoveUtil.
 */
export default class StepUtil {

    /**
     * Up.
     *
     * @return the step
     */
    public static up(): Step {
        return new Step((p: Position) => Position.up(p));
    }

    /**
     * Down.
     *
     * @return the step
     */
    public static down(): Step {
        return new Step((p: Position) => Position.down(p));
    }

    /**
     * Left.
     *
     * @return the step
     */
    public static left(): Step {
        return new Step((p: Position) => Position.left(p));
    }

    /**
     * Right.
     *
     * @return the step
     */
    public static right(): Step {
        return new Step((p: Position) => Position.right(p));
    }

    /**
     * Cross.
     *
     * @return the list
     */
    public static cross(): Step[] {
        return [StepUtil.up(), StepUtil.down(), StepUtil.left(), StepUtil.right()];
    }

    /**
     * Diags.
     *
     * @return the list
     */
    public static diags(): Step[] {
        return [
            StepUtil.up().then(StepUtil.left()),
            StepUtil.up().then(StepUtil.right()),
            StepUtil.down().then(StepUtil.left()),
            StepUtil.down().then(StepUtil.right())];
    }

    /**
     * Cross and diag.
     *
     * @return the list
     */
    public static crossAndDiags(): Step[] {
        return _.concat(StepUtil.cross(), StepUtil.diags());
    }

    /**
     * Instantiates a new move util.
     */
    private constructor() {
        // NOTHING
    }
}
