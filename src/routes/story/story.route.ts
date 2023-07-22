import express, { Router } from 'express';

import { isAuthenticated } from '../../middlewares/auth.middleware';
import {
    createStory,
    getPublicStories,
    getUserStories,
    updateStory,
    deleteStory,
    likeStory,
    addComment,
    searchByTitle
} from './story.controller';

const router: Router = express.Router();

router.post('/', isAuthenticated, createStory);
router.get('/public', getPublicStories);
router.get('/my-stories', isAuthenticated, getUserStories);
router.put('/:id', isAuthenticated, updateStory);
router.delete('/:id', isAuthenticated, deleteStory);
router.post('/:id/like', isAuthenticated, likeStory);
router.post('/:id/comment', isAuthenticated, addComment);
router.get('/search', searchByTitle);

export { router as storyRouter };