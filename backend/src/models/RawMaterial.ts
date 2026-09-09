import mongoose, { Schema, Document } from 'mongoose';
import { RawMaterial as IRawMaterial } from '../types';

export interface RawMaterialDocument extends Omit<IRawMaterial, 'id'>, Document {
  id: string;
}

const RawMaterialSchema = new Schema<RawMaterialDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, unique: true },
    sku: { type: String, required: true },
    batchInfo: { type: String, required: true },
    stockLevel: { type: Number, required: true, default: 0 },
    unit: { type: String, required: true },
    threshold: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['low', 'critical', 'normal', 'sufficient'],
      default: 'normal',
    },
    supplier: { type: String, required: true },
    estimateCost: { type: Number, required: true },
    standardOrderQty: { type: String, required: true },
    note: { type: String },
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

export const RawMaterialModel = mongoose.model<RawMaterialDocument>('RawMaterial', RawMaterialSchema);
