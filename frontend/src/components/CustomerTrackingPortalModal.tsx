import React, { useState } from 'react';
import {
  X,
  Search,
  Sparkles,
  Flame,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Heart,
  Radio,
  Package,
} from 'lucide-react';
import { CraftCard, LogisticsOrder } from '../types';

interface CustomerTrackingPortalModalProps {
  cards: CraftCard[];
  logisticsOrders: LogisticsOrder[];
  onClose: () => void;
}

export const CustomerTrackingPortalModal: React.FC<CustomerTrackingPortalModalProps> = ({
  cards,
  logisticsOrders,
  onClose,
}) => {
  const [searchId, setSearchId] = useState('DN-1048');
  const [activeCard, setActiveCard] = useState<CraftCard>(
    cards.find((c) => c.id === 'DN-1048') || cards[0]
  );

  const handleSearch = (idToFind: string) => {
    const clean = idToFind.trim().toUpperCase();
    const found = cards.find(
      (c) => c.id.toUpperCase() === clean || c.customerName.toLowerCase().includes(clean.toLowerCase())
    );
    if (found) {
      setActiveCard(found);
      setSearchId(found.id);
    }
  };

  // Stepper calculations
  const stageOrder = ['new_placed', 'in_crafting', 'qc_packaging', 'manifested'];
  const currentStepIdx = stageOrder.indexOf(activeCard.stage);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-5 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto font-['Plus_Jakarta_Sans']">
        {/* Top Public Header */}
        <div className="flex items-center justify-between border-b border-[#E5DBD0] pb-4 bg-white -mx-6 -mt-6 p-6 rounded-t-3xl shadow-2xs">
          <div className="flex items-center gap-3">
            <img
              alt="DashNit Logo"
              className="h-9 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_APITfE3QLEGc7BDz8QZoVcPHQsfPukNK-RFr9cTsEYFcifyKg8CCkf91-EAAEOFKEeEY8twSa0nhlADepi8SS5aTRNo5jMOcrNkDC6b1hrDg9OjTeFhk4CHMActQ-GPsE9Na4_6OMSG_fVmhyJ_MflX-c7AhN3RdOxtJB-L5Ouobh37nZ-XXNb8oUrGAquP5uPMQ1II2bWgFW09E_gc8dMdrJ3AU8ZpZI5WHmJBIiOQwCFh8ZiO-6w"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Epilogue'] text-lg font-bold text-[#2D221E]">
                  track.dashnit.com
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-[#EBF6F0] text-[#1E6B43] border border-[#A3D9BC]/60">
                  Live Guest Portal
                </span>
              </div>
              <p className="text-xs text-[#6B5851]">
                Real-Time Artisanal Creation & 48h Curing Vault Milestones
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

        {/* Search Bar & Preset Shortcuts */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#9C8880]" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Commission ID (e.g. DN-1048) or Phone Number..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E5DBD0] text-[#2D221E] text-xs font-['Space_Mono'] focus:outline-hidden focus:border-[#9d3e1d] transition-all"
              />
            </div>
            <button
              onClick={() => handleSearch(searchId)}
              className="px-5 py-2.5 rounded-2xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              Track Order
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[11px] text-[#6B5851] font-medium">Quick Preview Orders:</span>
            {cards.slice(0, 4).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveCard(c);
                  setSearchId(c.id);
                }}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-['Space_Mono'] font-bold transition-all ${
                  activeCard.id === c.id
                    ? 'bg-[#fee9e5] text-[#9d3e1d] border border-[#9d3e1d]'
                    : 'bg-white border border-[#E5DBD0] text-[#6B5851] hover:bg-[#F3EDE4]'
                }`}
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* Order Hero Banner */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5DBD0] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F3EDE4] pb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center flex-shrink-0">
                {activeCard.type === 'candle' ? (
                  <Flame className="w-6 h-6" />
                ) : (
                  <ShoppingBag className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Space_Mono'] font-bold text-xs text-[#9d3e1d] bg-[#fee9e5] px-2 py-0.5 rounded-md">
                    {activeCard.id}
                  </span>
                  <span className="text-xs text-[#6B5851]">• Destination: {activeCard.details.destination || 'Bangalore, KA'}</span>
                </div>
                <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E] mt-0.5">
                  {activeCard.title}
                </h3>
                <p className="text-xs text-[#6B5851]">{activeCard.subtitle}</p>
              </div>
            </div>

            <div className="text-right flex sm:flex-col items-baseline sm:items-end justify-between">
              <span className="font-['Epilogue'] text-xl font-bold text-[#1E6B43]">
                ₹{activeCard.price}
              </span>
              <span className="text-[11px] font-bold text-[#9d3e1d] bg-[#fee9e5] px-2 py-0.5 rounded-full mt-1">
                {activeCard.dueText || 'Delivering Soon'}
              </span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[11px] text-[#6B5851]">
                Creation & Fulfillment Journey
              </span>
              <span className="text-xs font-bold text-[#1E6B43]">
                Stage {currentStepIdx + 1} of 4: {activeCard.stage.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { title: 'Order Captured', subtitle: 'UPI Verified' },
                { title: 'Artisan Crafted', subtitle: 'Jaipur Atelier' },
                { title: '48h Curing Vault', subtitle: 'Fragrance Lock' },
                { title: 'Courier Dispatched', subtitle: 'Delhivery Express' },
              ].map((step, idx) => {
                const isCompleted = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-2xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-[#fee9e5] border-[#9d3e1d] shadow-xs'
                        : isCompleted
                        ? 'bg-[#EBF6F0] border-[#A3D9BC]/70'
                        : 'bg-[#FAF7F2] border-[#E5DBD0] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6B43]" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-[#9C8880] text-[9px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                      )}
                      <span className="font-bold text-[11px] text-[#2D221E] truncate">
                        {step.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#6B5851] block truncate">
                      {step.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2-Column: Live Curing Vault Dial + Artisan Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Curing & Quality Vault Dial */}
          <div className="p-4 rounded-3xl bg-white border border-[#E5DBD0] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#6B5851]">
                Curing Vault Status
              </h4>
              <span className="text-[10px] font-bold text-[#A35C00] bg-[#FEF5EA] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" />
                48h Curing Protocol
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#9d3e1d] border-t-transparent animate-spin-slow flex items-center justify-center flex-shrink-0 bg-white shadow-xs">
                <span className="font-['Epilogue'] font-bold text-sm text-[#9d3e1d]">
                  {activeCard.type === 'candle' ? '82%' : '100%'}
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#2D221E] block">
                  {activeCard.type === 'candle'
                    ? 'Fragrance Binding Complete (39h / 48h)'
                    : 'Stitch Row Tension Audited (65/65 Rows)'}
                </span>
                <p className="text-[11px] text-[#6B5851]">
                  Room Temp: <strong>23.4°C</strong> • Climate Lock Active in Curing Vault 01
                </p>
              </div>
            </div>

            <div className="text-[11px] text-[#6B5851] flex items-center justify-between px-1">
              <span>QC Inspection: <strong>Certified Passed</strong></span>
              <span className="text-[#1E6B43] font-bold">✔ 0 Defects Detected</span>
            </div>
          </div>

          {/* Artisan Spotlight Card */}
          <div className="p-4 rounded-3xl bg-white border border-[#E5DBD0] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#6B5851]">
                Artisan Spotlight
              </h4>
              <span className="text-[10px] font-bold text-[#1E6B43] bg-[#EBF6F0] px-2 py-0.5 rounded-full">
                Jaipur Atelier Unit 02
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0]">
              <img
                alt="Artisan Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#9d3e1d]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM8Df4ydgQlw7-C3xA3CT7h5C2tQxC6dNe3IJ2enHiQN8G54nMXRGjAfjWl85zOczkZyxCHsoV7BzQeVGFjPk0CPKInV4fw508vliKK3yaslBmnqglVdo0W2Dnmk1FOxrrAOmsErjWgeHW5EEo6-hCF-HQbo-WHrv2Th1zirxjfxcm_SrkOHGyY_fS7CevegmG-7iAe5poB7vxJMjmEi4ZRiLeGCnLTPEUfSg-t8539hbPetZcUuMflw"
              />
              <div className="text-xs">
                <span className="font-bold text-[#2D221E] block">
                  {activeCard.details.artisan || 'Nita Sharma'}
                </span>
                <span className="text-[11px] text-[#9d3e1d] font-semibold">
                  Master Crafter • 12 Yrs Artisanal Heritage
                </span>
                <p className="text-[10px] text-[#6B5851] italic mt-0.5">
                  “Each knot and botanical pour is prepared with mindful intention and precision.”
                </p>
              </div>
            </div>

            {/* Gift Note if present */}
            {activeCard.details.giftNote && (
              <div className="p-3 rounded-2xl bg-[#FEF5EA] border border-[#F8CCA0]/70 text-xs text-[#2D221E]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A35C00] block mb-1">
                  Enclosed Calligraphy Gift Note:
                </span>
                <p className="italic font-serif">“{activeCard.details.giftNote}”</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
