import _ from "lodash";

import Log from "../../utils/logs/log.utils";
import EError from "./errors/error";

export default class MMap<K, V> extends Map<K, V> {

    public static toMap(obj: any): MMap<string, any> {
        const _treatArray = (array: any[], map: MMap<string, any>, _stack: any, property: string) => {
            _.forEach(array, (el, idx) => {
                const name = Log.format("%s.[%s.%s]", _stack, property, idx);
                if (typeof el === "object") {
                    _iterate(el, map, name);
                } else {
                    map.set(name, el);
                }
            });
        };
        const _iterate = (_obj: any, map: MMap<string, any>, _stack: any) => {
            if (Array.isArray(_obj)) {
                throw new EError(undefined, "Must be an object, not an array!");
            } else {
                for (const property in _obj) {
                    if (_obj.hasOwnProperty(property)) {
                        const value = _obj[property];
                        let name = _stack;
                        if (Array.isArray(value)) {
                            _treatArray(value, map, _stack, property);
                        } else {
                            if (name !== "") {
                                name += ".";
                            }
                            name += property;
                            if (typeof value === "object") {
                                _iterate(value, map, name);
                            } else {
                                map.set(name, value);
                            }
                        }
                    }
                }
            }
            return map;
        };
        return _iterate(obj, new MMap(), "");
    }

    public static toObject(map: Map<string, any>): any {
        const _treat = (_key: string, _value: any, _object: any): any => {
            const firstOpenSquareBracket: number = _key.indexOf("\[");
            const firstDot: number = _key.indexOf(".");
            if (firstDot === -1) {
                _object[_key] = _value;
            } else if (firstOpenSquareBracket === -1) {
                const split = _.split(_key, ".");
                let _obj = _object;
                _.forEach(split, (subKey, idx) => {
                    if (!_obj[subKey]) {
                        _obj[subKey] = idx === split.length - 1 ? _value : {};
                    }
                    _obj = _obj[subKey];
                });
            } else {
                if (firstOpenSquareBracket < firstDot) {
                    const firstCloseSquareBracket: number = _key.indexOf("\]", firstOpenSquareBracket);
                    const subKey = _key.substr(0, firstOpenSquareBracket);
                    const array = _key.substr(firstOpenSquareBracket + 1, firstCloseSquareBracket - firstOpenSquareBracket - 1);
                    const arrayName = array.substring(0, array.indexOf("."));
                    const arrayIdx = array.substring(array.indexOf(".") + 1);
                    let next = _key.substr(firstCloseSquareBracket + 1);
                    next = next.startsWith(".") ? next.substring(1) : next;
                    if (subKey && subKey !== "") {
                        if (!_object[subKey][arrayName]) {
                            _object[subKey][arrayName] = [];
                        }

                        if (!next || next === "") {
                            _object[subKey][arrayName].push(_value);
                        } else {
                            if (!_object[subKey][arrayName][arrayIdx]) {
                                _object[subKey][arrayName][arrayIdx] = [];
                            }
                            _treat(next, _value, _object[subKey][arrayName][arrayIdx]);
                        }
                    } else {
                        if (!_object[arrayName]) {
                            _object[arrayName] = [];
                        }
                        if (!next || next === "") {
                            _object[arrayName].push(_value);
                        } else {
                            if (!_object[arrayName][arrayIdx]) {
                                _object[arrayName][arrayIdx] = {};
                            }
                            _treat(next, _value, _object[arrayName][arrayIdx]);
                        }
                    }
                } else {
                    const subKey = _key.substr(0, firstDot);
                    const next = _key.substr(firstDot + 1);
                    if (subKey && subKey !== "") {
                        if (!_object[subKey]) {
                            _object[subKey] = {};
                        }
                        _treat(next, _value, _object[subKey]);
                    } else {
                        _treat(next, _value, _object);
                    }
                }
            }
            return _object;
        };
        const object: any = {};
        map.forEach((value: any, key: string) => {
            _treat(key, value, object);
        });

        return object;
    }

    public getKeyByPredicate(predicate: (key: K) => boolean): K[] {
        const keys: K[] = [];
        for (const key of this.keys()) {
            if (predicate(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    public toMap(): Map<K, V> {
        const map = new Map();
        this.forEach((value: V, key: K) => {
            map.set(key, value);
        });
        return map;
    }

}
