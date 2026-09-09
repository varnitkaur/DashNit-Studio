import mongoose, { Schema, Document } from 'mongoose';
import { CraftCard as ICraftCard } from '../types';

export interface CraftCardDocument extends Omit<ICraftCard, 'id'>, Document {
  id: string;
}

const CraftCardSchema = new Schema<CraftCardDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    stage: {
      type: String,
      required: true,
      enum: ['new_placed', 'in_crafting', 'qc_packaging', 'manifested'],
      default: 'new_placed',
    },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['candle', 'crochet', 'gift_hamper', 'wax_melt'],
    },
    tag: { type: String },
    urgent: { type: Boolean, default: false },
    customerName: { type: String, required: true },
    customerPhone: { type: String },
    dueText: { type: String },
    price: { type: Number, required: true },
    paymentMethod: { type: String },
    paymentStatus: { type: String },
    details: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, any>) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const CraftCardModel = mongoose.model<CraftCardDocument>('CraftCard', CraftCardSchema);
