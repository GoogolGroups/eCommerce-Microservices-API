import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUserPayload {
    id: string;
    email: string;
    password: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: IUserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        // TODO: Needs to come from Kubernetes env var (secret)
        const payload = jwt.verify(req.session.jwt, 'asdf') as IUserPayload;
        req.currentUser = payload;
    } catch (e) {}

    next();
}