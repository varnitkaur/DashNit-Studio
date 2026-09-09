import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  CreditCard,
  Flame,
  ShoppingBag,
  Gift,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';

export const AnalyticsRevenue: React.FC = () => {
  const [dateRange, setDateRange] = useState<'today' | '7d' | 'mtd'>('mtd');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D221E] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 border border-[#9d3e1d]/40">
          <CheckCircle2 className="w-4 h-4 text-[#A3D9BC]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Protocol Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-md bg-[#fee9e5] text-[#9d3e1d] font-bold text-[11px] font-['Space_Mono'] uppercase">
            FR-REP-01 • EXECUTIVE COCKPIT
          </span>
          <span className="text-xs text-[#6B5851] font-medium hidden sm:inline">
            Live Sync: Razorpay & Shiprocket Active • Jaipur & Pune Ateliers
          </span>
        </div>
        <span className="text-[11px] font-['Space_Mono'] text-[#9C8880]">
          Last synced: 2m ago
        </span>
      </div>

      {/* Header & Date Range */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="font-['Epilogue'] text-2xl lg:text-3xl font-bold text-[#2D221E] tracking-tight">
            Studio Analytics & Revenue Performance
          </h1>
          <p className="text-xs lg:text-sm text-[#6B5851] mt-1 font-['Plus_Jakarta_Sans']">
            Monitoring North Star Metric (MCGM), Pan-India AOV, and Crafting Lead Times across Jaipur & Pune ateliers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center p-1 rounded-xl bg-[#F3EDE4] border border-[#E5DBD0]">
            <button
              onClick={() => setDateRange('today')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                dateRange === 'today' ? 'bg-white text-[#2D221E] shadow-xs' : 'text-[#6B5851]'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setDateRange('7d')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                dateRange === '7d' ? 'bg-white text-[#2D221E] shadow-xs' : 'text-[#6B5851]'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setDateRange('mtd')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                dateRange === 'mtd' ? 'bg-white text-[#9d3e1d] shadow-xs' : 'text-[#6B5851]'
              }`}
            >
              Month-to-Date (Sept 2026)
            </button>
          </div>

          <button
            onClick={() => showToast('GST Excel Dossier downloaded')}
            className="px-3.5 py-2 rounded-xl bg-[#F3EDE4] hover:bg-[#EDE5D8] text-[#2D221E] text-xs font-semibold flex items-center gap-2 transition-all border border-[#E5DBD0]"
          >
            <Download className="w-4 h-4 text-[#6B5851]" />
            <span>Export GST (Excel)</span>
          </button>
        </div>
      </div>

      {/* 5 Executive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* GMV */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851]">
              Gross Merchandise Value
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
                ₹8,42,650
              </span>
            </div>
            <span className="text-[11px] text-[#1E6B43] font-bold block mt-0.5">
              +18.4% vs last month
            </span>
          </div>

          <div className="mt-3 pt-2 border-t border-[#F3EDE4]">
            <div className="flex justify-between text-[10px] text-[#6B5851] mb-1">
              <span>Target: ₹15,00,000</span>
              <span className="font-bold text-[#9d3e1d]">56.1%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#E5DBD0]/60 overflow-hidden">
              <div className="h-full bg-[#9d3e1d] rounded-full" style={{ width: '56.1%' }}></div>
            </div>
          </div>
        </div>

        {/* North Star MCGM */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9d3e1d]">
                North Star: MCGM
              </span>
              <Award className="w-4 h-4 text-[#9d3e1d]" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
                542
              </span>
              <span className="text-xs text-[#6B5851]">Moments</span>
            </div>
            <span className="text-[11px] text-[#A35C00] font-semibold block mt-0.5">
              ⭐ 4.8 / 5 • 97.2% on-time
            </span>
          </div>

          <div className="mt-3 pt-2 border-t border-[#E5DBD0] text-[10px] text-[#6B5851]">
            Delivered & Unboxed: <strong className="text-[#1E6B43]">99.1% CSAT</strong>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851]">
              Average Order Value
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
                ₹1,580
              </span>
            </div>
            <span className="text-[11px] text-[#1E6B43] font-bold block mt-0.5">
              Exceeding target (≥ ₹1,450)
            </span>
          </div>

          <div className="mt-3 pt-2 border-t border-[#F3EDE4] text-[10px] text-[#6B5851]">
            Hamper Bundle Uplift: <strong className="text-[#2D221E]">+₹310</strong>
          </div>
        </div>

        {/* Crafting SLA Met */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851]">
              Crafting SLA Met
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#1E6B43]">
                96.8%
              </span>
            </div>
            <span className="text-[11px] text-[#1E6B43] font-bold block mt-0.5">
              Goal ≥ 96.0% (Passing)
            </span>
          </div>

          <div className="mt-3 pt-2 border-t border-[#F3EDE4] text-[10px] text-[#6B5851]">
            Avg Custom Lead: <strong className="text-[#2D221E]">4.1 Days</strong>
          </div>
        </div>

        {/* Payment Success */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851]">
              Payment Success
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Epilogue'] text-2xl font-bold text-[#2D221E]">
                94.2%
              </span>
            </div>
            <span className="text-[11px] text-[#6B5851] font-semibold block mt-0.5">
              UPI Intent 88.4% • Cards 96%
            </span>
          </div>

          <div className="mt-3 pt-2 border-t border-[#F3EDE4] text-[10px] text-[#6B5851]">
            Razorpay Gateway: <strong className="text-[#1E6B43]">0.4s p95</strong>
          </div>
        </div>
      </div>

      {/* Middle Section: Chart & Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Breakdown Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E]">
                Revenue & Order Volume Trend (Daily Breakdown)
              </h3>
              <p className="text-xs text-[#6B5851]">
                Ready-to-Ship inventory vs Bespoke Made-to-Order craftsmanship revenue curve.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#1E6B43]"></span>
                <span className="text-[#6B5851]">Ready-to-Ship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#9d3e1d]"></span>
                <span className="text-[#6B5851]">Made-to-Order</span>
              </div>
            </div>
          </div>

          {/* Diwali rush badge */}
          <div className="p-3 rounded-xl bg-[#FEF5EA] border border-[#F8CCA0]/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#A35C00] font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Sep 24: Peak Gift Run ₹48,220 (36 units) (Diwali Rush)</span>
            </div>
            <span className="text-[11px] font-['Space_Mono'] text-[#A35C00]">
              100% Fulfillment SLA
            </span>
          </div>

          {/* SVG Multi-Day Chart Representation */}
          <div className="h-56 w-full pt-4 flex flex-col justify-end">
            <div className="h-44 flex items-end justify-between gap-2 px-2 border-b border-[#E5DBD0]">
              {[
                { date: '18 Sep', rts: 12000, mto: 18000 },
                { date: '19 Sep', rts: 15000, mto: 21000 },
                { date: '20 Sep', rts: 9000, mto: 19500 },
                { date: '21 Sep', rts: 18000, mto: 24000 },
                { date: '22 Sep', rts: 14000, mto: 22000 },
                { date: '23 Sep', rts: 19000, mto: 27000 },
                { date: '24 Sep', rts: 21000, mto: 27220, peak: true },
                { date: '25 Sep', rts: 16000, mto: 20000 },
              ].map((item) => (
                <div key={item.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div className="w-full max-w-[28px] flex flex-col gap-0.5 items-center">
                    {/* MTO bar */}
                    <div
                      className={`w-full rounded-t-sm transition-all ${
                        item.peak ? 'bg-[#9d3e1d]' : 'bg-[#bd5633]'
                      }`}
                      style={{ height: `${(item.mto / 30000) * 80}px` }}
                      title={`MTO: ₹${item.mto}`}
                    ></div>
                    {/* RTS bar */}
                    <div
                      className="w-full bg-[#1E6B43] rounded-b-sm"
                      style={{ height: `${(item.rts / 30000) * 60}px` }}
                      title={`RTS: ₹${item.rts}`}
                    ></div>
                  </div>
                  <span className={`text-[10px] mt-1 ${item.peak ? 'font-bold text-[#9d3e1d]' : 'text-[#9C8880]'}`}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Contribution Donut Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E]">
                Revenue Contribution
              </h3>
              <span className="text-xs font-bold text-[#1E6B43] font-['Space_Mono']">
                100% Sync
              </span>
            </div>
            <p className="text-xs text-[#6B5851] mt-0.5">
              Total MTD: <strong>₹8.42 Lakhs</strong>
            </p>
          </div>

          <div className="space-y-3 my-2">
            {/* Crochet */}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#9d3e1d]" />
                  <span className="font-bold text-[#2D221E]">Crochet Apparel & Décor</span>
                </div>
                <span className="font-bold font-['Space_Mono'] text-[#9d3e1d]">44%</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#6B5851]">
                <span>₹3,70,766</span>
                <span>Beanies, throws & totes</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E5DBD0]/50 overflow-hidden">
                <div className="h-full bg-[#9d3e1d] rounded-full" style={{ width: '44%' }}></div>
              </div>
            </div>

            {/* Candles */}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#A35C00]" />
                  <span className="font-bold text-[#2D221E]">Scented Soy Candles</span>
                </div>
                <span className="font-bold font-['Space_Mono'] text-[#A35C00]">38%</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#6B5851]">
                <span>₹3,20,207</span>
                <span>Amber jars & bubble candles</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E5DBD0]/50 overflow-hidden">
                <div className="h-full bg-[#A35C00] rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>

            {/* Hampers */}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#1E6B43]" />
                  <span className="font-bold text-[#2D221E]">Curated Festive Hampers</span>
                </div>
                <span className="font-bold font-['Space_Mono'] text-[#1E6B43]">18%</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#6B5851]">
                <span>₹1,51,677</span>
                <span>Diwali Eco-Luxe bundles</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E5DBD0]/50 overflow-hidden">
                <div className="h-full bg-[#1E6B43] rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FDF2F4] text-[11px] text-[#80515a] flex items-center justify-between">
            <span>Bespoke Crochet production up 32% this week</span>
            <span className="font-bold cursor-pointer hover:underline">Plan →</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Top 5 Best Sellers & Guardrails */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Products */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E]">
              Top 5 Best-Selling Artisan Products
            </h3>
            <span className="text-xs text-[#6B5851]">MTD September 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5DBD0] text-[10px] font-bold text-[#6B5851] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-2">Medium</th>
                  <th className="py-2.5 px-2">Units Sold</th>
                  <th className="py-2.5 px-2">Revenue</th>
                  <th className="py-2.5 px-2 text-right">Return Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EDE4]">
                {[
                  {
                    name: 'Terracotta Ribbed Knit Beanie',
                    type: 'Crochet',
                    units: 142,
                    rev: '₹1,97,380',
                    ret: '0.14%',
                  },
                  {
                    name: 'Smoked Oud & Amber Soy Candle',
                    type: 'Soy Candle',
                    units: 128,
                    rev: '₹1,65,120',
                    ret: '0.22%',
                  },
                  {
                    name: 'Sanctuary Festive Dual Hamper',
                    type: 'Hamper Box',
                    units: 84,
                    rev: '₹1,51,200',
                    ret: '0.00%',
                  },
                  {
                    name: 'Bespoke Monogrammed Tote',
                    type: 'Custom MTO',
                    units: 76,
                    rev: '₹1,21,600',
                    ret: '0.31%',
                  },
                  {
                    name: 'Cardamom & Warm Vanilla Pod',
                    type: 'Soy Candle',
                    units: 65,
                    rev: '₹81,250',
                    ret: '0.18%',
                  },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-[#FAF7F2]/60">
                    <td className="py-3 px-3 font-bold text-[#2D221E]">
                      {item.name}
                    </td>
                    <td className="py-3 px-2 text-[#6B5851]">{item.type}</td>
                    <td className="py-3 px-2 font-['Space_Mono'] font-semibold text-[#2D221E]">
                      {item.units}
                    </td>
                    <td className="py-3 px-2 font-['Epilogue'] font-bold text-[#2D221E]">
                      {item.rev}
                    </td>
                    <td className="py-3 px-2 text-right text-[#1E6B43] font-semibold">
                      {item.ret}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Studio Operational Guardrails */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E]">
              Studio Operational Guardrails
            </h3>
            <span className="text-[10px] font-bold text-[#1E6B43] bg-[#EBF6F0] px-2 py-0.5 rounded-full">
              Healthy
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#2D221E]">Transit Vessel Damage</span>
                <span className="text-[#1E6B43] font-bold font-['Space_Mono']">0.8% Safe</span>
              </div>
              <p className="text-[11px] text-[#6B5851]">
                Current 0.8% with air-bubble cushioning (Guardrail &lt; 1.5%)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#2D221E]">Return to Origin (RTO) Rate</span>
                <span className="text-[#1E6B43] font-bold font-['Space_Mono']">1.2% Healthy</span>
              </div>
              <p className="text-[11px] text-[#6B5851]">
                96.5% Prepaid UPI orders (Guardrail &lt; 4.0%)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#2D221E]">Customizer Defect Rate</span>
                <span className="text-[#1E6B43] font-bold font-['Space_Mono']">0.3% High Quality</span>
              </div>
              <p className="text-[11px] text-[#6B5851]">
                2-stage artisan QC checklist passed before sealing (Guardrail &lt; 0.8%)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#2D221E]">WhatsApp Dispatch Alerts</span>
                <span className="text-[#1E6B43] font-bold font-['Space_Mono']">99.4% Delivery</span>
              </div>
              <p className="text-[11px] text-[#6B5851]">
                Meta Cloud API, 5,410 Messages Sent, 1.1s latency
              </p>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => showToast('Studio compliance dossier downloaded')}
              className="w-full py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] border border-[#E5DBD0] text-xs font-bold transition-all text-center"
            >
              Download Full Compliance Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
