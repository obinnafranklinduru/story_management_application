import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { ErrorResponse } from '../../utils/errorResponse';

export const loginWithGoogle = (req: Request, res: Response) => {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })(req, res);
}

export function googleCallback(req: Request, res: Response) {
    passport.authenticate('google', {
        successRedirect: '/v1/stories/my-stories',
        failureRedirect: '/v1/auth/login',
    })(req, res);
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err: any): void => {
        if (err) {
            return next(new ErrorResponse(err.message, 500));
        }

        res.redirect('/v1/auth/login');
    });
}