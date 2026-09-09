export type CraftStage = 'new_placed' | 'in_crafting' | 'qc_packaging' | 'manifested';

export type CraftType = 'candle' | 'crochet' | 'gift_hamper' | 'wax_melt';

export type UserRole =
  | 'customer'
  | 'atelier_manager'
  | 'artisan_crafter'
  | 'qc_packaging'
  | 'logistics_dispatcher';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  token?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  sku: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  fulfillmentMode: 'ready_to_ship' | 'made_to_order' | 'hybrid';
  customDetails?: string;
}

export interface UserCart {
  userId: string;
  customerName: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  updatedAt: string;
}

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
  details?: {
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
  category: 'candle' | 'crochet' | 'gift_box' | 'wax_melt';
  image: string;
  galleryImages?: string[];
  description?: string;
  fragranceNotes?: {
    top: string;
    middle: string;
    base: string;
  };
  burnTimeHours?: number;
  dimensions?: string;
  materials?: string;
  careInstructions?: string;
  craftMedium: string;
  fulfillmentMode: 'ready_to_ship' | 'made_to_order' | 'hybrid';
  stockCount?: number;
  crafterAssigned?: string;
  leadTimeBuffer: string;
  mrp: number;
  salePrice?: number;
  gstRate: string;
  minReserve?: number;
  criticalLow?: boolean;
  statusText?: string;
  rating?: number;
  reviewsCount?: number;
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

export interface AICommissionParseResult {
  customerName: string;
  customerPhone?: string;
  craftType: CraftType;
  title: string;
  subtitle: string;
  scentProfile?: string;
  vinylInscription?: string;
  yarnPalette?: { name: string; hex: string }[];
  monogram?: string;
  giftNote?: string;
  price: number;
  urgent: boolean;
  leadTimeDays: number;
  confidenceScore: number;
  aiHarmonyRecommendation?: string;
}
