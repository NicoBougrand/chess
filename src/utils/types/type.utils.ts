import _ from "lodash";

export default class TypeUtils {
    public static includes(str: string, targets: string[]): boolean {
        return _.some(targets, (target: string) => _.includes(str, target));
    }

    public static substringBetween(str: string, first: string, last: string, opt?: string): string {
        const match = str.match(new RegExp("(?:" + first + ")(.*?)(?:" + last + ")", opt));
        if (match) {
            return match[1];
        }
        return undefined;
    }
}
