import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  skills?: string[];
  githubUrl?: string;
  websiteUrl?: string;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: String,
  bio: String,
  skills: [String],
  githubUrl: String,
  websiteUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
