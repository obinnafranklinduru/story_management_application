import { z } from 'zod';

export const UserInputValidation = z.object({
    title: z.string()
        .nonempty('Title is required')
        .max(50, 'Title must not exceed 50 characters'),
    body: z.string()
        .nonempty('Body is required'),
    status: z.enum(['public', 'private']),
});

export const UserUpdateValidation = z.object({
    title: z.string(),
    body: z.string(),
    status: z.enum(['public', 'private']),
});