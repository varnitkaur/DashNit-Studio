import React, { useState } from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Flame,
  Radio,
} from 'lucide-react';

export const IoTCuringTelemetry: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [temperature, setTemperature] = useState(23.4);
  const [humidity, setHumidity] = useState(46);
  const [vocIndex, setVocIndex] = useState(142);
  const [isAlert, setIsAlert] = useState(false);
  const [alertReason, setAlertReason] = useState<string | null>(null);

  const handleSimulateSpike = () => {
    setTemperature(28.2);
    setHumidity(64);
    setVocIndex(380);
    setIsAlert(true);
    setAlertReason('Curing Room 01 exceeded 25°C threshold. Curing timer lock engaged to prevent soy wax sweating.');
  };

  const handleNormalize = () => {
    setTemperature(23.4);
    setHumidity(46);
    setVocIndex(142);
    setIsAlert(false);
    setAlertReason(null);
  };

  return (
    <div className={`w-full rounded-2xl transition-all border ${
      isAlert
        ? 'bg-[#FDF2F2] border-[#ba1a1a]/50 shadow-md'
        : 'bg-white border-[#E5DBD0] shadow-xs'
    }`}>
      {/* Header Bar */}
      <div className="p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            isAlert ? 'bg-[#ba1a1a] text-white' : 'bg-[#fee9e5] text-[#9d3e1d]'
          }`}>
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Epilogue'] text-xs font-bold text-[#2D221E]">
                IoT Curing Room Telemetry • Jaipur Locker Unit 01
              </h3>
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold uppercase ${
                isAlert
                  ? 'bg-[#ba1a1a] text-white'
                  : 'bg-[#EBF6F0] text-[#1E6B43] border border-[#A3D9BC]/60'
              }`}>
                {isAlert ? 'Temperature Warning' : 'Optimal Environment'}
              </span>
            </div>
            <p className="text-[11px] text-[#6B5851]">
              Live ESP32 + DHT22 telemetry • 48h Fragrance cure integrity lock
            </p>
          </div>
        </div>

        {/* Quick Readouts */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-['Space_Mono']">
            <Thermometer className={`w-4 h-4 ${isAlert ? 'text-[#ba1a1a]' : 'text-[#9d3e1d]'}`} />
            <strong className={isAlert ? 'text-[#ba1a1a]' : 'text-[#2D221E]'}>
              {temperature.toFixed(1)}°C
            </strong>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-['Space_Mono']">
            <Droplets className="w-4 h-4 text-[#1E5888]" />
            <strong className="text-[#2D221E]">{humidity}% RH</strong>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-[#FAF7F2] text-[#6B5851] text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <span>{isExpanded ? 'Hide Controls' : 'Sensors & Simulator'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Sensor Drawer & Simulator */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-[#E5DBD0]/70 space-y-3 mt-1 text-xs">
          {isAlert && alertReason && (
            <div className="p-3 rounded-xl bg-white border border-[#ba1a1a]/40 text-[#ba1a1a] flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{alertReason}</span>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0]">
              <span className="text-[10px] text-[#9C8880] uppercase font-bold block">
                Ambient Temperature
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5 font-['Space_Mono']">
                <span className={`text-lg font-bold ${isAlert ? 'text-[#ba1a1a]' : 'text-[#2D221E]'}`}>
                  {temperature.toFixed(1)}°C
                </span>
                <span className="text-[10px] text-[#6B5851]">Target: 22–25°C</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0]">
              <span className="text-[10px] text-[#9C8880] uppercase font-bold block">
                Relative Humidity
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5 font-['Space_Mono']">
                <span className="text-lg font-bold text-[#1E5888]">{humidity}%</span>
                <span className="text-[10px] text-[#6B5851]">Target: 40–50%</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0]">
              <span className="text-[10px] text-[#9C8880] uppercase font-bold block">
                VOC Fragrance Index
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5 font-['Space_Mono']">
                <span className="text-lg font-bold text-[#A35C00]">{vocIndex} ppb</span>
                <span className="text-[10px] text-[#6B5851]">Airflow: 420 RPM</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0]">
              <span className="text-[10px] text-[#9C8880] uppercase font-bold block">
                Cure Protection State
              </span>
              <div className="flex items-center gap-1.5 mt-1 font-bold">
                {isAlert ? (
                  <span className="text-[#ba1a1a]">CURE CLOCKS PAUSED</span>
                ) : (
                  <span className="text-[#1E6B43]">ALL TIMERS ACTIVE</span>
                )}
              </div>
            </div>
          </div>

          {/* Simulator controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <span className="text-[11px] text-[#6B5851]">
              Simulate floor sensor anomalies to test automated curing preservation logic:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSimulateSpike}
                className="px-3 py-1.5 rounded-xl bg-[#ba1a1a] hover:bg-[#991515] text-white font-bold text-xs shadow-xs transition-all active:scale-95"
              >
                🔥 Simulate Heat Spike (28.2°C)
              </button>
              <button
                type="button"
                onClick={handleNormalize}
                className="px-3 py-1.5 rounded-xl bg-[#1E6B43] hover:bg-[#165032] text-white font-bold text-xs shadow-xs transition-all active:scale-95"
              >
                ✔ Normalize (23.4°C)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
