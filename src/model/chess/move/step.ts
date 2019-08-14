import Position from "./position";
/**
 * The Interface Step.
 */
export default class Step {

    private _step: (_pos: Position) => Position;

    public constructor(step: (_pos: Position) => Position) {
        this._step = step;
    }

    /**
     * Step.
     *
     * @param p the p
     * @return the position
     */
    public step(p: Position): Position {
        return this._step(p);
    }

    /**
     * Then.
     *
     * @param s the s
     * @return the step
     */
    public then(s: Step): Step {
        // return this.andThen(s):: apply;
        return new Step((p: Position) => s.step(this._step(p)));
    }

}
