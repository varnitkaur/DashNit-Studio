import mongoose, { Schema, Document } from 'mongoose';
import { CartItem } from '../types';

export interface CartDocument extends Document {
  userId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  items: CartItem[];
  subtotal: number;
  updatedAt: Date;
}

const CartItemSchema = new Schema<CartItem>(
  {
    id: { type: String, required: true },
    productId: { type: String, required: true },
    sku: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    image: { type: String, required: true },
    category: { type: String, default: 'candle' },
    fulfillmentMode: {
      type: String,
      enum: ['ready_to_ship', 'made_to_order', 'hybrid'],
      default: 'ready_to_ship',
    },
    customDetails: { type: String },
  },
  { _id: false }
);

const CartSchema = new Schema<CartDocument>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String },
    customerEmail: { type: String },
    items: [CartItemSchema],
    subtotal: { type: Number, required: true, default: 0 },
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

export const CartModel = mongoose.model<CartDocument>('Cart', CartSchema);
