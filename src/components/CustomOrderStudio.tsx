import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  ShoppingBag,
  Flame,
  Check,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { CraftCard } from '../types';

interface CustomOrderStudioProps {
  onCommissionCreated: (newCard: CraftCard) => void;
}

export const CustomOrderStudio: React.FC<CustomOrderStudioProps> = ({
  onCommissionCreated,
}) => {
  const [craftType, setCraftType] = useState<'candle' | 'crochet'>('candle');

  // Candle options
  const [vessel, setVessel] = useState('Amber Glass Jar (220g)');
  const [scent, setScent] = useState('French Lavender & Cedar');
  const [wick, setWick] = useState('Crackling Rosewood Wick (+₹50)');
  const [inscription, setInscription] = useState('Happy 25th Maya!');

  // Crochet options
  const [crochetItem, setCrochetItem] = useState('Custom Daisy Tote Bag');
  const [selectedYarn1, setSelectedYarn1] = useState('Sage');
  const [selectedYarn2, setSelectedYarn2] = useState('Buttercup');
  const [monogram, setMonogram] = useState('A.R.');

  // Common options
  const [customerName, setCustomerName] = useState('Ananya Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [giftNote, setGiftNote] = useState(
    'Wishing you endless joy and peaceful warmth always.'
  );
  const [addLuxeBox, setAddLuxeBox] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Dynamic price calculation
  const basePrice = craftType === 'candle' ? 799 : 1499;
  const wickPrice = craftType === 'candle' && wick.includes('+₹50') ? 50 : 0;
  const boxPrice = addLuxeBox ? 150 : 0;
  const totalPrice = basePrice + wickPrice + boxPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      const newId = `DN-${Math.floor(1000 + Math.random() * 9000)}`;

      const newCard: CraftCard = {
        id: newId,
        stage: 'new_placed',
        title:
          craftType === 'candle'
            ? `Bespoke Soy Candle (${vessel})`
            : crochetItem,
        subtitle:
          craftType === 'candle'
            ? `Scent: ${scent} • ${wick}`
            : `Palette: ${selectedYarn1} + ${selectedYarn2}`,
        type: craftType,
        urgent: false,
        customerName: customerName || 'Valued Guest',
        customerPhone: customerPhone || '+91 98765 00000',
        dueText: 'Due in 4 days',
        price: totalPrice,
        paymentMethod: 'UPI Intent (Instant)',
        paymentStatus: 'Captured',
        details: {
          scent: craftType === 'candle' ? scent : undefined,
          vinylInscription: craftType === 'candle' ? `“${inscription}”` : undefined,
          yarnPalette:
            craftType === 'crochet'
              ? [
                  {
                    name: selectedYarn1,
                    hex: selectedYarn1 === 'Sage' ? '#8EA885' : '#D9822B',
                  },
                  {
                    name: selectedYarn2,
                    hex: selectedYarn2 === 'Buttercup' ? '#F4D35E' : '#E8B4B8',
                  },
                ]
              : undefined,
          monogram: craftType === 'crochet' ? monogram : undefined,
          giftNote: giftNote,
          destination: 'Bangalore, KA',
          fastTrack: false,
        },
      };

      onCommissionCreated(newCard);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 pb-2">
        <span className="px-3 py-1 rounded-full bg-[#fee9e5] text-[#9d3e1d] font-bold text-xs font-['Space_Mono'] uppercase tracking-wider">
          PRD SECTION 9.4 • ARTISAN STUDIO CUSTOMIZER
        </span>
        <h1 className="font-['Epilogue'] text-3xl font-bold text-[#2D221E] tracking-tight">
          Bespoke Commission Studio
        </h1>
        <p className="text-sm text-[#6B5851] max-w-xl mx-auto font-['Plus_Jakarta_Sans']">
          Configure handcrafted soy candles or custom crochet creations. Orders stream in real-time to the Jaipur Craft House artisan Kanban queue.
        </p>
      </div>

      {submittedSuccess ? (
        <div className="p-8 rounded-3xl bg-white border border-[#E5DBD0] shadow-md text-center space-y-4 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-[#EBF6F0] text-[#1E6B43] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
            Commission Queued with Jaipur Studio!
          </h2>
          <p className="text-sm text-[#6B5851] max-w-md mx-auto">
            Your bespoke commission has been assigned to the Artisan Crafting Board in Stage 01 (New Placed). WhatsApp updates will trigger automatically as artisans begin crafting.
          </p>
          <div className="pt-3">
            <button
              onClick={() => setSubmittedSuccess(false)}
              className="px-6 py-2.5 rounded-xl bg-[#9d3e1d] text-white font-bold text-xs hover:bg-[#bd5633] transition-all shadow-sm"
            >
              Create Another Commission
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left 2 Cols: Form options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category toggle */}
            <div className="p-1.5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex">
              <button
                type="button"
                onClick={() => setCraftType('candle')}
                className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  craftType === 'candle'
                    ? 'bg-[#9d3e1d] text-white shadow-sm'
                    : 'text-[#6B5851] hover:bg-[#FAF7F2]'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>Hand-Poured Soy Candle</span>
              </button>
              <button
                type="button"
                onClick={() => setCraftType('crochet')}
                className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  craftType === 'crochet'
                    ? 'bg-[#9d3e1d] text-white shadow-sm'
                    : 'text-[#6B5851] hover:bg-[#FAF7F2]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Artisan Crochet Craft</span>
              </button>
            </div>

            {/* Candle Customizer */}
            {craftType === 'candle' && (
              <div className="p-6 rounded-3xl bg-white border border-[#E5DBD0] shadow-sm space-y-5">
                <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E] flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#9d3e1d]" />
                  <span>Vessel & Fragrance Architecture</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#2D221E] mb-1.5">
                      Vessel Selection
                    </label>
                    <select
                      value={vessel}
                      onChange={(e) => setVessel(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] font-semibold text-[#2D221E] focus:outline-none"
                    >
                      <option value="Amber Glass Jar (220g)">
                        Amber Glass Jar (220g) • 45-Hour Clean Burn
                      </option>
                      <option value="Hand-Thrown Ceramic Pot (280g)">
                        Hand-Thrown Jaipur Pottery Ceramic Pot (280g) (+₹250)
                      </option>
                      <option value="Cashmere Triple-Wick Bubble Mold">
                        Cashmere Triple-Wick Bubble Mold
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2D221E] mb-1.5">
                      Botanical Scent Profile
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'French Lavender & Cedar',
                        'Smoked Oud & Warm Amber',
                        'Cardamom & Vanilla Pod',
                        'Fresh Mogra & Jasmine',
                      ].map((s) => (
                        <div
                          key={s}
                          onClick={() => setScent(s)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                            scent === s
                              ? 'border-[#9d3e1d] bg-[#fee9e5] text-[#9d3e1d]'
                              : 'border-[#E5DBD0] bg-[#FAF7F2] text-[#2D221E]'
                          }`}
                        >
                          <span>{s}</span>
                          {scent === s && <Check className="w-3.5 h-3.5" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2D221E] mb-1.5">
                      Wick Craft Choice
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Crackling Rosewood Wick (+₹50)',
                        'Lead-Free Organic Braided Cotton',
                      ].map((w) => (
                        <div
                          key={w}
                          onClick={() => setWick(w)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                            wick === w
                              ? 'border-[#9d3e1d] bg-[#fee9e5] text-[#9d3e1d]'
                              : 'border-[#E5DBD0] bg-[#FAF7F2] text-[#2D221E]'
                          }`}
                        >
                          <span>{w}</span>
                          {wick === w && <Check className="w-3.5 h-3.5" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold text-[#2D221E]">
                        Custom Gold/White Vinyl Jar Inscription
                      </label>
                      <span className="text-[10px] text-[#9C8880] font-['Space_Mono']">
                        {inscription.length}/28 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={28}
                      value={inscription}
                      onChange={(e) => setInscription(e.target.value)}
                      placeholder="e.g. Happy 25th Maya!"
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] text-[#2D221E] font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Crochet Customizer */}
            {craftType === 'crochet' && (
              <div className="p-6 rounded-3xl bg-white border border-[#E5DBD0] shadow-sm space-y-5">
                <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E] flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#9d3e1d]" />
                  <span>Yarn Palette & Stitched Monogram</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#2D221E] mb-1.5">
                      Crochet Artifact
                    </label>
                    <select
                      value={crochetItem}
                      onChange={(e) => setCrochetItem(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] font-semibold text-[#2D221E]"
                    >
                      <option value="Custom Daisy Tote Bag">
                        Custom Daisy Tote Bag (Combed Cotton)
                      </option>
                      <option value="Cozy Waffle Knit Throw">
                        Cozy Waffle Knit Throw (Size M)
                      </option>
                      <option value="Pastel Amigurumi Baby Bunny">
                        Pastel Amigurumi Baby Bunny (Safety Eyes)
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#2D221E] mb-1.5">
                        Base Color Yarn
                      </label>
                      <select
                        value={selectedYarn1}
                        onChange={(e) => setSelectedYarn1(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] font-semibold"
                      >
                        <option value="Sage">Sage (#8EA885)</option>
                        <option value="Terracotta">Terracotta (#D9822B)</option>
                        <option value="Oatmeal Cream">Oatmeal Cream</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-[#2D221E] mb-1.5">
                        Accent / Petal Yarn
                      </label>
                      <select
                        value={selectedYarn2}
                        onChange={(e) => setSelectedYarn2(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] font-semibold"
                      >
                        <option value="Buttercup">Buttercup (#F4D35E)</option>
                        <option value="Blush Rose">Blush Rose (#E8B4B8)</option>
                        <option value="Sky Blue">Sky Blue</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2D221E] mb-1.5">
                      Embroidered Initial Monogram
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={monogram}
                      onChange={(e) => setMonogram(e.target.value)}
                      placeholder="e.g. A.R."
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] text-[#2D221E] font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Recipient & Gift Note */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5DBD0] shadow-sm space-y-4">
              <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E]">
                Recipient & Calligraphy Wax Seal Note
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-[#2D221E] mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D221E] mb-1">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0]"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-bold text-[#2D221E] mb-1">
                  Handwritten Gift Note (Sealed with Botanical Wax Stamp)
                </label>
                <textarea
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="luxeBox"
                    checked={addLuxeBox}
                    onChange={(e) => setAddLuxeBox(e.target.checked)}
                    className="rounded text-[#9d3e1d] focus:ring-0"
                  />
                  <label htmlFor="luxeBox" className="font-semibold text-[#2D221E] cursor-pointer">
                    Signature Eco-Luxe Box packaging (+₹150)
                  </label>
                </div>
                <span className="text-[#1E6B43] font-bold">Recommended</span>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Live Preview & Checkout Summary */}
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-white border border-[#E5DBD0] shadow-sm space-y-4 sticky top-24">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9d3e1d]">
                Live Commission Ticket
              </span>

              {/* Mockup Card */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-2 text-center">
                <div className="w-16 h-16 rounded-full bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center mx-auto">
                  {craftType === 'candle' ? (
                    <Flame className="w-8 h-8" />
                  ) : (
                    <ShoppingBag className="w-8 h-8" />
                  )}
                </div>

                <h4 className="font-bold text-sm text-[#2D221E]">
                  {craftType === 'candle' ? vessel : crochetItem}
                </h4>

                {craftType === 'candle' && inscription && (
                  <p className="text-xs font-['Space_Mono'] font-bold text-[#9d3e1d] italic">
                    “{inscription}”
                  </p>
                )}

                {craftType === 'crochet' && monogram && (
                  <p className="text-xs font-['Space_Mono'] font-bold text-[#2D221E]">
                    Monogram: ‘{monogram}’
                  </p>
                )}
              </div>

              {/* Lead time */}
              <div className="p-2.5 rounded-xl bg-[#FEF5EA] text-[#A35C00] text-xs font-semibold flex items-center gap-2 border border-[#F8CCA0]/60">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Jaipur Atelier Lead Time: 3–4 Days</span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs border-t border-b border-[#F3EDE4] py-3">
                <div className="flex justify-between text-[#6B5851]">
                  <span>Handcrafted Base</span>
                  <span>₹{basePrice}</span>
                </div>
                {wickPrice > 0 && (
                  <div className="flex justify-between text-[#6B5851]">
                    <span>Crackling Wood Wick</span>
                    <span>+₹{wickPrice}</span>
                  </div>
                )}
                {boxPrice > 0 && (
                  <div className="flex justify-between text-[#6B5851]">
                    <span>Eco-Luxe Box & Wax Seal</span>
                    <span>+₹{boxPrice}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#2D221E] pt-1">
                  <span>Total (incl. GST)</span>
                  <span className="font-['Epilogue'] text-base text-[#9d3e1d]">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Transmitting to Queue...' : 'Queue Commission (UPI Instant)'}
                </span>
              </button>

              <div className="flex items-center justify-center gap-1 text-[11px] text-[#1E6B43] font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Simulated Razorpay 100% Secure Checkout</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
