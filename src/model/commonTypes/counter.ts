import EError from "./errors/error";

export default class Counter {
    private count: number;

    constructor(initCount?: number) {
        this.count = initCount || 0;
    }

    public increment(increment?: number): void {
        increment = increment || 1;
        this.count += increment;
    }

    public decrement(decrement?: number): void {
        decrement = decrement || 1;
        const testValue = this.count - decrement;
        if (testValue < 0) {
            throw new EError(undefined, "Impossible to decrement counter");
        } else {
            this.count = testValue;
        }
    }

    public isZero(): boolean {
        return this.count === 0;
    }

    public toString(): string {
        return this.count.toString();
    }

}
