import AbstractError from "./abstract.error";

export default class EError extends AbstractError {

    public constructor(causedBy?: Error, message?: any, ...optionalParameters: any) {
        super(causedBy, message, ...optionalParameters);
    }

    protected manageOtherFields(): void {
        // DO NOTHING
    }

}
