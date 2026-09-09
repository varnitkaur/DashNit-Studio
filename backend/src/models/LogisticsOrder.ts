import mongoose, { Schema, Document } from 'mongoose';
import { LogisticsOrder as ILogisticsOrder } from '../types';

export interface LogisticsOrderDocument extends Document, ILogisticsOrder {}

const LogisticsOrderSchema = new Schema<LogisticsOrderDocument>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['in_crafting', 'ready_for_packing', 'manifested', 'in_transit', 'delivered'],
      default: 'in_crafting',
    },
    statusBadge: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        customDetails: { type: String },
        image: { type: String },
        qty: { type: Number, default: 1 },
      },
    ],
    courier: { type: String },
    awb: { type: String },
    pickupWindow: { type: String },
    driverName: { type: String },
    curingCompleteTime: { type: String },
    giftNote: { type: String },
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

export const LogisticsOrderModel = mongoose.model<LogisticsOrderDocument>(
  'LogisticsOrder',
  LogisticsOrderSchema
);
