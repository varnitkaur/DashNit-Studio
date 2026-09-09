import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShoppingBag,
  ShieldCheck,
  Check,
  ArrowRight,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { CraftCard } from '../types';

interface GeminiVisionQCModalProps {
  card: CraftCard | null;
  onClose: () => void;
  onPassQC: (cardId: string) => void;
  onTriggerToast: (msg: string) => void;
}

const QC_PRESET_SAMPLES = [
  {
    id: 'perfect_candle',
    label: '🕯️ Pass: Pristine Candle (Centered Wick & Smooth Wax)',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
    type: 'candle',
    score: 99,
    status: 'pass',
    checks: {
      surfaceSmoothness: 'Pristine, 0 frosting or sinkholes detected (99% score)',
      wickCentering: 'Centered within 0.4mm tolerance',
      inscriptionClarity: 'Gold vinyl debossing 100% crisp',
      waxSealPreservation: 'Intact, embossed DashNit seal verified',
    },
    recommendation: 'Exceptional craft execution. Passed all 4 physical quality gates with zero defects. Ready for final luxury box packaging.',
  },
  {
    id: 'defect_candle',
    label: '⚠️ Defect: Surface Sinkhole & Off-Center Wick',
    imageUrl: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&auto=format&fit=crop&q=80',
    type: 'candle',
    score: 48,
    status: 'fail',
    checks: {
      surfaceSmoothness: 'Cavity sinkhole detected near wick rim (-35%)',
      wickCentering: 'Off-center by 4.2mm (burn tunnel risk)',
      inscriptionClarity: 'Minor air bubble under vinyl letter "a"',
      waxSealPreservation: 'Pending packaging',
    },
    recommendation: 'REJECTED: Requires heat gun surface reflow (120°C for 45s) and wick realign jig prior to packaging.',
  },
  {
    id: 'perfect_crochet',
    label: '🧶 Pass: Daisy Crochet Tote (Stitch Tension & Monogram)',
    imageUrl: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=600&auto=format&fit=crop&q=80',
    type: 'crochet',
    score: 98,
    status: 'pass',
    checks: {
      surfaceSmoothness: 'Uniform double-crochet row tension across all 65 rows',
      wickCentering: 'N/A (Crochet medium)',
      inscriptionClarity: 'Monogram embroidery aligned with pocket hem line',
      waxSealPreservation: 'Kraft box presentation ready',
    },
    recommendation: 'Stitch count verified against master pattern. Tension ratio within ±1.5%. Approved for packaging.',
  },
];

