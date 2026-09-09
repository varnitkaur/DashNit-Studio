import React, { useState } from 'react';
import {
  X,
  Briefcase,
  Building2,
  Sparkles,
  Gift,
  CheckCircle2,
  ArrowRight,
  Flame,
  ShoppingBag,
  Percent,
  Truck,
  Layers,
} from 'lucide-react';
import { CraftCard } from '../types';

interface CorporateGiftingModalProps {
  onClose: () => void;
  onQueueCorporateBatch: (batchCards: CraftCard[], companyName: string, count: number) => void;
  onTriggerToast: (msg: string) => void;
}

const HAMPERS = [
  {
    id: 'royal_jaipur',
    title: 'The Royal Jaipur Executive Suite',
    subtitle: 'Bespoke 220g Soy Candle + Wax Melts + Laser Wood Lid',
    basePrice: 1299,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&auto=format&fit=crop&q=80',
    type: 'candle' as const,
  },
  {
    id: 'artisan_duet',
    title: 'The Organic Artisan Duet',
    subtitle: 'Handcrafted Cotton Crochet Coasters (Set of 4) + Scented Jar',
    basePrice: 1699,
    image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=400&auto=format&fit=crop&q=80',
    type: 'crochet' as const,
  },
  {
    id: 'discovery_box',
    title: 'Botanical Wax Discovery Vault',
    subtitle: '12-Piece Hand-Poured Wax Melts in Velvet debossed Box',
    basePrice: 899,
    image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&auto=format&fit=crop&q=80',
    type: 'wax_melt' as const,
  },
];

