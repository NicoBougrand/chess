import _ from "lodash";
import util, { InspectOptions } from "util";

import Config from "../../config/config";
import EError from "../../model/commonTypes/errors/error";
import TypeUtils from "../types/type.utils";

enum LogLevel { DEBUG, INFO, FORCE_INFO, WARN, ERROR }
enum TextDecoration {
    Reset = "\u001b[0m",
    Bright = "\u001b[1m",
    Dim = "\u001b[2m",
    Underscore = "\u001b[4m",
    Blink = "\u001b[5m",
    Reverse = "\u001b[7m",
    Hidden = "\u001b[8m",

    FgBlack = "\u001b[30m",
    FgRed = "\u001b[31m",
    FgGreen = "\u001b[32m",
    FgYellow = "\u001b[33m",
    FgBlue = "\u001b[34m",
    FgMagenta = "\u001b[35m",
    FgCyan = "\u001b[36m",
    FgWhite = "\u001b[37m",

    BgBlack = "\u001b[40m",
    BgRed = "\u001b[41m",
    BgGreen = "\u001b[42m",
    BgYellow = "\u001b[43m",
    BgBlue = "\u001b[44m",
    BgMagenta = "\u001b[45m",
    BgCyan = "\u001b[46m",
    BgWhite = "\u001b[47m",
}

export default class Log {

    public static format(message?: any, ...optionalParameters: any): string {
        return util.format(message, ...optionalParameters);
    }

    public static debug(message?: any, ...optionalParameters: any): void {
        Log.print(LogLevel.DEBUG, message, ...optionalParameters);
    }

    public static info(message?: any, ...optionalParameters: any): void {
        Log.print(LogLevel.INFO, message, ...optionalParameters);
    }

    public static forceInfo(message?: any, ...optionalParameters: any): void {
        Log.print(LogLevel.FORCE_INFO, message, ...optionalParameters);
    }

    public static warn(message?: any, ...optionalParameters: any): void {
        Log.print(LogLevel.WARN, message, ...optionalParameters);
    }

    public static error(message?: any, ...optionalParameters: any): void {
        Log.print(LogLevel.ERROR, message, ...optionalParameters);
    }
    public static inspect(message?: any, ...optionalParameters: any): string {
        return Log.inspectWithOptions(undefined, message, ...optionalParameters);
    }

    public static inspectWithOptions(inspectOptions: InspectOptions, message?: any, ...optionalParameters: any): string {
        inspectOptions = {
            showHidden: inspectOptions && !inspectOptions.showHidden ? inspectOptions.showHidden : true,
            // tslint:disable-next-line: no-null-keyword
            depth: inspectOptions && inspectOptions.depth ? inspectOptions.depth : null,
            colors: inspectOptions && !inspectOptions.colors ? inspectOptions.colors : true,
            compact: inspectOptions && !inspectOptions.compact ? inspectOptions.compact : true
        };

        const messageIsString: boolean = message && typeof message === "string";

        if (messageIsString && TypeUtils.includes(message, ["%s", "%d", "%i", "%f", "%j", "%o", "%O", "%%"])) {
            return util.inspect(Log.format(message, ...optionalParameters), inspectOptions);
        } else {
            return Log.format("%s%s", (messageIsString ? "" : "\n"), _.join(_.slice(arguments, 1).map((el: any) => util.inspect(el, inspectOptions)), "\n"));
        }
    }

    private static print(level: LogLevel, message?: any, ...optionalParameters: any): void {
        let _print: (msg?: any, ...optParams: any) => void;
        // tslint:disable:no-console
        switch (level) {
            case LogLevel.DEBUG:
                _print = !Log.isProduction() ? console.debug : undefined;
                break;
            case LogLevel.INFO:
                _print = !Log.isProduction() ? console.info : undefined;
                break;
            case LogLevel.FORCE_INFO:
                _print = console.info;
                break;
            case LogLevel.WARN:
                _print = console.warn;
                break;
            case LogLevel.ERROR:
                _print = console.error;
                break;
            default:
                throw new EError(undefined, "Unrecognized level %s", level);
        }
        // tslint:enable:no-console
        if (_print) {
            _print("%s%s", Log.printLevel(level), Log.inspect(message, ...optionalParameters));
        }
    }

    private static printLevel(level: LogLevel, ): string {
        let printLevel: string = LogLevel[level];
        let levelTextDecoration: string;
        let displayDate: boolean = true;
        const dateTextDecoration: string = TextDecoration.Underscore;
        switch (level) {
            case LogLevel.DEBUG:
                levelTextDecoration = TextDecoration.Bright + TextDecoration.FgMagenta;
                displayDate = false;
                break;
            case LogLevel.INFO:
            case LogLevel.FORCE_INFO:
                printLevel = LogLevel[LogLevel.INFO];
                levelTextDecoration = TextDecoration.Bright + TextDecoration.FgCyan;
                break;
            case LogLevel.WARN:
                levelTextDecoration = TextDecoration.Bright + TextDecoration.FgYellow;
                break;
            case LogLevel.ERROR:
                levelTextDecoration = TextDecoration.Bright + TextDecoration.FgRed;
                break;
            default:
                throw new EError(undefined, "Unrecognized level ", level);
        }
        return util.format("%s%s%s %s%s%s",
            levelTextDecoration, printLevel, TextDecoration.Reset,
            dateTextDecoration, displayDate ? new Date() : "", TextDecoration.Reset);
    }

    private static isProduction(): boolean {
        return Config.get().getEnv() === "production";
    }
}
