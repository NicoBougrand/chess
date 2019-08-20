import { NextFunction, Request, Response } from "express";
import _ from "lodash";

export default class AuthentificationMiddleware {
    public static set(resLocals: any): ((req: Request, res: Response, next: NextFunction) => void) {
        return (req: Request, res: Response, next: NextFunction): void => {
            res.locals.fromServer = _.assign(req.res.locals.fromServer, resLocals);
            next();
        };
    }
}
