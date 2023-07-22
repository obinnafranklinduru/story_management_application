import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}