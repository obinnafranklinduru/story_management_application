import { Schema, model }  from 'mongoose';
import { IStory } from '../interfaces/story.interface';

const storySchema = new Schema<IStory>({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['private', 'public'],
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: [String],
    default: []
  },
}, { timestamps: true });

export const StoryModel = model<IStory>('Story', storySchema);