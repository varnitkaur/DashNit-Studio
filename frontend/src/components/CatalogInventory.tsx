import React, { useState, useMemo } from 'react';
import {
  Package,
  Layers,
  Users,
  AlertTriangle,
  Download,
  PlusCircle,
  RotateCw,
  Search,
  CheckCircle2,
  TrendingDown,
  ShoppingCart,
  Send,
  SlidersHorizontal,
  Flame,
  ShoppingBag,
  Gift,
  Check,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { CatalogProduct, RawMaterial } from '../types';

interface CatalogInventoryProps {
  products: CatalogProduct[];
  rawMaterials: RawMaterial[];
  onAddProduct: () => void;
  onOpenPurchaseOrder: (raw?: RawMaterial) => void;
  onTriggerBatchPour: (sku: string) => void;
}

export const CatalogInventory: React.FC<CatalogInventoryProps> = ({
  products,
  rawMaterials,
  onAddProduct,
  onOpenPurchaseOrder,
  onTriggerBatchPour,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'raw-materials'>('catalog');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMedium, setSelectedMedium] = useState<string>('all');
  const [lastAuditTime, setLastAuditTime] = useState('18m ago');
  const [isAuditing, setIsAuditing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleForceRecount = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setLastAuditTime('Just now');
      showToast('Inventory audit completed. Ledger fully synchronized!');
    }, 900);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.craftMedium.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedCategory === 'rts' && p.fulfillmentMode !== 'ready_to_ship')
        return false;
      if (selectedCategory === 'mto' && p.fulfillmentMode !== 'made_to_order')
        return false;
      if (selectedCategory === 'hybrid' && p.fulfillmentMode !== 'hybrid')
        return false;

      if (selectedMedium !== 'all' && p.category !== selectedMedium) return false;

      return true;
    });
  }, [products, productSearch, selectedCategory, selectedMedium]);

  const lowStockMaterials = rawMaterials.filter(
    (m) => m.status === 'low' || m.status === 'critical'
  );

  return (
    <div className="flex flex-col w-full space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D221E] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 border border-[#9d3e1d]/40">
          <CheckCircle2 className="w-4 h-4 text-[#A3D9BC]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Badge & Audit Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-md bg-[#fee9e5] text-[#9d3e1d] font-bold text-[11px] font-['Space_Mono'] uppercase">
            INVENTORY LEDGER SYNCED
          </span>
          <span className="text-xs text-[#6B5851] font-medium hidden sm:inline">
            Jaipur Central Workshop • Safety Buffer Auto-Audits: ON
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#9C8880]">
            Last audit: <strong className="text-[#2D221E]">{lastAuditTime}</strong> (by Nita S.)
          </span>
          <button
            onClick={handleForceRecount}
            disabled={isAuditing}
            className="px-3 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] text-xs font-bold flex items-center gap-1.5 transition-all border border-[#E5DBD0] active:scale-95 disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin text-[#9d3e1d]' : ''}`} />
            <span>{isAuditing ? 'Auditing...' : 'Force Recount'}</span>
          </button>
        </div>
      </div>

      {/* Header & Main Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="font-['Epilogue'] text-2xl lg:text-3xl font-bold text-[#2D221E] tracking-tight">
            Catalog & Inventory Supervisor
          </h1>
          <p className="text-xs lg:text-sm text-[#6B5851] mt-1 font-['Plus_Jakarta_Sans'] max-w-3xl">
            Manage Finished SKUs, Dual-Track Stock (Ready-to-Ship batch reserves vs Made-to-Order artisan pipelines), and Raw Crafting Supplies with automated reorder thresholds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => showToast('Catalog CSV exported to downloads folder')}
            className="px-3 py-2 rounded-xl bg-[#F3EDE4] hover:bg-[#EDE5D8] text-[#2D221E] text-xs font-semibold flex items-center gap-2 transition-all border border-[#E5DBD0] shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4 text-[#6B5851]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => onOpenPurchaseOrder()}
            className="px-3 py-2 rounded-xl bg-[#F3EDE4] hover:bg-[#EDE5D8] text-[#2D221E] text-xs font-semibold flex items-center gap-2 transition-all border border-[#E5DBD0] shadow-sm active:scale-95"
          >
            <ShoppingCart className="w-4 h-4 text-[#9d3e1d]" />
            <span>Raw Supply Purchase Order</span>
          </button>
          <button
            onClick={onAddProduct}
            className="px-4 py-2 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add New Product</span>
          </button>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
              Catalog Capacity
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
                38
              </span>
              <span className="text-xs text-[#1E6B43] font-bold">+4 this month</span>
            </div>
            <span className="text-[11px] text-[#9C8880] mt-0.5 block">
              Active SKUs Listed
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#fee9e5] flex items-center justify-center text-[#9d3e1d]">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
              Fulfillment Ready
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#1E6B43]">
                142
              </span>
              <span className="text-xs text-[#6B5851]">Units</span>
            </div>
            <span className="text-[11px] text-[#9C8880] mt-0.5 block">
              Cured & Boxed (4.2h dispatch)
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#EBF6F0] flex items-center justify-center text-[#1E6B43]">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
              Crafting Pipeline
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#A35C00]">
                24
              </span>
              <span className="text-xs text-[#6B5851]">MTO Active</span>
            </div>
            <span className="text-[11px] text-[#9C8880] mt-0.5 block">
              5 Artisans Busy (3–6d lead)
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#FEF5EA] flex items-center justify-center text-[#A35C00]">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba1a1a]">
              Workshop Safety Buffers
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#ba1a1a]">
                3
              </span>
              <span className="text-xs text-[#ba1a1a] font-bold">Action Needed</span>
            </div>
            <span className="text-[11px] text-[#9C8880] mt-0.5 block">
              Amber Jars & Soy Wax Flakes
            </span>
          </div>
          <button
            onClick={() => setActiveTab('raw-materials')}
            className="px-3 py-1.5 rounded-xl bg-[#FDF2F2] hover:bg-[#ba1a1a] hover:text-white text-[#9B2C2C] text-xs font-bold transition-all border border-[#F3B5B5]/60 flex items-center gap-1"
          >
            <span>Inspect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Section Selector: Finished vs Raw */}
      <div className="flex items-center gap-2 border-b border-[#E5DBD0] pb-2">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'catalog'
              ? 'bg-[#9d3e1d] text-white shadow-sm'
              : 'bg-white text-[#6B5851] hover:bg-[#F3EDE4] border border-[#E5DBD0]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Finished Products & Craft Catalog ({products.length} SKUs)</span>
        </button>

        <button
          onClick={() => setActiveTab('raw-materials')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'raw-materials'
              ? 'bg-[#ba1a1a] text-white shadow-sm'
              : 'bg-white text-[#6B5851] hover:bg-[#F3EDE4] border border-[#E5DBD0]'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>
            Raw Materials & Workshop Safety Buffers ({lowStockMaterials.length} Alerts)
          </span>
        </button>
      </div>

      {/* TAB 1: FINISHED PRODUCTS CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          {/* Filters and search row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
            <div className="relative flex items-center w-72">
              <Search className="absolute left-3 text-[#9C8880] w-4 h-4" />
              <input
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-transparent focus:border-[#D3C2B1] text-xs text-[#2D221E] placeholder:text-[#9C8880] focus:outline-none focus:bg-white"
                placeholder="Search catalog by SKU, name, scent profile..."
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#2D221E] text-white'
                    : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#6B5851]'
                }`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => setSelectedCategory('rts')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'rts'
                    ? 'bg-[#1E6B43] text-white'
                    : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#6B5851]'
                }`}
              >
                Ready-to-Ship ({products.filter((p) => p.fulfillmentMode === 'ready_to_ship').length})
              </button>
              <button
                onClick={() => setSelectedCategory('mto')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'mto'
                    ? 'bg-[#A35C00] text-white'
                    : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#6B5851]'
                }`}
              >
                Made-to-Order ({products.filter((p) => p.fulfillmentMode === 'made_to_order').length})
              </button>
              <button
                onClick={() => setSelectedCategory('hybrid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'hybrid'
                    ? 'bg-[#9d3e1d] text-white'
                    : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#6B5851]'
                }`}
              >
                Hybrid Kits (1)
              </button>

              <div className="h-5 w-px bg-[#E5DBD0] hidden sm:block"></div>

              <select
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] text-xs font-semibold text-[#2D221E] focus:outline-none"
              >
                <option value="all">Craft Medium: All</option>
                <option value="candle">Soy Candles</option>
                <option value="crochet">Crochet Apparel & Décor</option>
                <option value="gift_box">Curated Hampers</option>
              </select>
            </div>
          </div>

          {/* Catalog Table */}
          <div className="bg-white rounded-2xl border border-[#E5DBD0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E5DBD0] text-[11px] font-bold text-[#6B5851] uppercase tracking-wider">
                    <th className="py-3.5 px-4">SKU & Product Details</th>
                    <th className="py-3.5 px-3">Craft Medium</th>
                    <th className="py-3.5 px-3">Fulfillment Mode & Inventory Track</th>
                    <th className="py-3.5 px-3">Lead Time Buffer</th>
                    <th className="py-3.5 px-3">MRP (incl. GST)</th>
                    <th className="py-3.5 px-4 text-right">Studio Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DBD0]/70">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-[#FAF7F2]/60 transition-colors group"
                    >
                      {/* Product details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E5DBD0] shadow-xs"
                          />
                          <div>
                            <div className="font-['Space_Mono'] text-[10px] font-bold text-[#9d3e1d] bg-[#fee9e5] px-1.5 py-0.5 rounded w-fit mb-0.5">
                              {product.sku}
                            </div>
                            <span className="font-bold text-[#2D221E] block text-xs font-['Plus_Jakarta_Sans']">
                              {product.title}
                            </span>
                            <span className="text-[11px] text-[#6B5851]">
                              {product.subtitle}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Craft medium */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          {product.category === 'candle' && (
                            <span className="px-2 py-0.5 rounded-full bg-[#FEF5EA] text-[#A35C00] font-bold text-[10px] border border-[#F8CCA0]/60 flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              Soy Candle
                            </span>
                          )}
                          {product.category === 'crochet' && (
                            <span className="px-2 py-0.5 rounded-full bg-[#F3EDE4] text-[#6B5851] font-bold text-[10px] border border-[#E5DBD0] flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3 text-[#9d3e1d]" />
                              Crochet
                            </span>
                          )}
                          {product.category === 'gift_box' && (
                            <span className="px-2 py-0.5 rounded-full bg-[#EBF6F0] text-[#1E6B43] font-bold text-[10px] border border-[#A3D9BC]/60 flex items-center gap-1">
                              <Gift className="w-3 h-3" />
                              Gift Box (Hybrid)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Fulfillment mode */}
                      <td className="py-3.5 px-3">
                        {product.fulfillmentMode === 'ready_to_ship' && (
                          <div className="space-y-1">
                            {product.criticalLow ? (
                              <span className="px-2 py-0.5 rounded-full bg-[#FDF2F2] text-[#ba1a1a] font-bold text-[10px] border border-[#F3B5B5]">
                                Only {product.stockCount} units left!
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-[#EBF6F0] text-[#1E6B43] font-bold text-[10px] border border-[#A3D9BC]">
                                Ready-to-Ship: {product.stockCount} units
                              </span>
                            )}
                            <p className="text-[10px] text-[#6B5851]">
                              {product.statusText}
                            </p>
                          </div>
                        )}

                        {product.fulfillmentMode === 'made_to_order' && (
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded-full bg-[#FEF5EA] text-[#A35C00] font-bold text-[10px] border border-[#F8CCA0]">
                              Made-to-Order (Active Routing)
                            </span>
                            <p className="text-[10px] text-[#6B5851]">
                              {product.crafterAssigned}
                            </p>
                          </div>
                        )}

                        {product.fulfillmentMode === 'hybrid' && (
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded-full bg-[#fee9e5] text-[#9d3e1d] font-bold text-[10px] border border-[#D3C2B1]">
                              Hybrid Stock ({product.stockCount} ready)
                            </span>
                            <p className="text-[10px] text-[#6B5851]">
                              {product.statusText}
                            </p>
                          </div>
                        )}
                      </td>

                      {/* Lead Time */}
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-[#2D221E] font-['Space_Mono'] text-[11px]">
                          {product.leadTimeBuffer}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col">
                          <span className="font-['Epilogue'] text-sm font-bold text-[#2D221E]">
                            ₹{product.mrp.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-[#9C8880]">
                            incl. {product.gstRate} GST
                          </span>
                        </div>
                      </td>

                      {/* Controls */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {product.criticalLow ? (
                            <button
                              onClick={() => {
                                onTriggerBatchPour(product.sku);
                                showToast(`Triggered batch pour for ${product.title}`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#ba1a1a] hover:bg-[#9d3e1d] text-white text-[11px] font-bold transition-all shadow-xs"
                            >
                              Trigger Pour Batch
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => showToast(`Edit modal opened for ${product.sku}`)}
                                className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] text-[11px] font-semibold border border-[#E5DBD0] transition-all"
                              >
                                Edit Specs
                              </button>
                              <button
                                onClick={() => showToast(`Stock adjusted for ${product.sku}`)}
                                className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#9d3e1d] text-[11px] font-bold border border-[#E5DBD0] transition-all"
                              >
                                Adjust
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RAW MATERIALS & SAFETY BUFFERS */}
      {activeTab === 'raw-materials' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rawMaterials.map((material) => (
              <div
                key={material.id}
                className={`p-4 rounded-2xl bg-white border transition-all flex flex-col justify-between space-y-3 ${
                  material.status === 'critical'
                    ? 'border-[#F3B5B5] shadow-[0_2px_12px_rgba(186,26,26,0.08)] ring-1 ring-[#ba1a1a]/30'
                    : material.status === 'low'
                    ? 'border-[#F8CCA0] shadow-sm'
                    : 'border-[#E5DBD0] shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-['Space_Mono'] text-[10px] font-bold text-[#6B5851] bg-[#FAF7F2] px-1.5 py-0.5 rounded">
                        {material.sku}
                      </span>
                      <h3 className="font-bold text-sm text-[#2D221E] mt-1 font-['Plus_Jakarta_Sans']">
                        {material.name}
                      </h3>
                      <p className="text-[11px] text-[#6B5851]">
                        {material.batchInfo}
                      </p>
                    </div>
                    {material.status === 'critical' && (
                      <span className="px-2 py-0.5 rounded-full bg-[#FDF2F2] text-[#ba1a1a] text-[10px] font-bold flex items-center gap-1 border border-[#F3B5B5]">
                        Critical Alert
                      </span>
                    )}
                    {material.status === 'low' && (
                      <span className="px-2 py-0.5 rounded-full bg-[#FEF5EA] text-[#A35C00] text-[10px] font-bold border border-[#F8CCA0]">
                        Low Buffer
                      </span>
                    )}
                    {material.status === 'normal' && (
                      <span className="px-2 py-0.5 rounded-full bg-[#EBF6F0] text-[#1E6B43] text-[10px] font-bold">
                        Normal
                      </span>
                    )}
                    {material.status === 'sufficient' && (
                      <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#6B5851] text-[10px] font-bold">
                        Sufficient
                      </span>
                    )}
                  </div>

                  {/* Stock Level Bar */}
                  <div className="mt-3 p-3 rounded-xl bg-[#FAF7F2] space-y-1.5 border border-[#E5DBD0]/70">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-[#6B5851]">Available Stock</span>
                      <span className="font-['Epilogue'] font-bold text-sm text-[#2D221E]">
                        {material.stockLevel} {material.unit}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E5DBD0]/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          material.status === 'critical'
                            ? 'bg-[#ba1a1a]'
                            : material.status === 'low'
                            ? 'bg-[#A35C00]'
                            : 'bg-[#1E6B43]'
                        }`}
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(12, (material.stockLevel / material.threshold) * 60)
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#9C8880] font-['Space_Mono']">
                      <span>Threshold: {material.threshold}</span>
                      <span>Supplier: {material.supplier}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom PO Action */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F3EDE4]">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#6B5851]">Standard Order</span>
                    <span className="text-xs font-bold text-[#2D221E] font-['Space_Mono']">
                      {material.standardOrderQty} (Est: ₹{material.estimateCost})
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenPurchaseOrder(material)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                      material.status === 'critical'
                        ? 'bg-[#ba1a1a] hover:bg-[#9d3e1d] text-white shadow-xs'
                        : 'bg-[#F3EDE4] hover:bg-[#9d3e1d] hover:text-white text-[#2D221E]'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{material.status === 'critical' ? 'Urgent PO' : '1-Click PO'}</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Material Card */}
            <div
              onClick={() => onOpenPurchaseOrder()}
              className="p-6 rounded-2xl border-2 border-dashed border-[#D3C2B1] hover:border-[#9d3e1d] transition-all flex flex-col items-center justify-center text-center cursor-pointer bg-white/50 hover:bg-[#FAF7F2] space-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-[#2D221E] font-['Plus_Jakarta_Sans']">
                Register New Raw Material Lot
              </h3>
              <p className="text-xs text-[#6B5851] max-w-[200px]">
                Add organic soy waxes, cotton yarn skeins, or artisan vessels.
              </p>
            </div>
          </div>

          {/* Workshop Velocity & Burn Rate Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Burn rate chart preview */}
            <div className="lg:col-span-2 p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#6B5851]">
                    Workshop Velocity • 7-Day Material Burn Rate
                  </h3>
                  <span className="text-xs text-[#2D221E] font-semibold">
                    Soy Wax: 42.8 kg / wk (Peak Saturday pours)
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#1E6B43] bg-[#EBF6F0] px-2 py-0.5 rounded-full border border-[#A3D9BC]">
                  Safe Burn Rate
                </span>
              </div>

              {/* Minimal SVG Bar chart representing Mon-Sun */}
              <div className="h-28 flex items-end justify-between gap-3 pt-4 px-2">
                {[
                  { day: 'Mon', kg: 18, highlight: false },
                  { day: 'Tue', kg: 24, highlight: false },
                  { day: 'Wed', kg: 31, highlight: false },
                  { day: 'Thu', kg: 28, highlight: false },
                  { day: 'Fri', kg: 39, highlight: false },
                  { day: 'Sat', kg: 48, highlight: true },
                  { day: 'Sun', kg: 22, highlight: false },
                ].map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-['Space_Mono'] text-[#6B5851]">
                      {item.kg}k
                    </span>
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        item.highlight ? 'bg-[#9d3e1d]' : 'bg-[#fee9e5] hover:bg-[#D3C2B1]'
                      }`}
                      style={{ height: `${(item.kg / 50) * 100}%` }}
                    ></div>
                    <span className="text-[10px] text-[#9C8880] font-semibold">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Mill WhatsApp Dispatch */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-[#1E6B43] text-xs font-bold mb-1">
                  <Send className="w-4 h-4" />
                  <span>Direct Mill WhatsApp Dispatch</span>
                </div>
                <h4 className="font-bold text-sm text-[#2D221E]">
                  Firozabad Glass & Coimbatore Mills
                </h4>
                <p className="text-xs text-[#6B5851] mt-1">
                  Purchase orders auto-compile GST e-invoices and transmit PDF manifests directly to vendor verified business numbers.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E5DBD0] text-xs space-y-1">
                <div className="flex justify-between text-[#6B5851]">
                  <span>Avg Vendor Lead</span>
                  <span className="font-bold text-[#2D221E]">48 hrs</span>
                </div>
                <div className="flex justify-between text-[#6B5851]">
                  <span>Direct WhatsApp API</span>
                  <span className="text-[#1E6B43] font-bold">Encrypted / Active</span>
                </div>
              </div>

              <button
                onClick={() => showToast('Vendor ping sent to Coimbatore Mills via WhatsApp API')}
                className="w-full py-2 rounded-xl bg-white hover:bg-[#F3EDE4] text-[#2D221E] border border-[#E5DBD0] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Test Vendor Ping</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#9C8880]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
