import { InspectOptions } from "util";
import Log from "../../../utils/logs/log.utils";

export default abstract class AbstractError extends Error {

    public causedBy?: Error;
    public webMessage: string;

    protected constructor(causedBy?: Error, message?: any, ...optionalParameters: any) {
        super(message ? Log.inspect(message, ...optionalParameters) : causedBy.message);
        this.webMessage = message ? Log.format(message, ...optionalParameters).replace("\n", "<br/>").replace("\\", "") : (causedBy instanceof AbstractError ? causedBy.webMessage : "");
        this.name = this.constructor.name;
        this.causedBy = causedBy;
        this.manageOtherFields();
    }
    public log<T extends AbstractError>(): T {
        Log.error(this);
        return (this as unknown) as T;
    }
    protected abstract manageOtherFields(): void;

}
