import React, { useState } from 'react';
import {
  X,
  Printer,
  FileText,
  Send,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShoppingBag,
  Clock,
  Sparkles,
  QrCode,
  Download,
  BookOpen,
  Check,
} from 'lucide-react';
import { CraftCard, RawMaterial, CatalogProduct, LogisticsOrder, CraftStage } from '../types';

interface InspectCardModalProps {
  card: CraftCard | null;
  onClose: () => void;
  onUpdateStage: (cardId: string, newStage: CraftStage) => void;
}

export const InspectCardModal: React.FC<InspectCardModalProps> = ({
  card,
  onClose,
  onUpdateStage,
}) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-[#F3EDE4] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Space_Mono'] font-bold text-sm text-[#9d3e1d] bg-[#fee9e5] px-2 py-0.5 rounded">
                {card.id}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B5851]">
                Stage: {card.stage.replace('_', ' ')}
              </span>
            </div>
            <h2 className="font-['Epilogue'] text-xl font-bold text-[#2D221E] mt-1">
              {card.title}
            </h2>
            <p className="text-xs text-[#6B5851]">{card.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3EDE4] text-[#9C8880] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Specifications */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-2 text-xs">
          <h3 className="font-bold text-[#2D221E] uppercase tracking-wider text-[11px]">
            Commission Recipe & Specifications
          </h3>
          {card.details.scent && (
            <div className="flex justify-between">
              <span className="text-[#6B5851]">Botanical Scent Ratio:</span>
              <span className="font-bold text-[#2D221E]">{card.details.scent} (8% Fragrance Load)</span>
            </div>
          )}
          {card.details.vinylInscription && (
            <div className="flex justify-between">
              <span className="text-[#6B5851]">Gold Vinyl Inscription:</span>
              <span className="font-bold text-[#9d3e1d] font-['Space_Mono']">
                {card.details.vinylInscription}
              </span>
            </div>
          )}
          {card.details.yarnPalette && (
            <div className="flex justify-between items-center">
              <span className="text-[#6B5851]">Yarn Dye Lot:</span>
              <span className="font-bold text-[#2D221E]">
                {card.details.yarnPalette.map((y) => y.name).join(' & ')} (Combed 4-Ply)
              </span>
            </div>
          )}
          {card.details.artisan && (
            <div className="flex justify-between">
              <span className="text-[#6B5851]">Assigned Artisan:</span>
              <span className="font-bold text-[#2D221E]">{card.details.artisan}</span>
            </div>
          )}
          {card.details.giftNote && (
            <div className="pt-2 border-t border-[#E5DBD0]">
              <span className="text-[#6B5851] block mb-0.5">Gift Card Note:</span>
              <p className="italic text-[#2D221E] bg-white p-2 rounded-lg border border-[#E5DBD0]">
                “{card.details.giftNote}”
              </p>
            </div>
          )}
        </div>

        {/* Customer info */}
        <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-white border border-[#E5DBD0]">
          <div>
            <span className="text-[10px] text-[#9C8880] uppercase font-bold block">
              Customer
            </span>
            <span className="font-bold text-[#2D221E]">{card.customerName}</span>
            <p className="text-[11px] text-[#6B5851]">{card.customerPhone || '+91 98765 00000'}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#9C8880] uppercase font-bold block">
              Payment Status
            </span>
            <span className="font-bold text-[#1E6B43]">
              ₹{card.price} • {card.paymentStatus || 'Captured'}
            </span>
            <p className="text-[11px] text-[#6B5851]">{card.paymentMethod || 'UPI Intent'}</p>
          </div>
        </div>

        {/* Advance stage actions */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold text-[#6B5851] uppercase tracking-wider block">
            Move to Production Stage:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {(['new_placed', 'in_crafting', 'qc_packaging', 'manifested'] as CraftStage[]).map(
              (st) => (
                <button
                  key={st}
                  onClick={() => {
                    onUpdateStage(card.id, st);
                    onClose();
                  }}
                  className={`py-2 px-2.5 rounded-xl font-bold transition-all ${
                    card.stage === st
                      ? 'bg-[#9d3e1d] text-white'
                      : 'bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] border border-[#E5DBD0]'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DailyBatchSheetModal: React.FC<{
  onClose: () => void;
  cards: CraftCard[];
}> = ({ onClose, cards }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#F3EDE4] pb-3">
          <div>
            <span className="text-[11px] font-bold text-[#9d3e1d] uppercase font-['Space_Mono']">
              Jaipur Craft House Unit 02
            </span>
            <h2 className="font-['Epilogue'] text-xl font-bold text-[#2D221E]">
              Daily Artisan Production Batch Sheet
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3EDE4] text-[#9C8880]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] text-xs flex justify-between">
          <div>
            <span className="text-[#6B5851]">Batch Date:</span>{' '}
            <strong className="text-[#2D221E]">24 October 2026</strong>
          </div>
          <div>
            <span className="text-[#6B5851]">Active Queue:</span>{' '}
            <strong className="text-[#9d3e1d]">{cards.length} Commissions</strong>
          </div>
          <div>
            <span className="text-[#6B5851]">Lead Artisan:</span>{' '}
            <strong className="text-[#2D221E]">Nita Sharma</strong>
          </div>
        </div>

        <div className="space-y-2">
          {cards.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-xl bg-white border border-[#E5DBD0] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-['Space_Mono'] font-bold text-[#9d3e1d] bg-[#fee9e5] px-1.5 py-0.5 rounded">
                  {c.id}
                </span>
                <div>
                  <h4 className="font-bold text-[#2D221E]">{c.title}</h4>
                  <span className="text-[11px] text-[#6B5851]">
                    {c.details.scent || c.subtitle}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-[#1E6B43] uppercase text-[10px] block">
                  {c.stage.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-[#9C8880]">
                  {c.details.artisan || 'Nita S.'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#F3EDE4]">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Batch Sheet (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const PurchaseOrderModal: React.FC<{
  rawMaterial?: RawMaterial;
  onClose: () => void;
  onSubmitPO: (materialName: string, qty: string) => void;
}> = ({ rawMaterial, onClose, onSubmitPO }) => {
  const [qty, setQty] = useState(rawMaterial?.standardOrderQty || '50 kg');
  const [vendor, setVendor] = useState(rawMaterial?.supplier || 'Firozabad Glass Co.');

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-4">
        <div className="flex items-center justify-between border-b border-[#F3EDE4] pb-3">
          <div>
            <span className="text-[11px] font-bold text-[#9d3e1d] uppercase font-['Space_Mono']">
              Workshop Reorder Pipeline
            </span>
            <h2 className="font-['Epilogue'] text-lg font-bold text-[#2D221E]">
              Transmit Purchase Order
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#F3EDE4]">
            <X className="w-5 h-5 text-[#9C8880]" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-[#2D221E] mb-1">Raw Material</label>
            <input
              type="text"
              readOnly
              value={rawMaterial?.name || 'Pure Golden Soy Wax Flakes'}
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] font-semibold text-[#2D221E]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D221E] mb-1">Approved Supplier</label>
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] font-semibold text-[#2D221E]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D221E] mb-1">Order Quantity</label>
            <input
              type="text"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white border border-[#E5DBD0] font-bold text-[#2D221E]"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#EBF6F0] text-[#1E6B43] flex items-center gap-2">
            <Send className="w-4 h-4 flex-shrink-0" />
            <span>Transmits automated GST purchase manifest via WhatsApp Business API.</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#F3EDE4]">
          <button
            onClick={() => {
              onSubmitPO(rawMaterial?.name || 'Raw Material', qty);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-bold shadow-sm"
          >
            Confirm & Send WhatsApp PO
          </button>
        </div>
      </div>
    </div>
  );
};

export const ShippingLabelModal: React.FC<{
  order: LogisticsOrder | null;
  onClose: () => void;
}> = ({ order, onClose }) => {
  const [viewMode, setViewMode] = useState<'label' | 'zpl'>('label');
  const [copiedZpl, setCopiedZpl] = useState(false);

  if (!order) return null;

  const rawZplCode = `^XA
^PW812
^LL1218
^FO50,50^A0N,40,40^FD${order.courier || 'DELHIVERY EXPRESS'}^FS
^FO550,50^A0N,25,25^FDPREPAID PRIORITY^FS
^FO50,105^GB712,3,3^FS
^FO50,140^BY3,3,110^BCN,110,Y,N,N^FD${order.awb || 'DEL-99482710'}^FS
^FO50,290^GB712,2,2^FS
^FO50,320^A0N,32,32^FDSHIP TO: ${order.customerName}^FS
^FO50,365^A0N,24,24^FD${order.address}^FS
^FO50,400^A0N,24,24^FD${order.city}, ${order.state} - ${order.pinCode}^FS
^FO50,440^A0N,24,24^FDPHONE: ${order.phone}^FS
^FO50,485^GB712,2,2^FS
^FO50,515^A0N,28,28^FDORDER: #${order.orderId}  |  WEIGHT: 680g^FS
^FO50,555^A0N,22,22^FDJAIPUR CRAFT HOUSE UNIT 02  |  FRAGILE GLASS^FS
^XZ`;

  const handleCopyZpl = () => {
    navigator.clipboard.writeText(rawZplCode);
    setCopiedZpl(true);
    setTimeout(() => setCopiedZpl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#F3EDE4] pb-3">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#1E5888]" />
            <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E]">
              Thermal Courier Shipping Label (4x6)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#F3EDE4]">
            <X className="w-5 h-5 text-[#9C8880]" />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex rounded-xl bg-[#FAF7F2] p-1 border border-[#E5DBD0] text-xs">
          <button
            onClick={() => setViewMode('label')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'label'
                ? 'bg-white shadow-xs text-[#2D221E]'
                : 'text-[#6B5851] hover:text-[#2D221E]'
            }`}
          >
            Visual Thermal Label
          </button>
          <button
            onClick={() => setViewMode('zpl')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'zpl'
                ? 'bg-white shadow-xs text-[#2D221E]'
                : 'text-[#6B5851] hover:text-[#2D221E]'
            }`}
          >
            Raw ZPL (Zebra / TSC)
          </button>
        </div>

        {viewMode === 'label' ? (
          /* Printable visual thermal label preview */
          <div className="p-4 rounded-2xl bg-white border-2 border-black space-y-3 font-['Space_Mono'] text-xs text-black">
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
              <span className="font-bold text-sm uppercase">{order.courier || 'DELHIVERY DIRECT'}</span>
              <span className="text-[10px] font-bold bg-black text-white px-1.5 py-0.5 rounded-xs">PREPAID / 4x6</span>
            </div>

            <div className="text-center py-2 border-b border-black">
              <div className="font-bold text-lg tracking-widest">{order.awb || '#DL-99482710'}</div>
              {/* Barcode visual lines */}
              <div className="h-10 w-full flex items-center justify-center gap-1 my-1">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-black"
                    style={{ width: i % 3 === 0 ? '3px' : '1px' }}
                  ></div>
                ))}
              </div>
              <span className="text-[10px]">ROUTING: JAI/BLR-HUB-04 • FRAGILE ARTISANAL</span>
            </div>

            <div className="space-y-1 text-[11px] leading-tight">
              <p><strong>SHIP TO:</strong> {order.customerName}</p>
              <p>{order.address}</p>
              <p>{order.city}, {order.state} - {order.pinCode}</p>
              <p>Phone: {order.phone}</p>
            </div>

            <div className="border-t border-black pt-1 text-[10px] flex justify-between">
              <span>ORDER: #{order.orderId}</span>
              <span>WT: 680g (Glass Protected)</span>
            </div>
          </div>
        ) : (
          /* Raw ZPL Code Viewer */
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-[#2D221E] text-[#A3D9BC] font-['Space_Mono'] text-[11px] leading-tight overflow-x-auto max-h-56">
              <pre>{rawZplCode}</pre>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[11px] text-[#6B5851]">Zebra 203/300 DPI Native</span>
              <button
                onClick={handleCopyZpl}
                className="px-3 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] font-bold border border-[#E5DBD0]"
              >
                {copiedZpl ? '✔ Copied to Clipboard!' : 'Copy ZPL Code'}
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 rounded-xl bg-[#2D221E] hover:bg-[#1f1714] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print 4x6 Thermal Label</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const DocsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#F3EDE4] pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#9d3e1d]" />
            <h3 className="font-['Epilogue'] text-lg font-bold text-[#2D221E]">
              DashNit Crafter Guides & SOPs
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#F3EDE4]">
            <X className="w-5 h-5 text-[#9C8880]" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-[#2D221E] leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1.5">
            <h4 className="font-bold text-sm text-[#9d3e1d] flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>The 48-Hour Soy Wax Curing Rule</span>
            </h4>
            <p className="text-[#6B5851]">
              All hand-poured soy candles must remain in the climate-controlled curing locker (21°C ± 2°C) for a minimum of 48 hours before QC inspection and packaging. Never dispatch early—botanical fragrance binding requires 48 hours for maximum hot throw.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1.5">
            <h4 className="font-bold text-sm text-[#9d3e1d] flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Crochet Tension Gauge & Dye Lot Uniformity</span>
            </h4>
            <p className="text-[#6B5851]">
              Every custom throw and tote bag must use combed cotton yarn originating from the identical Coimbatore dye lot number. Always verify gauge (18 stitches x 22 rows = 10cm) before beginning customer monogramming.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1.5">
            <h4 className="font-bold text-sm text-[#9d3e1d] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Eco-Luxe Wax Seal & Unboxing Standard</span>
            </h4>
            <p className="text-[#6B5851]">
              Every parcel includes a handwritten card sealed with authentic botanical sealing wax (Rose design) and recycled kraft crinkle padding. This delivers our North Star MCGM (Meaningful Crafted Gifting Moments).
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#9d3e1d] text-white text-xs font-bold"
        >
          Close Crafter Guide
        </button>
      </div>
    </div>
  );
};
