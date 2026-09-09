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

export type UserRole =
  | 'atelier_manager'
  | 'artisan_crafter'
  | 'qc_packaging'
  | 'logistics_dispatcher';

export interface RoleInfo {
  role: UserRole;
  title: string;
  badge: string;
  avatar: string;
  description: string;
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

export type AtelierHub = 'jaipur_02' | 'jaipur_01' | 'mumbai_hub';

export interface AtelierHubInfo {
  id: AtelierHub;
  name: string;
  tagline: string;
  location: string;
  activeCapUnits: number;
  capacityMax: number;
  status: 'optimal' | 'busy' | 'full';
  focusArea: string;
}

export interface CorporateOrderRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  hamperTitle: string;
  quantity: number;
  baseUnitPrice: number;
  discountPercent: number;
  totalAmount: number;
  logoInscription: string;
  fragranceChoice: string;
  deliveryDate: string;
  destinations: { city: string; units: number }[];
}

export interface ArtisanWageRecord {
  artisanId: string;
  name: string;
  role: string;
  completedUnits: number;
  breakdown: { item: string; qty: number; rate: number; subtotal: number }[];
  qcPassRate: number;
  bonusAmount: number;
  grossPayout: number;
  status: 'pending' | 'disbursed';
}


