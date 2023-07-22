import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

import { UserModel } from '../models/user.model';

const BASE_URL = process.env.BASE_URL || 'https://localhost:3000'

export const setupPassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
                callbackURL: `${BASE_URL}/v1/auth/google/callback`,
                scope: ['email', 'profile']
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    name: profile.displayName,
                    isConfirmed: profile._json.email_verified,
                    email: profile._json.email,
                    avatar: profile._json.picture
                }

                try {
                    let user = await UserModel.findOne({ googleId: profile.id });
                    
                    if (user) {
                        done(null, user)
                    } else {
                        user = await UserModel.create(newUser)
                        done(null, user)
                    }
                    
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser((id, done) => {
        UserModel.findById(id)
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
}