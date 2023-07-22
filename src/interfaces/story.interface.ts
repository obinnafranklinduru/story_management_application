import { Document, Types } from 'mongoose';

export interface IStory extends Document {
    _id: Types.ObjectId;
    title: string;
    body: string;
    status: 'private' | 'public';
    user: Types.ObjectId;
    likes: number;
    comments: string[];
}