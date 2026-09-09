import React, { useState } from 'react';
import { CartItem, LogisticsOrder, CraftCard, UserProfile } from '../types';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Gift,
  Tag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: UserProfile;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOrderPlaced: (newOrder: LogisticsOrder, newCard: CraftCard) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  onUpdateQuantity,
  onRemoveItem,
  onOrderPlaced,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(
    null
  );
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Checkout Form
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState(currentUser.name || 'Ananya Sharma');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');
  const [address, setAddress] = useState('Flat 402, Palm Meadows, Indiranagar');
  const [city, setCity] = useState('Bangalore');
  const [state, setState] = useState('Karnataka');
  const [pinCode, setPinCode] = useState('560038');
  const [paymentMethod, setPaymentMethod] = useState<'upi_intent' | 'card'>('upi_intent');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [placedOrderSuccess, setPlacedOrderSuccess] = useState<LogisticsOrder | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const giftWrapCost = isGiftWrap ? 120 : 0;
  const shippingFee = rawSubtotal >= 999 || rawSubtotal === 0 ? 0 : 79;
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const grandTotal = Math.max(0, rawSubtotal + giftWrapCost + shippingFee - discountAmount);

  const handleApplyCoupon = () => {
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();
    if (code === 'FIRSTCRAFT') {
      const discount = Math.round(rawSubtotal * 0.1);
      setAppliedDiscount({ code: 'FIRSTCRAFT (10% Off)', amount: discount });
    } else if (code === 'DIWALI200') {
      if (rawSubtotal < 1000) {
        setCouponError('DIWALI200 requires a minimum cart value of ₹1,000');
        return;
      }
      setAppliedDiscount({ code: 'DIWALI200 (₹200 Off)', amount: 200 });
    } else if (code === 'FREESHIP') {
      setAppliedDiscount({ code: 'FREESHIP', amount: shippingFee });
    } else {
      setCouponError('Invalid coupon code. Try FIRSTCRAFT or DIWALI200');
    }
  };

  const handleConfirmOrder = () => {
    setIsPlacingOrder(true);

    const orderId = `DN-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomAwb = `DL-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const newOrder: LogisticsOrder = {
      orderId,
      customerName,
      phone,
      address,
      city,
      state,
      pinCode,
      date: 'Just now',
      amount: grandTotal,
      paymentMethod: paymentMethod === 'upi_intent' ? 'UPI Intent (GPay)' : 'Credit Card (Razorpay)',
      paymentStatus: 'PAID (Verified)',
      status: 'in_crafting',
      statusBadge: 'IN CRAFTING',
      items: cartItems.map((c) => ({
        name: c.title,
        customDetails: c.customDetails,
        image: c.image,
        qty: c.quantity,
      })),
      courier: 'Delhivery Surface Express',
      awb: randomAwb,
      giftNote: isGiftWrap && giftNote ? giftNote : undefined,
    };

    const firstItem = cartItems[0];
    const newCard: CraftCard = {
      id: orderId,
      stage: 'new_placed',
      title: firstItem?.title || 'Bespoke Studio Order',
      subtitle: `${cartItems.length} item(s) • ${firstItem?.customDetails || 'Standard Craft'}`,
      type:
        firstItem?.category === 'crochet'
          ? 'crochet'
          : firstItem?.category === 'gift_box'
          ? 'gift_hamper'
          : firstItem?.category === 'wax_melt'
          ? 'wax_melt'
          : 'candle',
      urgent: false,
      customerName,
      customerPhone: phone,
      dueText: 'Due: in 4 days',
      price: grandTotal,
      paymentMethod: paymentMethod === 'upi_intent' ? 'UPI Intent' : 'Card',
      paymentStatus: 'Captured',
      details: {
        destination: `${city}, ${state} ${pinCode}`,
        giftNote: isGiftWrap ? giftNote : undefined,
        awb: randomAwb,
        courier: 'Delhivery',
      },
    };

    setTimeout(() => {
      setIsPlacingOrder(false);
      setPlacedOrderSuccess(newOrder);
      onOrderPlaced(newOrder, newCard);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] w-full max-w-lg h-full shadow-2xl flex flex-col justify-between border-l border-[#2D221E]/15 overflow-hidden">
        {/* Drawer Header */}
        <div className="bg-[#2D221E] text-white px-6 py-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#F4D35E]" />
            <div>
              <h2 className="font-['Epilogue'] font-bold text-base">Your Shopping Cart</h2>
              <span className="text-[11px] text-white/70 font-['Space_Mono']">
                {cartItems.length} item(s) • User: {currentUser.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1.5 rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {placedOrderSuccess ? (
            /* Order Placed Celebration State */
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-[#1E6B43]/10 text-[#1E6B43] rounded-full flex items-center justify-center mx-auto border-2 border-[#1E6B43]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#9d3e1d] uppercase font-['Space_Mono'] tracking-wider">
                  Order Successfully Confirmed
                </span>
                <h3 className="font-['Epilogue'] text-2xl font-bold text-[#2D221E] mt-1">
                  Thank You, {placedOrderSuccess.customerName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-[#2D221E]/70 max-w-xs mx-auto mt-2 leading-relaxed">
                  Your commission has been injected directly into the **Jaipur Crafting Queue** (Order #{placedOrderSuccess.orderId}).
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#2D221E]/10 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#2D221E]/60">Order Reference:</span>
                  <span className="font-bold text-[#2D221E] font-['Space_Mono']">{placedOrderSuccess.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2D221E]/60">Assigned 3PL Courier:</span>
                  <span className="font-bold text-[#2D221E]">{placedOrderSuccess.courier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2D221E]/60">Air Waybill (AWB):</span>
                  <span className="font-bold text-[#9d3e1d] font-['Space_Mono']">{placedOrderSuccess.awb}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2D221E]/60">Amount Paid:</span>
                  <span className="font-bold text-[#1E6B43] font-['Space_Mono']">₹{placedOrderSuccess.amount}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setPlacedOrderSuccess(null);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="w-full py-3.5 rounded-2xl bg-[#2D221E] text-white font-bold text-xs shadow-lg"
              >
                Continue Browsing Catalog
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#2D221E]/5 flex items-center justify-center mx-auto text-[#2D221E]/30">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-['Epilogue'] font-bold text-lg text-[#2D221E]">Your Cart is Empty</h3>
                <p className="text-xs text-[#2D221E]/60 mt-1 max-w-xs mx-auto">
                  Explore our handcrafted soy candles and bespoke crochet pieces to begin your order.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#9d3e1d] text-white text-xs font-bold shadow-md"
              >
                Browse Collections
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Address & Payment Form */
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#2D221E]/10">
                <span className="text-xs font-bold text-[#2D221E] uppercase font-['Space_Mono'] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#9d3e1d]" />
                  <span>Delivery Address</span>
                </span>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#9d3e1d] font-bold"
                >
                  Edit Cart
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#2D221E] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#2D221E]/20 rounded-xl outline-none focus:ring-2 focus:ring-[#9d3e1d]/30"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#2D221E] block mb-1">Mobile Phone (for delivery SMS/WhatsApp)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#2D221E]/20 rounded-xl outline-none focus:ring-2 focus:ring-[#9d3e1d]/30"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#2D221E] block mb-1">Street Address / Apartment</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#2D221E]/20 rounded-xl outline-none focus:ring-2 focus:ring-[#9d3e1d]/30"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-[#2D221E] block mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white border border-[#2D221E]/20 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#2D221E] block mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white border border-[#2D221E]/20 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#2D221E] block mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white border border-[#2D221E]/20 rounded-xl outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-3 space-y-2">
                <span className="text-xs font-bold text-[#2D221E] uppercase font-['Space_Mono'] block">
                  Select Payment Rail (Razorpay Secured)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi_intent')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'upi_intent'
                        ? 'border-[#9d3e1d] bg-[#9d3e1d]/5 ring-2 ring-[#9d3e1d]/20'
                        : 'border-[#2D221E]/10 bg-white'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#2D221E]">UPI Intent / QR</span>
                    <span className="text-[10px] text-[#2D221E]/60">GPay, PhonePe, Paytm</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#9d3e1d] bg-[#9d3e1d]/5 ring-2 ring-[#9d3e1d]/20'
                        : 'border-[#2D221E]/10 bg-white'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#2D221E]">Cards & NetBanking</span>
                    <span className="text-[10px] text-[#2D221E]/60">Visa, RuPay, HDFC</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Items List */
            <>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-2xl border border-[#2D221E]/10 shadow-sm flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-[#2D221E]/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#2D221E] truncate">{item.title}</div>
                      {item.customDetails && (
                        <div className="text-[10px] text-[#9d3e1d] font-semibold truncate mt-0.5">
                          {item.customDetails}
                        </div>
                      )}
                      <div className="text-xs font-bold text-[#2D221E] font-['Space_Mono'] mt-1">
                        ₹{item.price}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-xl border border-[#2D221E]/10">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 text-[#2D221E]/70 hover:text-[#2D221E]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1 font-['Space_Mono']">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 text-[#2D221E]/70 hover:text-[#2D221E]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-red-500/60 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Gift Wrap Add-on */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#2D221E]/10 space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#9d3e1d]" />
                    <span className="text-xs font-bold text-[#2D221E]">
                      Signature Eco-Luxe Gift Box (+₹120)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="accent-[#9d3e1d] w-4 h-4 rounded"
                  />
                </label>
                {isGiftWrap && (
                  <textarea
                    rows={2}
                    maxLength={200}
                    placeholder="Enter personal handwritten note text (up to 200 chars)..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF7F2] border border-[#2D221E]/15 rounded-xl outline-none focus:ring-2 focus:ring-[#9d3e1d]/30"
                  />
                )}
              </div>

              {/* Coupon Engine */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#2D221E]/10 space-y-2">
                <span className="text-xs font-bold text-[#2D221E] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#9d3e1d]" />
                  <span>Promotional Voucher</span>
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="FIRSTCRAFT or DIWALI200"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-[#2D221E]/20 rounded-xl text-xs uppercase font-mono outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-1.5 bg-[#2D221E] text-white text-xs font-bold rounded-xl"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <p className="text-[11px] text-[#1E6B43] font-semibold">
                    ✓ Applied: {appliedDiscount.code} (-₹{appliedDiscount.amount})
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 font-semibold">{couponError}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer (Pricing & Checkout CTA) */}
        {!placedOrderSuccess && cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-[#2D221E]/10 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#2D221E]/70">
                <span>Items Subtotal</span>
                <span className="font-['Space_Mono']">₹{rawSubtotal}</span>
              </div>
              {isGiftWrap && (
                <div className="flex justify-between text-[#2D221E]/70">
                  <span>Gift Box & Calligraphy Note</span>
                  <span className="font-['Space_Mono']">+₹120</span>
                </div>
              )}
              <div className="flex justify-between text-[#2D221E]/70">
                <span>Pan-India Shipping</span>
                <span className="font-['Space_Mono']">
                  {shippingFee === 0 ? (
                    <span className="text-[#1E6B43] font-semibold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-[#1E6B43] font-semibold">
                  <span>Discount Applied</span>
                  <span className="font-['Space_Mono']">-₹{appliedDiscount.amount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-[#2D221E] pt-2 border-t border-[#2D221E]/10">
                <span>Total Amount</span>
                <span className="font-['Space_Mono'] text-[#9d3e1d]">₹{grandTotal}</span>
              </div>
            </div>

            {isCheckingOut ? (
              <button
                onClick={handleConfirmOrder}
                disabled={isPlacingOrder}
                className="w-full py-3.5 rounded-2xl bg-[#9d3e1d] hover:bg-[#853417] text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                {isPlacingOrder ? (
                  <span>Injecting Order to Jaipur Atelier...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{grandTotal} & Place Commission</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 rounded-2xl bg-[#2D221E] hover:bg-[#1a1412] text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Proceed to Shipping & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
