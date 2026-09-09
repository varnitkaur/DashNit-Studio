import React, { useState, useEffect } from 'react';
import { UserCart } from '../types';
import { apiFetchActiveCarts } from '../services/apiService';
import {
  ShoppingBag,
  Clock,
  User,
  ArrowUpRight,
  RefreshCw,
  Sparkles,
  DollarSign,
  TrendingUp,
  Package,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AdminCartActivityViewProps {
  onRefresh?: () => void;
}

export const AdminCartActivityView: React.FC<AdminCartActivityViewProps> = () => {
  const [activeCarts, setActiveCarts] = useState<UserCart[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCartUser, setExpandedCartUser] = useState<string | null>(null);

  const fetchCarts = async () => {
    setIsLoading(true);
    const data = await apiFetchActiveCarts();
    setActiveCarts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const totalPipelineValue = activeCarts.reduce((sum, c) => sum + (c.subtotal || 0), 0);
  const totalActiveItems = activeCarts.reduce(
    (sum, c) => sum + (c.items?.reduce((iSum, i) => iSum + i.quantity, 0) || 0),
    0
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* View Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#2D221E]/10 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9d3e1d] font-['Space_Mono']">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Time Database Ingestion</span>
          </div>
          <h2 className="font-['Epilogue'] font-bold text-2xl text-[#2D221E] mt-1">
            Live Customer Cart & Activity Monitor
          </h2>
          <p className="text-xs text-[#2D221E]/65 max-w-xl mt-1 leading-relaxed">
            Real-time MongoDB tracking of customer cart additions, in-progress custom commissions,
            and checkout intent across Pan-India visitors.
          </p>
        </div>

        <button
          onClick={fetchCarts}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-2xl bg-[#2D221E] hover:bg-[#1a1412] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-transform hover:scale-105"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#F4D35E]' : ''}`} />
          <span>{isLoading ? 'Syncing...' : 'Sync Active Carts'}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#2D221E]/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#9d3e1d]/10 text-[#9d3e1d] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#2D221E]/50 font-['Space_Mono'] uppercase block">
              Active In-Progress Carts
            </span>
            <span className="text-2xl font-extrabold text-[#2D221E] font-['Space_Mono']">
              {activeCarts.length}
            </span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#2D221E]/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1E6B43]/10 text-[#1E6B43] flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#2D221E]/50 font-['Space_Mono'] uppercase block">
              Pipeline Cart Value
            </span>
            <span className="text-2xl font-extrabold text-[#1E6B43] font-['Space_Mono']">
              ₹{totalPipelineValue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#2D221E]/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F4D35E]/20 text-[#2D221E] flex items-center justify-center">
            <Package className="w-6 h-6 text-[#9d3e1d]" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#2D221E]/50 font-['Space_Mono'] uppercase block">
              Units in Cart
            </span>
            <span className="text-2xl font-extrabold text-[#2D221E] font-['Space_Mono']">
              {totalActiveItems} Units
            </span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#2D221E]/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#2D221E]/10 text-[#2D221E] flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#2D221E]/50 font-['Space_Mono'] uppercase block">
              Average Cart Value
            </span>
            <span className="text-2xl font-extrabold text-[#2D221E] font-['Space_Mono']">
              ₹{activeCarts.length > 0 ? Math.round(totalPipelineValue / activeCarts.length) : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Customer Carts Table */}
      <div className="bg-white rounded-3xl border border-[#2D221E]/10 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#2D221E]/10 flex items-center justify-between">
          <h3 className="font-['Epilogue'] font-bold text-base text-[#2D221E]">
            Live Customer Carts in MongoDB
          </h3>
          <span className="text-xs text-[#2D221E]/50 font-['Space_Mono']">
            Source: Cluster0 / dashnit_studio.carts
          </span>
        </div>

        {activeCarts.length === 0 ? (
          <div className="p-12 text-center text-[#2D221E]/50 space-y-2">
            <ShoppingBag className="w-8 h-8 mx-auto text-[#2D221E]/20" />
            <p className="text-sm font-semibold">No active customer carts currently in MongoDB.</p>
            <p className="text-xs">Switch to Customer View and click "Add to Cart" to see live tracking here!</p>
          </div>
        ) : (
          <div className="divide-y divide-[#2D221E]/5">
            {activeCarts.map((cart) => {
              const isExpanded = expandedCartUser === cart.userId;
              const itemCount = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

              return (
                <div key={cart.userId} className="p-5 hover:bg-[#FAF7F2]/50 transition-colors">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Customer Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#2D221E]/15 flex items-center justify-center font-bold text-[#9d3e1d] font-['Space_Mono']">
                        {cart.customerName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#2D221E]">{cart.customerName}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1E6B43]/10 text-[#1E6B43]">
                            Active Cart
                          </span>
                        </div>
                        <div className="text-xs text-[#2D221E]/60 flex items-center gap-2 font-['Space_Mono'] mt-0.5">
                          <span>{cart.customerPhone || 'Direct Web Visitor'}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Updated: {new Date(cart.updatedAt).toLocaleTimeString()}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cart Summary & Action */}
                    <div className="flex items-center gap-6 self-end md:self-auto">
                      <div className="text-right">
                        <div className="text-xs text-[#2D221E]/60 font-semibold">{itemCount} Item(s)</div>
                        <div className="text-base font-extrabold text-[#9d3e1d] font-['Space_Mono']">
                          ₹{cart.subtotal.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedCartUser(isExpanded ? null : cart.userId)}
                        className="px-3 py-1.5 rounded-xl border border-[#2D221E]/15 hover:bg-[#2D221E]/5 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Items' : 'Inspect Cart'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Items Drawer */}
                  {isExpanded && cart.items && (
                    <div className="mt-4 pt-4 border-t border-[#2D221E]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in duration-200">
                      {cart.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white rounded-2xl border border-[#2D221E]/10 flex items-center gap-3"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded-xl object-cover border border-[#2D221E]/10"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-[#2D221E] truncate">{item.title}</div>
                            {item.customDetails && (
                              <div className="text-[10px] text-[#9d3e1d] font-medium truncate">
                                {item.customDetails}
                              </div>
                            )}
                            <div className="text-xs font-bold text-[#2D221E] font-['Space_Mono'] mt-0.5">
                              ₹{item.price} × {item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
