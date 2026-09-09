import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types';

export interface UserDocument extends Document {
  id: string;
  email: string;
  password?: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    name: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      required: true,
      enum: [
        'customer',
        'atelier_manager',
        'artisan_crafter',
        'qc_packaging',
        'logistics_dispatcher',
      ],
      default: 'customer',
    },
    avatar: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, any>) => {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
