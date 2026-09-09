import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Bot,
  Flame,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ArrowRight,
  Send,
  MessageSquare,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { CraftCard, AICommissionParseResult } from '../types';
import { requestAICommissionParse } from '../services/geminiService';

interface AIConciergeModalProps {
  onClose: () => void;
  onCommissionCreated: (card: CraftCard) => void;
}

const PRESET_SCENARIOS = [
  {
    label: '🎂 Urgent 25th Birthday Candle (Amber Jar)',
    text: 'Hi DashNit! This is Ananya Sharma (+91 98765 43210). I need an urgent bespoke soy candle in an amber glass jar for Maya’s 25th birthday before this Saturday! She adores French lavender with subtle cedarwood notes. Please inscribe “Happy 25th Maya!” in gold vinyl on the glass with crackling wood wick.',
  },
  {
    label: '🧶 Bespoke Daisy Tote with Monogram (Crochet)',
    text: 'Hello DashNit Studio! Rhea K. here (+91 99887 76655). I would love a custom Daisy motif tote bag stitched in Sage and Warm Buttercup yarn. Can you embroider the monogram “A.R.” on the pocket rim? Standard delivery to Bandra West, Mumbai.',
  },
  {
    label: '✨ Mysore Sandalwood Botanical Wax Melts',
    text: 'Good morning Jaipur atelier! Looking to order a Botanical Wax Melt Set infused with Royal Mysore Sandalwood and Amber notes with dry rose petals for our anniversary gift hamper. Needs gift boxing.',
  },
];