export const CorporateGiftingModal: React.FC<CorporateGiftingModalProps> = ({
  onClose,
  onQueueCorporateBatch,
  onTriggerToast,
}) => {
  const [selectedHamper, setSelectedHamper] = useState(HAMPERS[0]);
  const [quantity, setQuantity] = useState(75);
  const [companyName, setCompanyName] = useState('Google India Engineering');
  const [contactName, setContactName] = useState('Vikram Malhotra');
  const [fragrance, setFragrance] = useState('Royal Mysore Sandalwood & Amber');
  const [laserInscription, setLaserInscription] = useState('Google • Empowering Growth 2026');
  const [multiCityDropship, setMultiCityDropship] = useState(true);

  // Volume discount calculation
  let discountPercent = 0;
  let tierLabel = 'Standard Tier';
  if (quantity >= 200) {
    discountPercent = 20;
    tierLabel = 'Gold Tier (20% Off + Free Custom Brass Die)';
  } else if (quantity >= 50) {
    discountPercent = 12;
    tierLabel = 'Silver Tier (12% Volume Discount)';
  } else if (quantity >= 25) {
    discountPercent = 5;
    tierLabel = 'Bronze Tier (5% Volume Discount)';
  }

  const grossTotal = selectedHamper.basePrice * quantity;
  const discountAmount = Math.round((grossTotal * discountPercent) / 100);
  const netTotal = grossTotal - discountAmount;
  const unitPriceFinal = Math.round(netTotal / quantity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const batchCards: CraftCard[] = [
      {
        id: `CORP-${Math.floor(100 + Math.random() * 900)}A`,
        stage: 'new_placed',
        title: `${selectedHamper.title} (${quantity} Units)`,
        subtitle: `Client: ${companyName} • ${fragrance}`,
        type: selectedHamper.type,
        urgent: false,
        customerName: `${companyName} (Attn: ${contactName})`,
        customerPhone: '+91 98110 54321',
        dueText: 'Bulk SLA: 8 Days',
        price: netTotal,
        paymentMethod: 'Corporate Invoice (Net 30)',
        paymentStatus: 'Approved & PO Issued',
        details: {
          scent: fragrance,
          vinylInscription: `“${laserInscription}”`,
          stockLot: 'Lot #CORP-2026',
          destination: multiCityDropship ? 'Multi-Hub: BLR, BOM, DEL' : 'Bangalore HQ',
          giftNote: `With deepest appreciation from the leadership team at ${companyName}.`,
        },
      },
    ];

    onQueueCorporateBatch(batchCards, companyName, quantity);
    onTriggerToast(`Corporate Gifting Order for ${companyName} (${quantity} units, ₹${netTotal.toLocaleString('en-IN')}) queued into Jaipur Atelier!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-5 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F3EDE4] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Epilogue'] text-lg font-bold text-[#2D221E]">
                  B2B Bulk Corporate Gifting Engine
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF6F0] text-[#1E6B43] border border-[#A3D9BC]/60">
                  Volume Tier Active
                </span>
              </div>
              <p className="text-xs text-[#6B5851]">
                Bespoke artisanal executive hampers with custom laser branding and pan-India dropshipping
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3EDE4] text-[#9C8880] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Hamper Package Selection */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851] block">
              1. Choose Artisanal Hamper Architecture:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {HAMPERS.map((h) => (
                <div
                  key={h.id}
                  onClick={() => setSelectedHamper(h)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedHamper.id === h.id
                      ? 'bg-[#fee9e5] border-[#9d3e1d] shadow-sm'
                      : 'bg-[#FAF7F2] border-[#E5DBD0] hover:bg-[#F3EDE4]'
                  }`}
                >
                  <h4 className="font-bold text-xs text-[#2D221E]">{h.title}</h4>
                  <p className="text-[10px] text-[#6B5851] mt-0.5 line-clamp-2">{h.subtitle}</p>
                  <div className="mt-2 text-xs font-bold text-[#9d3e1d]">
                    ₹{h.basePrice} <span className="text-[10px] text-[#6B5851] font-normal">/ unit base</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volume Slider & Tier Breakdown */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
                  2. Order Volume & Tier Discount
                </span>
                <span className="font-['Epilogue'] text-xl font-bold text-[#2D221E]">
                  {quantity} Custom Units
                </span>
              </div>
              <span className="px-3 py-1 rounded-xl bg-white border border-[#1E6B43]/50 text-xs font-bold text-[#1E6B43] shadow-2xs">
                {tierLabel}
              </span>
            </div>

            <input
              type="range"
              min={25}
              max={500}
              step={5}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-[#9d3e1d] cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-[#9C8880] font-['Space_Mono']">
              <span>25 Units (Min)</span>
              <span>50 Units (Silver: 12%)</span>
              <span>200+ Units (Gold: 20%)</span>
              <span>500 Units</span>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5DBD0] text-center text-xs">
              <div className="p-2 rounded-xl bg-white border border-[#E5DBD0]">
                <span className="text-[10px] text-[#6B5851] block">Base Cost</span>
                <span className="font-bold text-[#2D221E] line-through">₹{grossTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E5DBD0]">
                <span className="text-[10px] text-[#1E6B43] font-bold block">Volume Savings</span>
                <span className="font-bold text-[#1E6B43]">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2 rounded-xl bg-[#2D221E] text-white">
                <span className="text-[10px] text-[#D3C2B1] block">Contract Total</span>
                <span className="font-bold text-[#A3D9BC]">₹{netTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Corporate Details & Laser Engraving */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
                Company / Organization
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] text-[#2D221E] focus:outline-hidden focus:border-[#9d3e1d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
                Contact Person & Phone
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] text-[#2D221E] focus:outline-hidden focus:border-[#9d3e1d]"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
              Laser Engraving / Foil Stamp Inscription
            </label>
            <input
              type="text"
              value={laserInscription}
              onChange={(e) => setLaserInscription(e.target.value)}
              placeholder="e.g. Acme Corp • Celebrating 10 Years of Excellence"
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] text-[#9d3e1d] font-bold font-['Space_Mono'] focus:outline-hidden focus:border-[#9d3e1d]"
            />
          </div>

          {/* Dropship distribution simulation */}
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#1E5888]" />
                <span className="font-bold text-[#2D221E]">
                  Multi-City Dropship Allocation (India Tech Hubs)
                </span>
              </div>
              <input
                type="checkbox"
                checked={multiCityDropship}
                onChange={(e) => setMultiCityDropship(e.target.checked)}
                className="accent-[#9d3e1d] w-4 h-4"
              />
            </div>
            {multiCityDropship && (
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-['Space_Mono'] pt-1">
                <div className="p-1.5 rounded-lg bg-white border border-[#E5DBD0]">
                  BLR: {Math.round(quantity * 0.4)} Units
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-[#E5DBD0]">
                  BOM: {Math.round(quantity * 0.3)} Units
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-[#E5DBD0]">
                  DEL: {Math.round(quantity * 0.2)} Units
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-[#E5DBD0]">
                  HYD: {Math.round(quantity * 0.1)} Units
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#F3EDE4] text-[#6B5851] text-xs font-semibold border border-[#E5DBD0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Briefcase className="w-4 h-4" />
              <span>Authorize & Queue Corporate Batch ({quantity} Units)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
