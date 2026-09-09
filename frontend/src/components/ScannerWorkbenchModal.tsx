import React, { useState } from 'react';
import {
  X,
  QrCode,
  Barcode,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Package,
  Layers,
  Flame,
  ShoppingBag,
  Volume2,
  AlertCircle,
} from 'lucide-react';
import { CraftCard, CraftStage } from '../types';

interface ScannerWorkbenchModalProps {
  cards: CraftCard[];
  onClose: () => void;
  onUpdateStage: (cardId: string, newStage: CraftStage) => void;
  onInspectCard: (card: CraftCard) => void;
  onTriggerToast: (msg: string) => void;
}

export const ScannerWorkbenchModal: React.FC<ScannerWorkbenchModalProps> = ({
  cards,
  onClose,
  onUpdateStage,
  onInspectCard,
  onTriggerToast,
}) => {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [matchedCard, setMatchedCard] = useState<CraftCard | null>(cards[0] || null);
  const [assignedBin, setAssignedBin] = useState<string>('BIN-JA-02');
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  const handleProcessBarcode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    // Check if it's an action barcode
    if (cleanCode.startsWith('ACTION:')) {
      if (!matchedCard) {
        setLastActionMessage('Scan a commission card barcode first before triggering an action.');
        return;
      }

      if (cleanCode === 'ACTION:STAGE_IN_CRAFTING') {
        onUpdateStage(matchedCard.id, 'in_crafting');
        setMatchedCard({ ...matchedCard, stage: 'in_crafting' });
        setLastActionMessage(`Advanced ${matchedCard.id} to IN CRAFTING / CURING.`);
        onTriggerToast(`Floor Scanner: ${matchedCard.id} moved to IN CRAFTING`);
      } else if (cleanCode === 'ACTION:STAGE_QC') {
        onUpdateStage(matchedCard.id, 'qc_packaging');
        setMatchedCard({ ...matchedCard, stage: 'qc_packaging' });
        setLastActionMessage(`Advanced ${matchedCard.id} to QC & PACKAGING.`);
        onTriggerToast(`Floor Scanner: ${matchedCard.id} moved to QC & PACKAGING`);
      } else if (cleanCode === 'ACTION:STAGE_MANIFEST') {
        onUpdateStage(matchedCard.id, 'manifested');
        setMatchedCard({ ...matchedCard, stage: 'manifested' });
        setLastActionMessage(`Dispatched ${matchedCard.id} to MANIFESTED.`);
        onTriggerToast(`Floor Scanner: ${matchedCard.id} MANIFESTED for courier pickup`);
      }
      return;
    }

    // Check if it's a bin barcode
    if (cleanCode.startsWith('BIN-')) {
      setAssignedBin(cleanCode);
      setLastActionMessage(`Assigned active commission to staging locker ${cleanCode}.`);
      onTriggerToast(`Allocated to Staging Locker ${cleanCode}`);
      return;
    }

    // Otherwise, match card ID
    const found = cards.find(
      (c) => c.id.toUpperCase() === cleanCode || cleanCode.includes(c.id.toUpperCase())
    );

    if (found) {
      setMatchedCard(found);
      setLastActionMessage(`Scanned card ${found.id} (${found.title}). Ready for stage update.`);
      onTriggerToast(`Scanned Commission ${found.id}`);
    } else {
      setLastActionMessage(`Barcode "${code}" not found in current atelier queue.`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessBarcode(barcodeInput);
    setBarcodeInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F3EDE4] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center shadow-sm">
              <Barcode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Epilogue'] text-lg font-bold text-[#2D221E]">
                  Atelier Floor Barcode & Bin Scanner
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF6F0] text-[#1E6B43] flex items-center gap-1 border border-[#A3D9BC]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B43] animate-pulse"></span>
                  Laser / Wedge Ready
                </span>
              </div>
              <p className="text-xs text-[#6B5851]">
                Hands-free commission stage progression and locker bin staging for Jaipur Unit 02
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

        {/* Scan Input Box */}
        <form onSubmit={handleFormSubmit} className="space-y-2">
          <div className="relative">
            <Barcode className="absolute left-3.5 top-3 w-5 h-5 text-[#9C8880]" />
            <input
              type="text"
              autoFocus
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              placeholder="Aim laser scanner or enter code (e.g. DN-1048, ACTION:STAGE_QC, BIN-JA-01)..."
              className="w-full pl-11 pr-24 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] text-[#2D221E] text-xs font-['Space_Mono'] focus:outline-hidden focus:border-[#9d3e1d] transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl bg-[#9d3e1d] text-white text-xs font-bold hover:bg-[#bd5633] transition-all shadow-xs"
            >
              Scan
            </button>
          </div>
          {lastActionMessage && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FEF5EA] border border-[#F8CCA0]/70 text-xs text-[#A35C00]">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#1E6B43]" />
              <span className="font-medium">{lastActionMessage}</span>
            </div>
          )}
        </form>

        {/* Test Barcode Clickers (for desktop/tablet without laser gun) */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851] block">
            Clickable Test Barcodes (Simulate Laser Gun Scans):
          </span>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold text-[#9C8880] uppercase self-center mr-1">
              Commissions:
            </span>
            {cards.slice(0, 4).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleProcessBarcode(c.id)}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E5DBD0] text-[#9d3e1d] hover:border-[#9d3e1d] font-['Space_Mono'] text-xs font-bold transition-all shadow-2xs active:scale-95"
              >
                [{c.id}]
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-1 border-t border-[#E5DBD0]/60">
            <span className="text-[10px] font-bold text-[#9C8880] uppercase self-center mr-1">
              Floor Actions:
            </span>
            <button
              type="button"
              onClick={() => handleProcessBarcode('ACTION:STAGE_IN_CRAFTING')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#A35C00]/40 text-[#A35C00] hover:bg-[#FEF5EA] text-xs font-bold transition-all shadow-2xs active:scale-95"
            >
              ▶ Start Crafting / Cure
            </button>
            <button
              type="button"
              onClick={() => handleProcessBarcode('ACTION:STAGE_QC')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#1E6B43]/40 text-[#1E6B43] hover:bg-[#EBF6F0] text-xs font-bold transition-all shadow-2xs active:scale-95"
            >
              ✔ Move to QC Packaging
            </button>
            <button
              type="button"
              onClick={() => handleProcessBarcode('ACTION:STAGE_MANIFEST')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#1E5888]/40 text-[#1E5888] hover:bg-[#EBF3F8] text-xs font-bold transition-all shadow-2xs active:scale-95"
            >
              🚚 Courier Manifest
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 border-t border-[#E5DBD0]/60">
            <span className="text-[10px] font-bold text-[#9C8880] uppercase self-center mr-1">
              Locker Bins:
            </span>
            {['BIN-JA-01', 'BIN-JA-02', 'BIN-JA-03', 'BIN-JA-04'].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => handleProcessBarcode(b)}
                className={`px-2 py-0.5 rounded-md font-['Space_Mono'] text-xs font-bold transition-all ${
                  assignedBin === b
                    ? 'bg-[#2D221E] text-white'
                    : 'bg-white border border-[#E5DBD0] text-[#6B5851] hover:bg-[#FAF7F2]'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Active Matched Card Card */}
        {matchedCard && (
          <div className="p-4 rounded-2xl bg-white border-2 border-[#9d3e1d]/30 shadow-md space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-lg text-xs font-bold font-['Space_Mono'] bg-[#fee9e5] text-[#9d3e1d]">
                  {matchedCard.id}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B5851]">
                  Current: <strong className="text-[#2D221E]">{matchedCard.stage.replace('_', ' ')}</strong>
                </span>
              </div>
              <span className="text-[11px] font-['Space_Mono'] text-[#9C8880]">
                Assigned Bin: <strong className="text-[#9d3e1d]">{assignedBin}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center flex-shrink-0">
                {matchedCard.type === 'candle' ? (
                  <Flame className="w-5 h-5" />
                ) : (
                  <ShoppingBag className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-[#2D221E] truncate">
                  {matchedCard.title}
                </h4>
                <p className="text-xs text-[#6B5851] truncate">
                  {matchedCard.subtitle} • {matchedCard.customerName}
                </p>
              </div>
              <button
                onClick={() => {
                  onInspectCard(matchedCard);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] text-xs font-bold border border-[#E5DBD0]"
              >
                Full Details →
              </button>
            </div>

            {/* Quick Stage Progression Buttons */}
            <div className="pt-2 border-t border-[#F3EDE4] flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851]">
                Quick Advance Stage:
              </span>
              <div className="flex gap-2 text-xs">
                {(['new_placed', 'in_crafting', 'qc_packaging', 'manifested'] as CraftStage[]).map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        onUpdateStage(matchedCard.id, st);
                        setMatchedCard({ ...matchedCard, stage: st });
                        onTriggerToast(`Card ${matchedCard.id} stage updated to ${st}`);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                        matchedCard.stage === st
                          ? 'bg-[#9d3e1d] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-[#2D221E] hover:bg-[#F3EDE4] border border-[#E5DBD0]'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
