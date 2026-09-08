import React from 'react';
import {
  LayoutGrid,
  Package,
  Truck,
  TrendingUp,
  Network,
  Palette,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import { ActiveNavTab } from '../types';

interface SidebarProps {
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  craftingActiveCount: number;
  lowStockCount: number;
  readyOrdersCount: number;
  onOpenDocs: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  craftingActiveCount,
  lowStockCount,
  readyOrdersCount,
  onOpenDocs,
}) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white z-30 flex flex-col justify-between border-r border-[#E5DBD0] shadow-[0_1px_8px_rgba(0,0,0,0.02)] pt-20 pb-6">
      <div className="flex flex-col flex-1 px-3">
        {/* Section Header */}
        <div className="px-3 py-2 mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851] font-['Plus_Jakarta_Sans']">
            Studio Operations
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9d3e1d] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9d3e1d]"></span>
          </span>
        </div>

        {/* Navigation list matching the exact design */}
        <nav className="space-y-1 font-['Plus_Jakarta_Sans']">
          <button
            onClick={() => setActiveTab('crafting-queue')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left ${
              activeTab === 'crafting-queue'
                ? 'bg-[#fee9e5] text-[#9d3e1d] font-bold shadow-[0_1px_3px_rgba(45,34,30,0.04)]'
                : 'text-[#56423c] hover:bg-[#F3EDE4] hover:text-[#2D221E]'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-5 h-5 text-current" />
              <span className="text-[13px]">Crafting Queue</span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FEF5EA] text-[#A35C00] border border-[#F8CCA0]/50">
              {craftingActiveCount} Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab('catalog-and-inventory')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left ${
              activeTab === 'catalog-and-inventory'
                ? 'bg-[#fee9e5] text-[#9d3e1d] font-bold shadow-[0_1px_3px_rgba(45,34,30,0.04)]'
                : 'text-[#56423c] hover:bg-[#F3EDE4] hover:text-[#2D221E]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-current" />
              <span className="text-[13px]">Catalog & Inventory</span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FDF2F2] text-[#9B2C2C] border border-[#F3B5B5]/60">
              {lowStockCount} Low
            </span>
          </button>

          <button
            onClick={() => setActiveTab('orders-and-logistics')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left ${
              activeTab === 'orders-and-logistics'
                ? 'bg-[#fee9e5] text-[#9d3e1d] font-bold shadow-[0_1px_3px_rgba(45,34,30,0.04)]'
                : 'text-[#56423c] hover:bg-[#F3EDE4] hover:text-[#2D221E]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-current" />
              <span className="text-[13px]">Orders & Logistics</span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF6F0] text-[#1E6B43] border border-[#A3D9BC]/60">
              {readyOrdersCount} Ready
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics-and-revenue')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left ${
              activeTab === 'analytics-and-revenue'
                ? 'bg-[#fee9e5] text-[#9d3e1d] font-bold shadow-[0_1px_3px_rgba(45,34,30,0.04)]'
                : 'text-[#56423c] hover:bg-[#F3EDE4] hover:text-[#2D221E]'
            }`}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-current" />
              <span className="text-[13px]">Analytics & Revenue</span>
            </div>
          </button>

          <div className="pt-3 pb-1 border-t border-[#E5DBD0]/70 mt-3">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#9C8880]">
              Architecture & Studio
            </span>
          </div>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left ${
              activeTab === 'architecture'
                ? 'bg-[#fee9e5] text-[#9d3e1d] font-bold shadow-[0_1px_3px_rgba(45,34,30,0.04)]'
                : 'text-[#56423c] hover:bg-[#F3EDE4] hover:text-[#2D221E]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Network className="w-5 h-5 text-current" />
              <span className="text-[13px]">Architecture Blueprint</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FAF7F2] text-[#6B5851] border border-[#D3C2B1]">
              SaaS
            </span>
          </button>

          <button
            onClick={() => setActiveTab('custom-studio')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left ${
              activeTab === 'custom-studio'
                ? 'bg-[#fee9e5] text-[#9d3e1d] font-bold shadow-[0_1px_3px_rgba(45,34,30,0.04)]'
                : 'text-[#56423c] hover:bg-[#F3EDE4] hover:text-[#2D221E]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-current" />
              <span className="text-[13px]">Custom Order Studio</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FEF5EA] text-[#A35C00]">
              PRD
            </span>
          </button>
        </nav>
      </div>

      {/* Sidebar Footer Widgets */}
      <div className="px-4 space-y-2.5">
        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] flex items-center justify-between shadow-[0_1px_3px_rgba(45,34,30,0.03)]">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-[#1E6B43]" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#2D221E] font-['Plus_Jakarta_Sans']">
                WhatsApp Sync
              </span>
              <span className="text-[10px] text-[#6B5851]">Automated Updates</span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBF6F0] text-[#1E6B43] font-bold font-['Space_Mono'] border border-[#A3D9BC]/60">
            Connected
          </span>
        </div>

        <button
          onClick={onOpenDocs}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#6B5851] hover:bg-[#F3EDE4] hover:text-[#2D221E] transition-colors text-left"
        >
          <BookOpen className="w-4 h-4 text-[#9C8880]" />
          <span className="text-xs font-medium font-['Plus_Jakarta_Sans']">
            Docs & Crafter Guides
          </span>
        </button>
      </div>
    </aside>
  );
};
