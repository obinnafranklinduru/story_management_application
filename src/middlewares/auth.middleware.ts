import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // Implement the middleware logic to check if the user is authenticated
  if (req.isAuthenticated()) {
    return next();
  }
  // User is not logged in, redirect to the login page
  res.redirect('/v1/auth/login');
}