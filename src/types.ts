export type CraftStage = 'new_placed' | 'in_crafting' | 'qc_packaging' | 'manifested';

export type CraftType = 'candle' | 'crochet' | 'gift_hamper' | 'wax_melt';

export interface CraftCard {
  id: string; // e.g. 'DN-1048'
  stage: CraftStage;
  title: string;
  subtitle: string;
  type: CraftType;
  tag?: string;
  urgent?: boolean;
  customerName: string;
  customerPhone?: string;
  dueText?: string;
  price: number;
  paymentMethod?: string;
  paymentStatus?: string;
  details: {
    scent?: string;
    vinylInscription?: string;
    yarnPalette?: { name: string; hex: string }[];
    monogram?: string;
    stockLot?: string;
    fastTrack?: boolean;
    stitchProgress?: { percent: number; label: string };
    artisan?: string;
    curing?: { pouredAgo: string; remaining: string; percent: number; roomTemp: string };
    locker?: string;
    qcPassed?: boolean;
    qcChecks?: string[];
    weightGrams?: number;
    boxSize?: string;
    awb?: string;
    courier?: string;
    courierStatus?: string;
    destination?: string;
    whatsappAlertSent?: string;
    giftNote?: string;
  };
}

export interface CatalogProduct {
  id: string;
  sku: string;
  title: string;
  subtitle: string;
  category: 'candle' | 'crochet' | 'gift_box';
  image: string;
  craftMedium: string;
  fulfillmentMode: 'ready_to_ship' | 'made_to_order' | 'hybrid';
  stockCount?: number;
  crafterAssigned?: string;
  leadTimeBuffer: string;
  mrp: number;
  gstRate: string;
  minReserve?: number;
  criticalLow?: boolean;
  statusText?: string;
}

export interface RawMaterial {
  id: string;
  name: string;
  sku: string;
  batchInfo: string;
  stockLevel: number;
  unit: string;
  threshold: number;
  status: 'low' | 'critical' | 'normal' | 'sufficient';
  supplier: string;
  estimateCost: number;
  standardOrderQty: string;
  note?: string;
}

export interface LogisticsOrder {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  date: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  status: 'in_crafting' | 'ready_for_packing' | 'manifested' | 'in_transit' | 'delivered';
  statusBadge: string;
  items: {
    name: string;
    customDetails?: string;
    image?: string;
    qty?: number;
  }[];
  courier?: string;
  awb?: string;
  pickupWindow?: string;
  driverName?: string;
  curingCompleteTime?: string;
  giftNote?: string;
}

export type ActiveNavTab =
  | 'crafting-queue'
  | 'catalog-and-inventory'
  | 'orders-and-logistics'
  | 'analytics-and-revenue'
  | 'architecture'
  | 'custom-studio';
