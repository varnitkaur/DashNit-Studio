import React, { useState } from 'react';
import { CatalogProduct, CartItem } from '../types';
import {
  Search,
  Sparkles,
  ShoppingBag,
  Flame,
  Scissors,
  Gift,
  Clock,
  CheckCircle2,
  X,
  Star,
  ShieldCheck,
  Truck,
  Layers,
  Heart,
} from 'lucide-react';

interface CustomerStorefrontProps {
  products: CatalogProduct[];
  onAddToCart: (item: CartItem) => void;
  onOpenCustomStudio: () => void;
  onOpenCartDrawer: () => void;
}

export const CustomerStorefront: React.FC<CustomerStorefrontProps> = ({
  products,
  onAddToCart,
  onOpenCustomStudio,
  onOpenCartDrawer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [activePDPProduct, setActivePDPProduct] = useState<CatalogProduct | null>(null);
  const [pincode, setPincode] = useState('');
  const [pincodeVerified, setPincodeVerified] = useState<boolean | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedAnimationSku, setAddedAnimationSku] = useState<string | null>(null);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleQuickAdd = (product: CatalogProduct) => {
    const cartItem: CartItem = {
      id: `cart-${product.sku}-${Date.now()}`,
      productId: product.id,
      sku: product.sku,
      title: product.title,
      price: product.salePrice || product.mrp,
      quantity: 1,
      image: product.image,
      category: product.category,
      fulfillmentMode: product.fulfillmentMode,
    };
    onAddToCart(cartItem);
    setAddedAnimationSku(product.sku);
    setTimeout(() => setAddedAnimationSku(null), 1500);
  };

  const handlePincodeCheck = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeVerified(true);
    } else {
      setPincodeVerified(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2D221E] via-[#3d2f2a] to-[#1f1714] text-[#FAF7F2] p-8 md:p-12 shadow-xl border border-[#9d3e1d]/30">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9d3e1d]/40 border border-[#9d3e1d]/60 text-[11px] font-bold tracking-widest uppercase font-['Space_Mono'] text-[#FAF7F2]">
            <Sparkles className="w-3.5 h-3.5 text-[#F4D35E]" />
            <span>Jaipur Artisanal Sanctuary • Est. 2024</span>
          </div>
          <h1 className="font-['Epilogue'] text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Hand-Poured Candles & Heirloom Crochet Art
          </h1>
          <p className="text-sm md:text-base text-[#FAF7F2]/80 leading-relaxed font-light">
            Therapeutic botanical soy candles with crackling wood wicks, paired with pure combed cotton
            crochet keepsakes. Every commission crafted to order with personalized calligraphy gift notes.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenCustomStudio()}
              className="px-6 py-3 rounded-2xl bg-[#9d3e1d] hover:bg-[#853417] text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <Scissors className="w-4 h-4" />
              <span>Launch Custom Order Studio</span>
            </button>
            <button
              onClick={() => onOpenCartDrawer()}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-sm border border-white/20 flex items-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Shopping Cart</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9d3e1d]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#2D221E]/10 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Catalog', icon: Sparkles },
            { id: 'candle', label: 'Soy Candles', icon: Flame },
            { id: 'crochet', label: 'Crochet Creations', icon: Scissors },
            { id: 'gift_box', label: 'Gift Hampers', icon: Gift },
            { id: 'wax_melt', label: 'Wax Melts', icon: Layers },
          ].map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#2D221E] text-white shadow-md'
                    : 'bg-[#FAF7F2] text-[#2D221E]/70 hover:bg-[#2D221E]/5 hover:text-[#2D221E]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F4D35E]' : 'text-[#9d3e1d]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#2D221E]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search scent, yarn, item..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#2D221E]/15 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#9d3e1d]/30"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlist.includes(product.id);
          const wasJustAdded = addedAnimationSku === product.sku;

          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#2D221E]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#9d3e1d]/40"
            >
              {/* Product Image & Badges */}
              <div className="relative h-60 overflow-hidden bg-[#FAF7F2]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Fulfillment Mode Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.fulfillmentMode === 'ready_to_ship' ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#1E6B43] text-white shadow-md">
                      Ready to Ship
                    </span>
                  ) : product.fulfillmentMode === 'made_to_order' ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#9d3e1d] text-white shadow-md">
                      Made-to-Order
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#2D221E] text-white shadow-md">
                      Curated Set
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all ${
                    isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white/80 text-[#2D221E]/60 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#2D221E]/50 font-['Space_Mono'] uppercase mb-1">
                    <span>{product.craftMedium}</span>
                    <span className="flex items-center gap-1 text-[#9d3e1d]">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{product.rating || 4.9}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => setActivePDPProduct(product)}
                    className="font-['Epilogue'] font-bold text-base text-[#2D221E] group-hover:text-[#9d3e1d] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.title}
                  </h3>
                  <p className="text-xs text-[#2D221E]/65 line-clamp-2 mt-1 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Lead Time & Pricing */}
                <div className="pt-2 border-t border-[#2D221E]/5">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#2D221E]/60 font-medium mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#9d3e1d]" />
                    <span>{product.leadTimeBuffer}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-[#2D221E] font-['Space_Mono']">
                          ₹{product.salePrice || product.mrp}
                        </span>
                        {product.salePrice && product.salePrice < product.mrp && (
                          <span className="text-xs text-[#2D221E]/40 line-through font-['Space_Mono']">
                            ₹{product.mrp}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#1E6B43] font-semibold">Taxes included</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActivePDPProduct(product)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-[#2D221E] bg-[#FAF7F2] hover:bg-[#2D221E]/10 transition-colors"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-all ${
                          wasJustAdded
                            ? 'bg-[#1E6B43] scale-105'
                            : 'bg-[#9d3e1d] hover:bg-[#853417]'
                        }`}
                      >
                        {wasJustAdded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal (PDP) */}
      {activePDPProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#2D221E]/15 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-[#2D221E] text-white px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase font-['Space_Mono'] text-[#F4D35E]">
                Artisanal Specifications • {activePDPProduct.sku}
              </span>
              <button
                onClick={() => setActivePDPProduct(null)}
                className="text-white/60 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[80vh] overflow-y-auto">
              {/* Left Column: Image & Badges */}
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-[#2D221E]/15 bg-white aspect-square">
                  <img
                    src={activePDPProduct.image}
                    alt={activePDPProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#2D221E]/10 space-y-2 text-xs">
                  <div className="font-bold text-[#2D221E] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1E6B43]" />
                    <span>The DashNit Craft Guarantee</span>
                  </div>
                  <p className="text-[#2D221E]/70 leading-relaxed text-[11px]">
                    100% natural, biodegradable soy wax, non-toxic lead-free wicks, and hand-stitched
                    organic combed cotton. 100% replacement warranty for any courier transit damage.
                  </p>
                </div>
              </div>

              {/* Right Column: Specs */}
              <div className="space-y-5">
                <div>
                  <span className="text-[11px] font-bold text-[#9d3e1d] uppercase font-['Space_Mono']">
                    {activePDPProduct.craftMedium}
                  </span>
                  <h2 className="font-['Epilogue'] font-bold text-2xl text-[#2D221E] mt-1">
                    {activePDPProduct.title}
                  </h2>
                  <p className="text-xs text-[#2D221E]/70 mt-1">{activePDPProduct.subtitle}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 p-3.5 bg-white rounded-2xl border border-[#2D221E]/10">
                  <span className="text-2xl font-extrabold text-[#2D221E] font-['Space_Mono']">
                    ₹{activePDPProduct.salePrice || activePDPProduct.mrp}
                  </span>
                  {activePDPProduct.salePrice && (
                    <span className="text-sm text-[#2D221E]/40 line-through font-['Space_Mono']">
                      ₹{activePDPProduct.mrp}
                    </span>
                  )}
                  <span className="text-xs text-[#1E6B43] font-semibold ml-auto">Free shipping over ₹999</span>
                </div>

                {/* Description */}
                {activePDPProduct.description && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-[#2D221E] uppercase font-['Space_Mono']">
                      Atelier Description
                    </span>
                    <p className="text-xs text-[#2D221E]/80 leading-relaxed bg-white p-3 rounded-xl border border-[#2D221E]/10">
                      {activePDPProduct.description}
                    </p>
                  </div>
                )}

                {/* Fragrance Pyramid (If Candle) */}
                {activePDPProduct.fragranceNotes && (
                  <div className="space-y-2 p-3.5 rounded-2xl bg-[#9d3e1d]/5 border border-[#9d3e1d]/20">
                    <span className="text-xs font-bold text-[#9d3e1d] uppercase font-['Space_Mono'] flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Fragrance Pyramid</span>
                    </span>
                    <div className="text-xs space-y-1">
                      <div>
                        <strong className="text-[#2D221E]">Top Note:</strong>{' '}
                        <span className="text-[#2D221E]/80">{activePDPProduct.fragranceNotes.top}</span>
                      </div>
                      <div>
                        <strong className="text-[#2D221E]">Heart:</strong>{' '}
                        <span className="text-[#2D221E]/80">{activePDPProduct.fragranceNotes.middle}</span>
                      </div>
                      <div>
                        <strong className="text-[#2D221E]">Base Note:</strong>{' '}
                        <span className="text-[#2D221E]/80">{activePDPProduct.fragranceNotes.base}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dimensions & Burn Time */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {activePDPProduct.burnTimeHours && (
                    <div className="p-3 bg-white rounded-xl border border-[#2D221E]/10">
                      <span className="text-[10px] text-[#2D221E]/50 font-bold uppercase font-['Space_Mono'] block">
                        Burn Longevity
                      </span>
                      <span className="font-bold text-[#2D221E]">~{activePDPProduct.burnTimeHours} Hours</span>
                    </div>
                  )}
                  {activePDPProduct.dimensions && (
                    <div className="p-3 bg-white rounded-xl border border-[#2D221E]/10">
                      <span className="text-[10px] text-[#2D221E]/50 font-bold uppercase font-['Space_Mono'] block">
                        Dimensions
                      </span>
                      <span className="font-bold text-[#2D221E] truncate block">
                        {activePDPProduct.dimensions}
                      </span>
                    </div>
                  )}
                </div>

                {/* Pincode Estimator */}
                <div className="p-3.5 bg-white rounded-2xl border border-[#2D221E]/10 space-y-2">
                  <span className="text-xs font-bold text-[#2D221E] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#9d3e1d]" />
                    <span>Estimated Pan-India Delivery Date</span>
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit PIN"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-[#2D221E]/20 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#9d3e1d]/30"
                    />
                    <button
                      onClick={handlePincodeCheck}
                      className="px-4 py-1.5 rounded-xl bg-[#2D221E] text-white text-xs font-bold"
                    >
                      Verify
                    </button>
                  </div>
                  {pincodeVerified === true && (
                    <p className="text-[11px] text-[#1E6B43] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PIN {pincode} is serviceable by Delhivery Express! Estimated: in 3 business days.</span>
                    </p>
                  )}
                  {pincodeVerified === false && (
                    <p className="text-[11px] text-red-600 font-semibold">
                      Please enter a valid 6-digit Indian PIN code.
                    </p>
                  )}
                </div>

                {/* Modal Add to Cart CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      handleQuickAdd(activePDPProduct);
                      setActivePDPProduct(null);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#9d3e1d] hover:bg-[#853417] text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ₹{activePDPProduct.salePrice || activePDPProduct.mrp}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
