import React, { useState, useMemo } from 'react';
import {
  FileText,
  Printer,
  PlusCircle,
  Clock,
  FlaskConical,
  Gauge,
  Search,
  MoreVertical,
  Flame,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  MessageCircle,
  Camera,
  Check,
  PackageCheck,
  Send,
  ExternalLink,
  Hourglass,
  Tag,
  AlertCircle,
  CheckSquare,
} from 'lucide-react';
import { CraftCard, CraftStage } from '../types';

interface CraftingBoardProps {
  cards: CraftCard[];
  onUpdateCardStage: (cardId: string, newStage: CraftStage) => void;
  onOpenNewCommission: () => void;
  onOpenBatchSheet: () => void;
  onOpenOfflineSlips: () => void;
  onInspectCard: (card: CraftCard) => void;
  searchQuery: string;
}

type FilterType = 'all' | 'crochet' | 'candle' | 'urgent';

export const CraftingBoard: React.FC<CraftingBoardProps> = ({
  cards,
  onUpdateCardStage,
  onOpenNewCommission,
  onOpenBatchSheet,
  onOpenOfflineSlips,
  onInspectCard,
  searchQuery,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          card.id.toLowerCase().includes(query) ||
          card.title.toLowerCase().includes(query) ||
          card.customerName.toLowerCase().includes(query) ||
          card.subtitle.toLowerCase().includes(query) ||
          card.details.scent?.toLowerCase().includes(query) ||
          card.details.artisan?.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Filter tabs
      if (activeFilter === 'crochet') return card.type === 'crochet';
      if (activeFilter === 'candle') return card.type === 'candle';
      if (activeFilter === 'urgent') return Boolean(card.urgent);
      return true;
    });
  }, [cards, searchQuery, activeFilter]);

  // Group by stage
  const columns = {
    new_placed: filteredCards.filter((c) => c.stage === 'new_placed'),
    in_crafting: filteredCards.filter((c) => c.stage === 'in_crafting'),
    qc_packaging: filteredCards.filter((c) => c.stage === 'qc_packaging'),
    manifested: filteredCards.filter((c) => c.stage === 'manifested'),
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D221E] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 border border-[#9d3e1d]/40">
          <CheckCircle className="w-4 h-4 text-[#A3D9BC]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Hero Status & Studio Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FEF5EA] text-[#A35C00] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 border border-[#F8CCA0]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9d3e1d] animate-pulse"></span>
              Live Production Board
            </span>
            <span className="text-[#9C8880] text-xs font-medium">
              • Jaipur Craft House Unit 02
            </span>
          </div>
          <h1 className="font-['Epilogue'] text-2xl lg:text-3xl font-bold text-[#2D221E] tracking-tight">
            Artisan Crafting Board
          </h1>
          <p className="text-xs lg:text-sm text-[#6B5851] mt-1 font-['Plus_Jakarta_Sans']">
            {cards.length} Custom Commissions In Progress{' '}
            <span className="text-[#D3C2B1] mx-1.5">•</span> Target SLA:{' '}
            <span className="font-bold text-[#1E6B43]">96% On-Time</span>
          </p>
        </div>

        {/* Quick Studio Level Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenBatchSheet}
            className="px-3 py-2 rounded-xl bg-[#F3EDE4] hover:bg-[#EDE5D8] text-[#2D221E] text-xs font-semibold flex items-center gap-2 transition-all border border-[#E5DBD0] shadow-sm active:scale-95"
          >
            <FileText className="w-4 h-4 text-[#6B5851]" />
            <span>Daily Batch Sheet</span>
          </button>
          <button
            onClick={onOpenOfflineSlips}
            className="px-3 py-2 rounded-xl bg-[#F3EDE4] hover:bg-[#EDE5D8] text-[#2D221E] text-xs font-semibold flex items-center gap-2 transition-all border border-[#E5DBD0] shadow-sm active:scale-95"
          >
            <Printer className="w-4 h-4 text-[#6B5851]" />
            <span>Print Offline Slips</span>
          </button>
          <button
            onClick={onOpenNewCommission}
            className="px-4 py-2 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New Commission</span>
          </button>
        </div>
      </div>

      {/* Studio Queue Analytics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
              Daily Studio Capacity
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
                45
              </span>
              <span className="text-xs text-[#6B5851]">units/day</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#fee9e5] flex items-center justify-center text-[#9d3e1d]">
            <Gauge className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
              Current Active
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#A35C00]">
                {cards.length}
              </span>
              <span className="text-xs text-[#6B5851]">craft slots filled</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FEF5EA] flex items-center justify-center text-[#A35C00]">
            <Search className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
              Avg Crafting Turnaround
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
                4.2
              </span>
              <span className="text-xs text-[#1E6B43] font-bold">↓ 0.4d fast</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#fee9e5] flex items-center justify-center text-[#9d3e1d]">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851]">
              Curing Hold
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#80515a]">
                3
              </span>
              <span className="text-xs text-[#6B5851]">48h Soy Rule</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FDF2F4] flex items-center justify-center text-[#80515a]">
            <FlaskConical className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Ribbon & Stage Quick Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#9d3e1d] text-white shadow-sm'
                : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E]'
            }`}
          >
            All Crafts ({cards.length})
          </button>
          <button
            onClick={() => setActiveFilter('crochet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'crochet'
                ? 'bg-[#9d3e1d] text-white shadow-sm'
                : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E]'
            }`}
          >
            🧶 Crochet Only ({cards.filter((c) => c.type === 'crochet').length})
          </button>
          <button
            onClick={() => setActiveFilter('candle')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'candle'
                ? 'bg-[#9d3e1d] text-white shadow-sm'
                : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E]'
            }`}
          >
            🕯️ Soy Candles ({cards.filter((c) => c.type === 'candle').length})
          </button>
          <button
            onClick={() => setActiveFilter('urgent')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'urgent'
                ? 'bg-[#ba1a1a] text-white shadow-sm'
                : 'bg-[#FDF2F2] hover:bg-[#FDF2F2]/80 text-[#9B2C2C] border border-[#F3B5B5]/60'
            }`}
          >
            <Hourglass className="w-3.5 h-3.5" />
            Urgent (&lt; 48h deadline)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6B5851] hidden md:inline font-medium">
            Sort: Priority SLA
          </span>
          <div className="h-4 w-px bg-[#E5DBD0] hidden md:block"></div>
          <span className="text-xs text-[#9C8880] font-['Space_Mono']">
            {filteredCards.length} matching
          </span>
        </div>
      </div>

      {/* Kanban Viewport */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 min-w-[1150px]">
          {/* COLUMN 1: NEW PLACED */}
          <div className="flex flex-col bg-[#FAF7F2]/90 rounded-2xl p-3.5 space-y-3.5 border border-[#E5DBD0]">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A35C00]"></span>
                <h2 className="font-['Epilogue'] text-sm font-bold text-[#2D221E]">
                  New Placed
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white text-[#6B5851] text-[11px] font-bold shadow-sm border border-[#E5DBD0]">
                  {columns.new_placed.length}
                </span>
              </div>
              <span className="text-[11px] font-['Space_Mono'] text-[#9C8880]">
                STAGE 01
              </span>
            </div>

            <div className="space-y-3">
              {columns.new_placed.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onInspectCard(card)}
                  className="group p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm hover:shadow-md transition-all flex flex-col space-y-3 cursor-pointer relative"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg text-xs font-bold font-['Space_Mono'] bg-[#fee9e5] text-[#9d3e1d]">
                        {card.id}
                      </span>
                      {card.urgent && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FDF2F2] text-[#9B2C2C] text-[10px] font-bold flex items-center gap-1 border border-[#F3B5B5]/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9B2C2C] animate-ping"></span>
                          Urgent
                        </span>
                      )}
                      {card.tag && !card.urgent && (
                        <span className="px-2 py-0.5 rounded-full bg-[#F3EDE4] text-[#6B5851] text-[10px] font-semibold">
                          {card.tag}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectCard(card);
                      }}
                      className="text-[#9C8880] hover:text-[#9d3e1d] transition-colors p-1"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex gap-3 items-center">
                    <div className="w-11 h-11 rounded-xl bg-[#fee9e5] flex-shrink-0 flex items-center justify-center text-[#9d3e1d]">
                      {card.type === 'candle' ? (
                        <Flame className="w-6 h-6" />
                      ) : card.type === 'crochet' ? (
                        <ShoppingBag className="w-6 h-6" />
                      ) : (
                        <Sparkles className="w-6 h-6" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-[#2D221E] truncate font-['Plus_Jakarta_Sans']">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-[#6B5851] truncate">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Custom Specs Box */}
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#2D221E] space-y-1.5 border border-[#E5DBD0]/70 text-xs">
                    {card.details.scent && (
                      <div className="flex items-center justify-between text-[#6B5851]">
                        <span>Scent Profile</span>
                        <span className="font-semibold text-[#2D221E] font-['Space_Mono'] text-[11px]">
                          {card.details.scent}
                        </span>
                      </div>
                    )}
                    {card.details.vinylInscription && (
                      <div className="flex items-start justify-between text-[#6B5851]">
                        <span>Vinyl Inscription</span>
                        <span className="font-bold text-[#9d3e1d] font-['Space_Mono'] text-[11px] text-right truncate max-w-[150px]">
                          {card.details.vinylInscription}
                        </span>
                      </div>
                    )}
                    {card.details.yarnPalette && (
                      <div className="flex items-center justify-between text-[#6B5851]">
                        <span>Palette Yarn</span>
                        <div className="flex items-center gap-1.5">
                          {card.details.yarnPalette.map((y, idx) => (
                            <span
                              key={idx}
                              className="w-3 h-3 rounded-full border border-black/10"
                              style={{ backgroundColor: y.hex }}
                              title={y.name}
                            ></span>
                          ))}
                          <span className="text-[11px] text-[#2D221E] font-medium font-['Space_Mono']">
                            {card.details.yarnPalette.map((y) => y.name).join(' + ')}
                          </span>
                        </div>
                      </div>
                    )}
                    {card.details.monogram && (
                      <div className="flex items-center justify-between text-[#6B5851]">
                        <span>Monogram</span>
                        <span className="font-bold text-[#2D221E] font-['Space_Mono'] text-[11px]">
                          {card.details.monogram}
                        </span>
                      </div>
                    )}
                    {card.details.stockLot && (
                      <div className="flex items-center justify-between text-[#6B5851]">
                        <span>{card.details.stockLot}</span>
                        <span className="font-bold text-[#1E6B43] text-[11px]">
                          Fast-Track
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Customer & Due info */}
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-1.5 text-[#6B5851] text-xs">
                      <span className="w-4 h-4 rounded-full bg-[#F3EDE4] text-[#6B5851] text-[9px] font-bold flex items-center justify-center">
                        {card.customerName.charAt(0)}
                      </span>
                      <span>{card.customerName}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF5EA] text-[#A35C00]">
                      {card.dueText || 'Due: in 3 days'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#F3EDE4]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`WhatsApp sent to ${card.customerName}`);
                      }}
                      className="text-[#1E6B43] hover:text-[#9d3e1d] text-[11px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Ping</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateCardStage(card.id, 'in_crafting');
                        showToast(`Moved ${card.id} to IN CRAFTING stage!`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#F3EDE4] hover:bg-[#9d3e1d] hover:text-white text-xs font-semibold text-[#2D221E] transition-all flex items-center gap-1 active:scale-95"
                    >
                      <span>Start Batch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: IN CRAFTING */}
          <div className="flex flex-col bg-[#FAF7F2]/90 rounded-2xl p-3.5 space-y-3.5 border border-[#E5DBD0]">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9d3e1d]"></span>
                <h2 className="font-['Epilogue'] text-sm font-bold text-[#2D221E]">
                  In Crafting
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white text-[#6B5851] text-[11px] font-bold shadow-sm border border-[#E5DBD0]">
                  {columns.in_crafting.length}
                </span>
              </div>
              <span className="text-[11px] font-['Space_Mono'] text-[#9C8880]">
                STAGE 02
              </span>
            </div>

            <div className="space-y-3">
              {columns.in_crafting.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onInspectCard(card)}
                  className="group p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm hover:shadow-md transition-all flex flex-col space-y-3 cursor-pointer relative"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg text-xs font-bold font-['Space_Mono'] bg-[#fee9e5] text-[#9d3e1d]">
                        {card.id}
                      </span>
                      {card.tag && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FEF5EA] text-[#A35C00] text-[10px] font-bold border border-[#F8CCA0]/60">
                          {card.tag}
                        </span>
                      )}
                    </div>
                    {card.urgent ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#FDF2F2] text-[#9B2C2C] text-[10px] font-bold">
                        {card.dueText || 'Due Tomorrow'}
                      </span>
                    ) : (
                      <Clock className="w-4 h-4 text-[#A35C00]" />
                    )}
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-11 h-11 rounded-xl bg-[#fee9e5] flex-shrink-0 flex items-center justify-center text-[#9d3e1d]">
                      {card.type === 'candle' ? (
                        <Flame className="w-6 h-6" />
                      ) : (
                        <ShoppingBag className="w-6 h-6" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-[#2D221E] truncate font-['Plus_Jakarta_Sans']">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-[#6B5851] truncate">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Progress or Curing Bar */}
                  {card.details.stitchProgress && (
                    <div className="space-y-1.5 p-2 rounded-xl bg-[#FAF7F2]">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#6B5851]">Stitch Progress (12h block)</span>
                        <span className="font-bold text-[#9d3e1d] font-['Space_Mono']">
                          {card.details.stitchProgress.label}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E5DBD0]/60 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#9d3e1d] transition-all"
                          style={{
                            width: `${card.details.stitchProgress.percent}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {card.details.curing && (
                    <div className="p-2.5 rounded-xl bg-[#FEF5EA] text-[#A35C00] space-y-1.5 border border-[#F8CCA0]/50">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span>Poured: {card.details.curing.pouredAgo}</span>
                        <span className="font-['Space_Mono']">
                          {card.details.curing.remaining}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#F8CCA0]/50 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#bd5633]"
                          style={{ width: `${card.details.curing.percent}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] pt-0.5">
                        {card.details.curing.roomTemp}
                      </p>
                    </div>
                  )}

                  {card.details.giftNote && (
                    <div className="p-2 rounded-xl bg-[#FAF7F2] text-[11px] text-[#2D221E] border border-[#E5DBD0]/70">
                      <span className="text-[#6B5851] font-semibold">
                        Gift Note:
                      </span>{' '}
                      {card.details.giftNote}
                    </div>
                  )}

                  {/* Crafter assignment */}
                  <div className="flex items-center justify-between text-xs text-[#6B5851]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#fee9e5] text-[#9d3e1d] text-[10px] font-bold flex items-center justify-center">
                        {card.details.artisan ? card.details.artisan.charAt(0) : 'N'}
                      </span>
                      <span>Artisan: {card.details.artisan || 'Nita S.'}</span>
                    </div>
                    {card.details.locker && (
                      <span className="text-[10px] text-[#9C8880] font-['Space_Mono']">
                        {card.details.locker}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#F3EDE4]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`WIP Photo capture opened for ${card.id}`);
                      }}
                      className="text-[#1E6B43] hover:text-[#9d3e1d] text-[11px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>WIP Photo</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateCardStage(card.id, 'qc_packaging');
                        showToast(`Moved ${card.id} to QC & PACKAGING!`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#F3EDE4] hover:bg-[#9d3e1d] hover:text-white text-xs font-semibold text-[#2D221E] transition-all flex items-center gap-1 active:scale-95"
                    >
                      <span>Send to QC</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: QC & PACKAGING */}
          <div className="flex flex-col bg-[#FAF7F2]/90 rounded-2xl p-3.5 space-y-3.5 border border-[#E5DBD0]">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E6B43]"></span>
                <h2 className="font-['Epilogue'] text-sm font-bold text-[#2D221E]">
                  QC & Packaging
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white text-[#6B5851] text-[11px] font-bold shadow-sm border border-[#E5DBD0]">
                  {columns.qc_packaging.length}
                </span>
              </div>
              <span className="text-[11px] font-['Space_Mono'] text-[#9C8880]">
                STAGE 03
              </span>
            </div>

            <div className="space-y-3">
              {columns.qc_packaging.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onInspectCard(card)}
                  className="group p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm hover:shadow-md transition-all flex flex-col space-y-3 cursor-pointer relative"
                >
                  <div className="flex items-start justify-between">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-bold font-['Space_Mono'] bg-[#fee9e5] text-[#9d3e1d]">
                      {card.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF6F0] text-[#1E6B43] text-[11px] font-bold flex items-center gap-1 border border-[#A3D9BC]/60">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {card.tag || 'QC PASSED'}
                    </span>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-11 h-11 rounded-xl bg-[#fee9e5] flex-shrink-0 flex items-center justify-center text-[#9d3e1d]">
                      <PackageCheck className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-[#2D221E] truncate font-['Plus_Jakarta_Sans']">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-[#6B5851] truncate">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Checklist items */}
                  {card.details.qcChecks && card.details.qcChecks.length > 0 && (
                    <div className="space-y-1.5 p-2.5 rounded-xl bg-[#FAF7F2] text-xs text-[#6B5851] border border-[#E5DBD0]/70">
                      {card.details.qcChecks.map((chk, i) => (
                        <div key={i} className="flex items-center gap-2 text-[#2D221E]">
                          <Check className="w-3.5 h-3.5 text-[#1E6B43] flex-shrink-0" />
                          <span className="text-[11px] leading-tight">{chk}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Shiprocket Label button or Affix AWB */}
                  <div className="pt-1 flex flex-col gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateCardStage(card.id, 'manifested');
                        showToast(`Shiprocket label generated for ${card.id}!`);
                      }}
                      className="w-full py-2 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <PackageCheck className="w-4 h-4" />
                      <span>Generate Label (Shiprocket)</span>
                    </button>
                    <div className="flex items-center justify-between text-[#6B5851] text-[11px] px-1 font-['Space_Mono']">
                      <span>Weight: {card.details.weightGrams || 840}g</span>
                      <span>{card.details.boxSize || 'Box 03 (Medium Kraft)'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 4: MANIFESTED & DISPATCHED */}
          <div className="flex flex-col bg-[#FAF7F2]/90 rounded-2xl p-3.5 space-y-3.5 border border-[#E5DBD0]">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E5888]"></span>
                <h2 className="font-['Epilogue'] text-sm font-bold text-[#2D221E]">
                  Manifested
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white text-[#6B5851] text-[11px] font-bold shadow-sm border border-[#E5DBD0]">
                  {columns.manifested.length}
                </span>
              </div>
              <span className="text-[11px] font-['Space_Mono'] text-[#9C8880]">
                STAGE 04
              </span>
            </div>

            <div className="space-y-3">
              {columns.manifested.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onInspectCard(card)}
                  className="group p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm hover:shadow-md transition-all flex flex-col space-y-3 cursor-pointer relative"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg text-xs font-bold font-['Space_Mono'] bg-[#fee9e5] text-[#9d3e1d]">
                        {card.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#EEF5FA] text-[#1E5888] text-[10px] font-bold border border-[#B2D3EC]/60">
                        {card.details.courier || 'Delhivery Direct'}
                      </span>
                    </div>
                    <CheckCircle className="w-4 h-4 text-[#1E6B43]" />
                  </div>

                  {/* Waybill box */}
                  <div className="p-3 rounded-xl bg-[#FAF7F2] space-y-1.5 border border-[#E5DBD0]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851]">
                        Air Waybill
                      </span>
                      <span className="text-xs font-bold font-['Space_Mono'] text-[#2D221E]">
                        {card.details.awb || '#DL-883920194'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1E5888] text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#1E5888]"></span>
                      <span>
                        {card.details.courierStatus ||
                          'Picked up by Jaipur Courier Hub'}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp confirmation badge */}
                  <div className="p-2 rounded-xl bg-[#EBF6F0] flex items-center justify-between text-[#1E6B43] text-xs font-medium border border-[#A3D9BC]/50">
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Tracking Sent</span>
                    </div>
                    <span className="font-['Space_Mono'] text-xs font-bold">
                      {card.details.whatsappAlertSent || '14:22'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[#6B5851]">
                      {card.details.destination || 'Dest: Mumbai South'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`Opening live 3PL tracker for ${card.details.awb}`);
                      }}
                      className="text-[#9d3e1d] hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Track 3PL</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
