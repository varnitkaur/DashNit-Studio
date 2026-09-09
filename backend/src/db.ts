import mongoose from 'mongoose';
import { CraftCardModel } from './models/CraftCard';
import { ProductModel } from './models/Product';
import { RawMaterialModel } from './models/RawMaterial';
import { LogisticsOrderModel } from './models/LogisticsOrder';
import {
  initialCraftCards,
  mockCatalogProducts,
  mockRawMaterials,
  mockLogisticsOrders,
} from './seedData';

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[MongoDB] MONGODB_URI not provided. Running in offline/memory mode.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('[MongoDB] Successfully connected to MongoDB Atlas (Cluster0 / dashnit_studio)');

    // Auto-seed collections if empty
    await seedDatabaseIfEmpty();
  } catch (error) {
    console.error('[MongoDB] Connection error:', error);
  }
}

async function seedDatabaseIfEmpty(): Promise<void> {
  try {
    const cardCount = await CraftCardModel.countDocuments();
    if (cardCount === 0) {
      console.log('[MongoDB] Database empty. Seeding initial atelier data...');
      await Promise.all([
        CraftCardModel.insertMany(initialCraftCards),
        ProductModel.insertMany(mockCatalogProducts),
        RawMaterialModel.insertMany(mockRawMaterials),
        LogisticsOrderModel.insertMany(mockLogisticsOrders),
      ]);
      console.log('[MongoDB] Auto-seeding completed successfully!');
    }
  } catch (error) {
    console.error('[MongoDB] Seeding error:', error);
  }
}