export const AIConciergeModal: React.FC<AIConciergeModalProps> = ({
  onClose,
  onCommissionCreated,
}) => {
  const [inputText, setInputText] = useState(PRESET_SCENARIOS[0].text);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedResult, setParsedResult] = useState<AICommissionParseResult | null>(null);
  const [parseSource, setParseSource] = useState<string>('');
  const [hasCopied, setHasCopied] = useState(false);

  const handleParse = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const res = await requestAICommissionParse(inputText);
      setParsedResult(res.data);
      setParseSource(res.source);
    } catch (err) {
      console.error('Parsing error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveAndQueue = () => {
    if (!parsedResult) return;

    const newId = `DN-${Math.floor(1055 + Math.random() * 8900)}`;

    const newCard: CraftCard = {
      id: newId,
      stage: 'new_placed',
      title: parsedResult.title,
      subtitle: parsedResult.subtitle,
      type: parsedResult.craftType,
      urgent: parsedResult.urgent,
      customerName: parsedResult.customerName,
      customerPhone: parsedResult.customerPhone,
      dueText: parsedResult.urgent ? 'Due in 2 days (Urgent)' : `Due in ${parsedResult.leadTimeDays} days`,
      price: parsedResult.price,
      paymentMethod: 'UPI Instant Intent',
      paymentStatus: 'Captured',
      details: {
        scent: parsedResult.scentProfile,
        vinylInscription: parsedResult.vinylInscription,
        yarnPalette: parsedResult.yarnPalette,
        monogram: parsedResult.monogram,
        giftNote: parsedResult.giftNote,
        fastTrack: parsedResult.urgent,
        destination: 'Pan-India Express Hub',
      },
    };

    onCommissionCreated(newCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E5DBD0] space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F3EDE4] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Epilogue'] text-lg font-bold text-[#2D221E]">
                  Gemini AI Artisan Concierge
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF6F0] text-[#1E6B43] border border-[#A3D9BC]/60">
                  v2.5 Flash
                </span>
              </div>
              <p className="text-xs text-[#6B5851]">
                Parse unstructured WhatsApp inquiries & DMs into verified atelier commissions
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

        {/* Preset scenario shortcuts */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B5851] block">
            Select Live WhatsApp Sample or Paste Inquiry:
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_SCENARIOS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(s.text);
                  setParsedResult(null);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all text-left border ${
                  inputText === s.text
                    ? 'bg-[#fee9e5] border-[#9d3e1d] text-[#9d3e1d] font-bold'
                    : 'bg-[#FAF7F2] border-[#E5DBD0] text-[#2D221E] hover:bg-[#F3EDE4]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste customer voice note transcript, Instagram DM, or WhatsApp message here..."
              className="w-full text-xs p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] text-[#2D221E] focus:outline-hidden focus:border-[#9d3e1d] transition-all resize-none font-['Plus_Jakarta_Sans']"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#9C8880]">
              Powered by server-side Gemini 2.5 Flash with fallback heuristics
            </span>
            <button
              onClick={handleParse}
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2 rounded-xl bg-[#9d3e1d] hover:bg-[#bd5633] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Bot className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Analyzing with Gemini...' : '✨ Parse with Gemini AI'}</span>
            </button>
          </div>
        </div>

        {/* Structured Results View */}
        {parsedResult && (
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-[#E5DBD0] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1E6B43] animate-pulse"></span>
                <span className="text-xs font-bold text-[#2D221E] uppercase tracking-wider font-['Space_Mono']">
                  AI Extraction Verified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#6B5851]">
                  Engine: <strong className="text-[#2D221E]">{parseSource}</strong>
                </span>
                <span className="text-[10px] font-bold text-[#1E6B43] bg-[#EBF6F0] px-2 py-0.5 rounded-full border border-[#A3D9BC]/50">
                  {Math.round(parsedResult.confidenceScore * 100)}% Confidence
                </span>
              </div>
            </div>

            {/* Extracted Card Header */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#E5DBD0]">
              <div className="w-10 h-10 rounded-xl bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center flex-shrink-0">
                {parsedResult.craftType === 'candle' ? (
                  <Flame className="w-5 h-5" />
                ) : (
                  <ShoppingBag className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm text-[#2D221E] truncate">
                  {parsedResult.title}
                </h4>
                <p className="text-xs text-[#6B5851] truncate">
                  {parsedResult.subtitle}
                </p>
              </div>
              <div className="text-right">
                <span className="font-['Epilogue'] font-bold text-base text-[#1E6B43]">
                  ₹{parsedResult.price}
                </span>
                <span className="text-[10px] text-[#6B5851] block">
                  Est. {parsedResult.leadTimeDays}d lead
                </span>
              </div>
            </div>

            {/* Grid of details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-[#E5DBD0]">
                <span className="text-[10px] text-[#9C8880] uppercase font-bold block">
                  Customer Profile
                </span>
                <span className="font-bold text-[#2D221E] block">
                  {parsedResult.customerName}
                </span>
                <span className="text-[11px] text-[#6B5851] font-['Space_Mono']">
                  {parsedResult.customerPhone}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E5DBD0]">
                <span className="text-[10px] text-[#9C8880] uppercase font-bold block">
                  SLA Priority
                </span>
                {parsedResult.urgent ? (
                  <span className="text-xs font-bold text-[#ba1a1a] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> Urgent (&lt; 48h SLA)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-[#1E6B43]">
                    Standard Studio Queue
                  </span>
                )}
                <span className="text-[11px] text-[#6B5851] block">
                  Jaipur Unit 02 Slot
                </span>
              </div>
            </div>

            {/* Custom attributes if present */}
            {(parsedResult.scentProfile ||
              parsedResult.vinylInscription ||
              parsedResult.yarnPalette ||
              parsedResult.monogram) && (
              <div className="p-3 rounded-xl bg-white border border-[#E5DBD0] space-y-1.5 text-xs">
                <span className="text-[10px] text-[#9C8880] uppercase font-bold block">
                  Crafted Specifications:
                </span>
                {parsedResult.scentProfile && (
                  <div className="flex justify-between">
                    <span className="text-[#6B5851]">Botanical Scent:</span>
                    <strong className="text-[#2D221E]">{parsedResult.scentProfile}</strong>
                  </div>
                )}
                {parsedResult.vinylInscription && (
                  <div className="flex justify-between">
                    <span className="text-[#6B5851]">Vinyl Cut:</span>
                    <strong className="text-[#9d3e1d] font-['Space_Mono']">
                      {parsedResult.vinylInscription}
                    </strong>
                  </div>
                )}
                {parsedResult.yarnPalette && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B5851]">Yarn Palette:</span>
                    <div className="flex items-center gap-1.5">
                      {parsedResult.yarnPalette.map((y, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold border border-[#E5DBD0]"
                          style={{ backgroundColor: `${y.hex}25`, color: '#2D221E' }}
                        >
                          {y.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {parsedResult.monogram && (
                  <div className="flex justify-between">
                    <span className="text-[#6B5851]">Monogram Stitch:</span>
                    <strong className="text-[#9d3e1d] font-['Space_Mono']">
                      {parsedResult.monogram}
                    </strong>
                  </div>
                )}
              </div>
            )}

            {/* AI Harmony Recommendation */}
            {parsedResult.aiHarmonyRecommendation && (
              <div className="p-3 rounded-xl bg-[#FEF5EA] border border-[#F8CCA0]/80 text-xs text-[#A35C00] flex items-start gap-2">
                <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>AI Formulation Note:</strong>{' '}
                  {parsedResult.aiHarmonyRecommendation}
                </p>
              </div>
            )}

            {/* Approval Action */}
            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F3EDE4] text-[#6B5851] text-xs font-semibold border border-[#E5DBD0]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApproveAndQueue}
                className="px-4 py-2 rounded-xl bg-[#1E6B43] hover:bg-[#165032] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Queue to Jaipur Atelier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
