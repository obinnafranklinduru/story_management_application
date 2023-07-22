import { z } from 'zod';

export const UserInputValidation = z.object({
    title: z.string(),
    body: z.string(),
    status: z.enum(['public', 'private']),
});