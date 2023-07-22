import { Request, Response, NextFunction } from 'express';

import { StoryModel } from '../../models/story.model';
import { IUser } from '../../interfaces/user.interface';
import { ErrorResponse } from '../../utils/errorResponse';
import { UserInputValidation, UserUpdateValidation } from './story.validation';

export async function createStory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { title, body, status } = req.body;
        const userInput = UserInputValidation.parse({ title, body, status });

        const user = req.user as IUser;

        const newStory = new StoryModel({
            title: userInput.title,
            body: userInput.body,
            status: userInput.status,
            user: user._id,
        });

        await newStory.save();

        res.status(201).json({ newStory });
    } catch (error) {
        next(error);
    }
}

export async function getPublicStories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const publicStories = await StoryModel.find({ status: 'public' })
            .sort({ likes: -1 })
        
        if (!publicStories) return next(new ErrorResponse('Story not found', 404));

        res.status(200).json({ publicStories });
    } catch (error) {
        next(error)
    }
}

export async function getUserStories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user = req.user as IUser;
        const myStories = await StoryModel.find({ user: user._id });

        if (!myStories) return next(new ErrorResponse('Story not found', 404));

        res.status(200).json({ myStories });
    } catch (error) {
        next(error);
    }
}

export async function updateStory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { title, body, status } = req.body;
        const userInput = UserUpdateValidation.parse({ title, body, status });

        const user = req.user as IUser;

        const story = await StoryModel.findOne({ _id: req.params.id, user: user._id });

        if (!story) return next(new ErrorResponse('Story not found', 404));

        if (title) {
            story.title = userInput.title;
        }

        if (body) {
            story.body = userInput.body;
        }

        if (status) {
            story.status = userInput.status;
        }

        const updatedStory = await story.save();

        res.status(200).json({ updatedStory });
    } catch (error) {
        next(error);
    }
}

export async function deleteStory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user = req.user as IUser;

        await StoryModel.findOneAndDelete({ _id: req.params.id, user: user._id });

        res.json({ message: 'Story deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export async function likeStory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const story = await StoryModel.findOne({ _id: req.params.id, status: 'public' });

        if (!story) return next(new ErrorResponse('Story not found', 404));

        story.likes += 1;
        await story.save();

        res.status(200).json({ story });
    } catch (error) {
        next(error);
    }
}

export async function addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { comment } = req.body;
        const user = req.user as IUser;
        const story = await StoryModel.findOne({ _id: req.params.id, status: 'public' });

        if (!story) return next(new ErrorResponse('Story not found', 404));

        story.comments.push(`${user.displayName}: ${comment}`);
        await story.save();

        res.json(story);
    } catch (error) {
        next(error);
    }
}

export async function searchByTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { title } = req.query;

        if (!title || typeof title !== 'string') return next(new ErrorResponse('Invalid search query', 400));

        const regex = new RegExp(title, 'i');
        const stories = await StoryModel.find({ title: regex, status: 'public' })
            .sort({ likes: -1 });
        
        res.status(200).json(stories);
    } catch (error) {
        next(error);
    }
}