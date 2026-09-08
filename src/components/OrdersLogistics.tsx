import React, { useState, useMemo } from 'react';
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  Search,
  Download,
  Printer,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  FileText,
  AlertCircle,
  ArrowRight,
  Sparkles,
  QrCode,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { LogisticsOrder } from '../types';

interface OrdersLogisticsProps {
  orders: LogisticsOrder[];
  onOpenLabelModal: (order: LogisticsOrder) => void;
  onOpenGiftNoteModal: (order: LogisticsOrder) => void;
  onOpenBatchManifestModal: () => void;
}

export const OrdersLogistics: React.FC<OrdersLogisticsProps> = ({
  orders,
  onOpenLabelModal,
  onOpenGiftNoteModal,
  onOpenBatchManifestModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          order.orderId.toLowerCase().includes(q) ||
          order.customerName.toLowerCase().includes(q) ||
          order.city.toLowerCase().includes(q) ||
          order.items.some((i) => i.name.toLowerCase().includes(q));
        if (!matches) return false;
      }

      if (statusFilter === 'in_crafting' && order.status !== 'in_crafting')
        return false;
      if (statusFilter === 'ready' && order.status !== 'ready_for_packing')
        return false;
      if (statusFilter === 'manifested' && order.status !== 'manifested')
        return false;

      return true;
    });
  }, [orders, searchQuery, statusFilter]);

  return (
    <div className="flex flex-col w-full space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D221E] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 border border-[#9d3e1d]/40">
          <CheckCircle className="w-4 h-4 text-[#A3D9BC]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Protocol Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-md bg-[#EEF5FA] text-[#1E5888] font-bold text-[11px] font-['Space_Mono'] uppercase">
            FR-ORD • FR-PAY • FR-NOTIF §11.2
          </span>
          <span className="text-xs text-[#6B5851] font-medium hidden sm:inline">
            Live 3PL Gateway Active • Delhivery & BlueDart Automated Handover
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1E6B43] animate-pulse"></span>
          <span className="text-xs font-bold text-[#1E6B43] font-['Plus_Jakarta_Sans']">
            All Couriers Operational
          </span>
        </div>
      </div>

      {/* Header & Main Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="font-['Epilogue'] text-2xl lg:text-3xl font-bold text-[#2D221E] tracking-tight">
            Orders & Logistics Hub
          </h1>
          <p className="text-xs lg:text-sm text-[#6B5851] mt-1 font-['Plus_Jakarta_Sans']">
            Pan-India 3PL Courier Manifests, Razorpay Verification & Customer Hyper-Care
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => showToast('9 Ready orders queued for 5:30 PM Courier pickup')}
            className="px-3 py-2 rounded-xl bg-[#F3EDE4] hover:bg-[#EDE5D8] text-[#2D221E] text-xs font-semibold flex items-center gap-2 transition-all border border-[#E5DBD0] shadow-sm active:scale-95"
          >
            <Package className="w-4 h-4 text-[#6B5851]" />
            <span>Manifest Queue (9 ready)</span>
          </button>
          <button
            onClick={onOpenBatchManifestModal}
            className="px-4 py-2 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Batch Manifest</span>
          </button>
        </div>
      </div>

      {/* 5 Metrics Ribbon matching Image 8 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
            Total Orders Today
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
              28
            </span>
            <span className="text-[11px] text-[#1E6B43] font-bold">+14% vs avg</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
            Prepaid Captured
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
              ₹41,860
            </span>
            <span className="text-[11px] text-[#1E6B43] font-bold">100% Rec</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
            Ready to Ship
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-['Epilogue'] text-2xl font-bold text-[#1E6B43]">
              9
            </span>
            <span className="text-[11px] text-[#6B5851]">Pickups @ 5:30</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
            In Transit
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-['Epilogue'] text-2xl font-bold text-[#1E5888]">
              17
            </span>
            <span className="text-[11px] text-[#6B5851]">Shiprocket</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
            RTO Rate
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-['Epilogue'] text-2xl font-bold text-[#1E6B43]">
              1.1%
            </span>
            <span className="text-[11px] text-[#1E6B43] font-bold">Safe</span>
          </div>
        </div>
      </div>

      {/* Filter and Date Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
        <div className="relative flex items-center w-72">
          <Search className="absolute left-3 text-[#9C8880] w-4 h-4" />
          <input
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-transparent focus:border-[#D3C2B1] text-xs text-[#2D221E] placeholder:text-[#9C8880] focus:outline-none focus:bg-white"
            placeholder="Search Order #, customer, city..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-[#2D221E] text-white'
                : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#6B5851]'
            }`}
          >
            All ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter('in_crafting')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'in_crafting'
                ? 'bg-[#A35C00] text-white'
                : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#6B5851]'
            }`}
          >
            In Crafting (1)
          </button>
          <button
            onClick={() => setStatusFilter('ready')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'ready'
                ? 'bg-[#1E6B43] text-white'
                : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#6B5851]'
            }`}
          >
            Ready to Ship (1)
          </button>
          <button
            onClick={() => setStatusFilter('manifested')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'manifested'
                ? 'bg-[#1E5888] text-white'
                : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#6B5851]'
            }`}
          >
            Manifested (1)
          </button>

          <div className="h-5 w-px bg-[#E5DBD0] hidden sm:block"></div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] text-xs font-semibold text-[#2D221E]">
            <Calendar className="w-3.5 h-3.5 text-[#6B5851]" />
            <span>Today: 24 Oct, 2026</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Order Cards */}
        <div className="lg:col-span-2 space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="p-5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Order Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#F3EDE4] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Space_Mono'] font-bold text-sm text-[#9d3e1d] bg-[#fee9e5] px-2 py-0.5 rounded-lg">
                      Order #{order.orderId}
                    </span>
                    {order.status === 'in_crafting' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FEF5EA] text-[#A35C00] font-bold text-xs border border-[#F8CCA0]">
                        {order.statusBadge}
                      </span>
                    )}
                    {order.status === 'manifested' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EEF5FA] text-[#1E5888] font-bold text-xs border border-[#B2D3EC]">
                        {order.statusBadge}
                      </span>
                    )}
                    {order.status === 'ready_for_packing' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EBF6F0] text-[#1E6B43] font-bold text-xs border border-[#A3D9BC]">
                        {order.statusBadge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#9C8880] mt-1 block">
                    {order.date}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-['Epilogue'] text-lg font-bold text-[#2D221E] block">
                    ₹{order.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-[#1E6B43] font-semibold flex items-center justify-end gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {order.paymentMethod} • {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-2.5">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0]/70 flex items-start gap-3"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#E5DBD0] flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#2D221E] font-['Plus_Jakarta_Sans']">
                        {item.name}
                      </h4>
                      {item.customDetails && (
                        <p className="text-[11px] text-[#6B5851] mt-0.5 leading-relaxed">
                          {item.customDetails}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-white border border-[#E5DBD0]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block mb-0.5">
                    Customer & Destination
                  </span>
                  <p className="font-bold text-[#2D221E]">{order.customerName}</p>
                  <p className="text-[11px] text-[#6B5851]">{order.phone}</p>
                  <p className="text-[11px] text-[#6B5851] mt-0.5">
                    {order.address}, {order.city}, {order.state} - {order.pinCode}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block mb-0.5">
                    Logistics & Curing Status
                  </span>
                  {order.curingCompleteTime && (
                    <p className="text-[11px] font-semibold text-[#A35C00] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {order.curingCompleteTime}
                    </p>
                  )}
                  {order.awb && (
                    <p className="text-[11px] font-semibold text-[#1E5888] font-['Space_Mono']">
                      AWB: {order.awb} ({order.courier})
                    </p>
                  )}
                  {order.driverName && (
                    <p className="text-[11px] text-[#6B5851]">
                      Pickup Driver: {order.driverName}
                    </p>
                  )}
                  {order.giftNote && (
                    <p className="text-[11px] text-[#9d3e1d] italic mt-0.5 font-medium">
                      “{order.giftNote}”
                    </p>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      showToast(`Automated WhatsApp update sent to ${order.customerName}`)
                    }
                    className="px-3 py-1.5 rounded-xl bg-[#EBF6F0] hover:bg-[#A3D9BC]/50 text-[#1E6B43] text-xs font-bold flex items-center gap-1.5 transition-all border border-[#A3D9BC]/60"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Update</span>
                  </button>

                  {order.giftNote && (
                    <button
                      onClick={() => onOpenGiftNoteModal(order)}
                      className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#E5DBD0]"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#9d3e1d]" />
                      <span>Print Gift Note (Calligraphy)</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {order.status === 'ready_for_packing' && (
                    <button
                      onClick={() => onOpenLabelModal(order)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>1-Click AWB Generation</span>
                    </button>
                  )}

                  {order.status === 'manifested' && (
                    <>
                      <button
                        onClick={() => onOpenLabelModal(order)}
                        className="px-3 py-1.5 rounded-xl bg-[#F3EDE4] hover:bg-[#EDE5D8] text-[#2D221E] text-xs font-bold flex items-center gap-1.5 transition-all border border-[#E5DBD0]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Label PDF</span>
                      </button>
                      <button
                        onClick={() =>
                          showToast(`Live 3PL courier tracking opened for ${order.awb}`)
                        }
                        className="px-3 py-1.5 rounded-xl bg-[#1E5888] hover:bg-[#1E5888]/90 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <span>Track Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right 1 col: Manifest Summary & Hyper-Care */}
        <div className="space-y-4">
          {/* 3PL Manifest Summary Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-['Epilogue'] text-sm font-bold text-[#2D221E]">
                3PL Manifest Summary (Jaipur Hub)
              </h3>
              <span className="text-[10px] font-bold text-[#1E6B43] bg-[#EBF6F0] px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[#FAF7F2] flex items-center justify-between border border-[#E5DBD0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center font-bold text-xs">
                    DH
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2D221E]">Delhivery Express</h4>
                    <span className="text-[10px] text-[#6B5851]">Pickup slot: 5:30 PM</span>
                  </div>
                </div>
                <span className="font-['Epilogue'] font-bold text-sm text-[#2D221E]">
                  6 Parcels
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] flex items-center justify-between border border-[#E5DBD0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF5FA] text-[#1E5888] flex items-center justify-center font-bold text-xs">
                    BD
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2D221E]">BlueDart Air</h4>
                    <span className="text-[10px] text-[#6B5851]">Pickup slot: 6:00 PM</span>
                  </div>
                </div>
                <span className="font-['Epilogue'] font-bold text-sm text-[#2D221E]">
                  3 Parcels
                </span>
              </div>
            </div>

            <button
              onClick={onOpenBatchManifestModal}
              className="w-full py-2.5 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Batch Manifest & Handover Sheet</span>
            </button>
          </div>

          {/* PIN Code SLA Health */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm space-y-3">
            <h3 className="font-['Epilogue'] text-sm font-bold text-[#2D221E]">
              PIN Code SLA Health
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#6B5851]">Metro Hubs (48h SLA)</span>
                <span className="font-bold text-[#1E6B43]">96.4% On-Time</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E5DBD0]/50 overflow-hidden">
                <div className="h-full bg-[#1E6B43] rounded-full" style={{ width: '96.4%' }}></div>
              </div>

              <div className="flex justify-between items-center pt-1 text-[11px] text-[#9C8880]">
                <span>2.5% Weather Hold</span>
                <span>1.1% RTO Reship</span>
              </div>
            </div>
          </div>

          {/* Hyper-Care Broadcast */}
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#1E6B43] text-xs font-bold">
                <MessageCircle className="w-4 h-4" />
                <span>Hyper-Care Broadcast</span>
              </div>
              <span className="text-[10px] text-[#9C8880] font-['Space_Mono']">
                Sync Live
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-[#E5DBD0] space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-[#2D221E]">WhatsApp Dispatched</span>
                  <span className="text-[10px] text-[#9C8880]">12m ago</span>
                </div>
                <p className="text-[11px] text-[#6B5851]">
                  Auto-sent unboxing & burn care guide to +91 98112 34567.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E5DBD0] space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-[#2D221E]">Personalization Approval</span>
                  <span className="text-[10px] text-[#9C8880]">45m ago</span>
                </div>
                <p className="text-[11px] text-[#6B5851]">
                  Dr. Shalini confirmed calligraphic font layout for coaster gift note.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
