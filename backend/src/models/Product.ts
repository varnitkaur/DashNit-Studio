import mongoose, { Schema, Document } from 'mongoose';
import { CatalogProduct as ICatalogProduct } from '../types';

export interface ProductDocument extends Omit<ICatalogProduct, 'id'>, Document {
  id: string;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    sku: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['candle', 'crochet', 'gift_box'],
    },
    image: { type: String, required: true },
    craftMedium: { type: String, required: true },
    fulfillmentMode: {
      type: String,
      required: true,
      enum: ['ready_to_ship', 'made_to_order', 'hybrid'],
    },
    stockCount: { type: Number, default: 0 },
    crafterAssigned: { type: String },
    leadTimeBuffer: { type: String, required: true },
    mrp: { type: Number, required: true },
    gstRate: { type: String, default: '12% GST' },
    minReserve: { type: Number, default: 5 },
    criticalLow: { type: Boolean, default: false },
    statusText: { type: String },
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

export const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);
