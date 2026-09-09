import React, { useState } from 'react';
import {
  X,
  Coins,
  Printer,
  CheckCircle2,
  Award,
  Clock,
  Flame,
  ShoppingBag,
  Download,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { ArtisanWageRecord } from '../types';

interface ArtisanWageLedgerModalProps {
  onClose: () => void;
  onTriggerToast: (msg: string) => void;
}

const ARTISAN_PAYROLL: ArtisanWageRecord[] = [
  {
    artisanId: 'ART-01',
    name: 'Nita Sharma',
    role: 'Master Artisan & Atelier Lead',
    completedUnits: 46,
    qcPassRate: 99.2,
    breakdown: [
      { item: 'Master Botanical Soy Candle Formulations', qty: 32, rate: 120, subtotal: 3840 },
      { item: 'Bespoke Custom Laser Vector Cuts & Inscriptions', qty: 14, rate: 85, subtotal: 1190 },
      { item: 'Lead Floor Coordination & Curing Vault Audit', qty: 1, rate: 4500, subtotal: 4500 },
    ],
    bonusAmount: 950,
    grossPayout: 10480,
    status: 'disbursed',
  },
  {
    artisanId: 'ART-02',
    name: 'Dashrath M.',
    role: 'Senior Crochet Craftsman',
    completedUnits: 28,
    qcPassRate: 98.5,
    breakdown: [
      { item: 'Cozy Waffle Crochet Throws (Row Quota 65/65)', qty: 8, rate: 750, subtotal: 6000 },
      { item: 'Custom Daisy Motif Tote Bags (Sage/Buttercup)', qty: 16, rate: 450, subtotal: 7200 },
      { item: 'Monogram Hand-Embroidery Stitching', qty: 4, rate: 150, subtotal: 600 },
    ],
    bonusAmount: 1380,
    grossPayout: 15180,
    status: 'disbursed',
  },
  {
    artisanId: 'ART-03',
    name: 'Kavita S.',
    role: 'Candle Pour & QC Finishing Specialist',
    completedUnits: 64,
    qcPassRate: 97.8,
    breakdown: [
      { item: 'Triple-Wick Bubble & Jar Hand-Pours (220g)', qty: 42, rate: 85, subtotal: 3570 },
      { item: 'Botanical Wax Melt Box Sets (12-Piece)', qty: 22, rate: 65, subtotal: 1430 },
      { item: 'Surface Finishing & Heat-Gun Smoothing', qty: 64, rate: 25, subtotal: 1600 },
    ],
    bonusAmount: 660,
    grossPayout: 7260,
    status: 'pending',
  },
  {
    artisanId: 'ART-04',
    name: 'Leela D.',
    role: 'Luxe Packaging & Wax Seal Artisan',
    completedUnits: 78,
    qcPassRate: 100,
    breakdown: [
      { item: 'Custom Wax Seal Debossing & Ribbon Binding', qty: 52, rate: 45, subtotal: 2340 },
      { item: 'Calligraphy Handwritten Gift Note Inscriptions', qty: 26, rate: 40, subtotal: 1040 },
      { item: '5-Layer Corrugated Fragile Packaging Assembly', qty: 78, rate: 35, subtotal: 2730 },
    ],
    bonusAmount: 850,
    grossPayout: 6960,
    status: 'pending',
  },
];

export const ArtisanWageLedgerModal: React.FC<ArtisanWageLedgerModalProps> = ({
  onClose,
  onTriggerToast,
}) => {
  const [payrollData, setPayrollData] = useState<ArtisanWageRecord[]>(ARTISAN_PAYROLL);
  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanWageRecord>(ARTISAN_PAYROLL[1]);

  const totalWeeklyDisbursed = payrollData.reduce((acc, a) => acc + a.grossPayout, 0);
  const totalUnitsCrafted = payrollData.reduce((acc, a) => acc + a.completedUnits, 0);

  const handleDisburse = (artisanId: string) => {
    setPayrollData((prev) =>
      prev.map((a) => (a.artisanId === artisanId ? { ...a, status: 'disbursed' } : a))
    );
    setSelectedArtisan((prev) =>
      prev.artisanId === artisanId ? { ...prev, status: 'disbursed' } : prev
    );
    onTriggerToast(`Payout of ₹${selectedArtisan.grossPayout.toLocaleString('en-IN')} disbursed to ${selectedArtisan.name} via UPI!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-5 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F3EDE4] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center shadow-sm">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Epilogue'] text-lg font-bold text-[#2D221E]">
                  Artisan Piece-Rate Wage & Payroll Ledger
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF6F0] text-[#1E6B43] border border-[#A3D9BC]/60">
                  Week 36 • Sep 2026
                </span>
              </div>
              <p className="text-xs text-[#6B5851]">
                Jaipur Craft House Unit 02 • Fair-trade piece-rate compensation & zero-defect QC bonus
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

        {/* Top Financial Ribbon */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
              Total Weekly Payout
            </span>
            <span className="font-['Epilogue'] text-xl font-bold text-[#2D221E] mt-0.5 block">
              ₹{totalWeeklyDisbursed.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-[#1E6B43] font-bold">100% On-Time Ledger</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
              Artisan Units Handcrafted
            </span>
            <span className="font-['Epilogue'] text-xl font-bold text-[#9d3e1d] mt-0.5 block">
              {totalUnitsCrafted} Pieces
            </span>
            <span className="text-[10px] text-[#6B5851]">Across 4 Crafters</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
              Studio Average QC Score
            </span>
            <span className="font-['Epilogue'] text-xl font-bold text-[#1E6B43] mt-0.5 block">
              98.9%
            </span>
            <span className="text-[10px] text-[#1E6B43] font-bold">+10% Zero-Defect Bonus</span>
          </div>
        </div>

        {/* Artisan Tabs Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851] block">
            Select Craftsman for Itemized Breakdown:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {payrollData.map((a) => (
              <button
                key={a.artisanId}
                type="button"
                onClick={() => setSelectedArtisan(a)}
                className={`p-2.5 rounded-2xl text-left border transition-all ${
                  selectedArtisan.artisanId === a.artisanId
                    ? 'bg-[#fee9e5] border-[#9d3e1d] shadow-sm'
                    : 'bg-[#FAF7F2] border-[#E5DBD0] hover:bg-[#F3EDE4]'
                }`}
              >
                <div className="font-bold text-xs text-[#2D221E] truncate">{a.name}</div>
                <div className="text-[10px] text-[#6B5851] truncate">{a.completedUnits} units</div>
                <div className="text-xs font-bold text-[#9d3e1d] mt-1 font-['Space_Mono']">
                  ₹{a.grossPayout.toLocaleString('en-IN')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Artisan Itemized Slip */}
        <div className="p-4 rounded-3xl bg-white border border-[#E5DBD0] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F3EDE4] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E]">
                  {selectedArtisan.name}
                </h3>
                <span className="font-['Space_Mono'] text-[11px] text-[#9d3e1d] bg-[#fee9e5] px-2 py-0.2 rounded">
                  {selectedArtisan.artisanId}
                </span>
              </div>
              <p className="text-xs text-[#6B5851]">{selectedArtisan.role}</p>
            </div>

            <div className="text-right">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                selectedArtisan.status === 'disbursed'
                  ? 'bg-[#EBF6F0] text-[#1E6B43]'
                  : 'bg-[#FEF5EA] text-[#A35C00]'
              }`}>
                {selectedArtisan.status === 'disbursed' ? '✔ Disbursed via UPI' : '⏳ Ready for Payout'}
              </span>
              <div className="font-['Epilogue'] text-lg font-bold text-[#1E6B43] mt-0.5">
                ₹{selectedArtisan.grossPayout.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Piece-rate itemized table */}
          <div className="space-y-1.5 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
              Itemized Piece-Rate Compensation:
            </span>
            <div className="divide-y divide-[#F3EDE4] border border-[#E5DBD0] rounded-xl overflow-hidden">
              {selectedArtisan.breakdown.map((row, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between bg-white text-xs">
                  <div>
                    <span className="font-semibold text-[#2D221E]">{row.item}</span>
                    <span className="text-[11px] text-[#6B5851] block font-['Space_Mono']">
                      {row.qty} units @ ₹{row.rate}/unit
                    </span>
                  </div>
                  <span className="font-bold text-[#2D221E] font-['Space_Mono']">
                    ₹{row.subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="p-2.5 flex items-center justify-between bg-[#FEF5EA] text-[#A35C00] font-bold text-xs">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Zero-Defect Quality Bonus ({selectedArtisan.qcPassRate}% pass rate)
                </span>
                <span className="font-['Space_Mono']">+₹{selectedArtisan.bonusAmount}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] text-xs font-bold border border-[#E5DBD0] flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Payroll Voucher</span>
            </button>

            {selectedArtisan.status !== 'disbursed' ? (
              <button
                onClick={() => handleDisburse(selectedArtisan.artisanId)}
                className="px-4 py-2 rounded-xl bg-[#1E6B43] hover:bg-[#165032] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Disburse ₹{selectedArtisan.grossPayout.toLocaleString('en-IN')} via UPI Instant</span>
              </button>
            ) : (
              <span className="text-xs text-[#1E6B43] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Disbursed to Bank A/C ending in 4092
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