export const GeminiVisionQCModal: React.FC<GeminiVisionQCModalProps> = ({
  card,
  onClose,
  onPassQC,
  onTriggerToast,
}) => {
  const [selectedSample, setSelectedSample] = useState(QC_PRESET_SAMPLES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(true);

  if (!card) return null;

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
    }, 700);
  };

  const handleConfirmPass = () => {
    onPassQC(card.id);
    onTriggerToast(`Gemini Vision QC Certified for ${card.id} (Score: ${selectedSample.score}/100)`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F3EDE4] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center shadow-sm">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Epilogue'] text-lg font-bold text-[#2D221E]">
                  Gemini Vision Automated QC Auditor
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fee9e5] text-[#9d3e1d] font-['Space_Mono']">
                  {card.id}
                </span>
              </div>
              <p className="text-xs text-[#6B5851]">
                High-resolution surface inspection for {card.title} ({card.customerName})
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

        {/* Preset Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851] block">
            Select Workshop Station Camera Feed / Photo Sample:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {QC_PRESET_SAMPLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedSample(s);
                  handleRunAnalysis();
                }}
                className={`p-2 rounded-xl text-left border text-xs transition-all ${
                  selectedSample.id === s.id
                    ? 'bg-[#fee9e5] border-[#9d3e1d] text-[#9d3e1d] font-bold shadow-xs'
                    : 'bg-[#FAF7F2] border-[#E5DBD0] text-[#2D221E] hover:bg-[#F3EDE4]'
                }`}
              >
                <div className="truncate font-medium">{s.label}</div>
                <div className="text-[10px] text-[#6B5851] mt-0.5">
                  Score: {s.score}/100 • {s.status.toUpperCase()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Camera Image & Gemini Overlay */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E5DBD0] bg-black max-h-56 flex items-center justify-center">
          <img
            src={selectedSample.imageUrl}
            alt="QC Snapshot"
            className="w-full h-56 object-cover opacity-90"
          />
          {/* Visual AI bounding box overlay */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-['Space_Mono'] backdrop-blur-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B43] animate-ping"></span>
                STATION CAM 02 • HD
              </span>
              <span className={`px-2 py-1 rounded-md text-[11px] font-bold font-['Space_Mono'] shadow-sm ${
                selectedSample.status === 'pass'
                  ? 'bg-[#1E6B43] text-white'
                  : 'bg-[#ba1a1a] text-white'
              }`}>
                QC SCORE: {selectedSample.score}/100 ({selectedSample.status.toUpperCase()})
              </span>
            </div>

            {/* Target reticle */}
            <div className="self-center w-24 h-24 border-2 border-dashed border-white/70 rounded-full flex items-center justify-center">
              <span className="text-[9px] text-white bg-black/50 px-1 rounded font-['Space_Mono']">
                {selectedSample.type === 'candle' ? 'Wick Center' : 'Tension Lock'}
              </span>
            </div>

            <div className="text-[10px] text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-xs">
              Gemini Vision 2.5 Flash Surface Audit Verified
            </div>
          </div>
        </div>

        {/* 4-Point Quality Inspection Findings */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-[#E5DBD0] pb-2">
            <h4 className="font-bold text-[#2D221E] uppercase tracking-wider text-[11px]">
              4-Point Quality Inspection Findings
            </h4>
            <span className="text-[10px] text-[#6B5851]">Jaipur Atelier Standard QC-702</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <span className="text-[#6B5851]">1. Surface Flatness & Smoothness:</span>
              <strong className={selectedSample.status === 'pass' ? 'text-[#1E6B43]' : 'text-[#ba1a1a]'}>
                {selectedSample.checks.surfaceSmoothness}
              </strong>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-[#6B5851]">2. Wick Centering & Plumb:</span>
              <strong className={selectedSample.status === 'pass' ? 'text-[#2D221E]' : 'text-[#ba1a1a]'}>
                {selectedSample.checks.wickCentering}
              </strong>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-[#6B5851]">3. Monogram / Inscription Legibility:</span>
              <strong className="text-[#2D221E]">
                {selectedSample.checks.inscriptionClarity}
              </strong>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-[#6B5851]">4. Presentation & Wax Seal:</span>
              <strong className="text-[#2D221E]">
                {selectedSample.checks.waxSealPreservation}
              </strong>
            </div>
          </div>

          <div className={`p-3 rounded-xl border flex items-start gap-2 ${
            selectedSample.status === 'pass'
              ? 'bg-[#EBF6F0] border-[#A3D9BC]/60 text-[#1E6B43]'
              : 'bg-[#FDF2F2] border-[#ba1a1a]/30 text-[#ba1a1a]'
          }`}>
            <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Gemini Assessment:</strong> {selectedSample.recommendation}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={handleRunAnalysis}
            className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] text-xs font-semibold border border-[#E5DBD0] flex items-center gap-1.5"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>Re-Scan Snapshot</span>
          </button>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F3EDE4] text-[#6B5851] text-xs font-semibold border border-[#E5DBD0]"
            >
              Cancel
            </button>

            {selectedSample.status === 'pass' ? (
              <button
                type="button"
                onClick={handleConfirmPass}
                className="px-4 py-2 rounded-xl bg-[#1E6B43] hover:bg-[#165032] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Certify & Pass 4-Point QC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onTriggerToast(`Order ${card.id} flagged for heat-gun reflow rework.`);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-[#ba1a1a] hover:bg-[#991515] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Flag for Floor Rework</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
