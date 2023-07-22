import express, { Router } from 'express';

import { authRouter } from './auth/auth.route';
import { storyRouter } from './story/story.route';

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/stories', storyRouter)

export { router as apiV1Routes };