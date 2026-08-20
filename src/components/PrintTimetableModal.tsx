import React from 'react';
import { X, Printer, Download, Sparkles } from 'lucide-react';
import { DaySchedule, SpecialOutingStep } from '../types';
import { soundFx } from '../utils/audio';

interface PrintTimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedules: DaySchedule[];
  specialSteps: SpecialOutingStep[];
}

export const PrintTimetableModal: React.FC<PrintTimetableModalProps> = ({
  isOpen,
  onClose,
  schedules,
  specialSteps,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#111111] border border-white/15 rounded-xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Modal Controls (Hidden in print) */}
        <div className="no-print flex items-center justify-between p-5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#FF6B35]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF6B35] block">
                [ EXPORT & PRINT DOCUMENT ]
              </span>
              <h3 className="text-base font-serif italic text-white">
                Bản In Thời Gian Biểu Mùa Hè 2026
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-black font-mono font-bold text-xs uppercase shadow-md transition-all"
            >
              <Printer className="w-4 h-4" /> Bấm Để In / Lưu PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Canvas */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-white text-slate-900 print:p-0 print:m-0">
          
          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-slate-900 mb-6">
            <div className="flex items-center justify-center gap-2 text-2xl font-black uppercase tracking-wider text-slate-900 font-serif">
              ☀️ THỜI GIAN BIỂU MÙA HÈ 2026 - SOLARIS
            </div>
            <p className="text-xs text-slate-600 mt-1 font-mono">
              Lịch trình rèn luyện trí tuệ, thể lực bóng đá/bóng rổ và phiêu lưu dã ngoại gia đình
            </p>
          </div>

          {/* 7-Day Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {schedules.map(day => (
              <div 
                key={day.id}
                className="border-2 border-slate-800 rounded-lg overflow-hidden flex flex-col bg-slate-50"
              >
                <div className="bg-slate-900 text-white p-2 text-center">
                  <div className="font-extrabold text-xs font-mono">{day.name.toUpperCase()}</div>
                  <div className="text-[10px] text-amber-300 font-medium line-clamp-1">{day.badge}</div>
                </div>

                <div className="p-2 flex flex-col gap-1.5 flex-1">
                  {day.items.map(it => (
                    <div 
                      key={it.id}
                      className="p-1.5 rounded bg-white border border-slate-300 shadow-2xs text-[11px]"
                    >
                      <div className="font-mono text-[9px] font-bold text-indigo-700 leading-tight">
                        {it.timeRange}
                      </div>
                      <div className="font-bold text-slate-900 mt-0.5 leading-tight">
                        {it.emoji} {it.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Special Outing Section for Print */}
          <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-[#FF6B35] bg-orange-50/60">
            <div className="flex items-center gap-2 text-sm font-extrabold text-orange-900 uppercase mb-2 font-serif">
              🎡 NGÀY ĐẶC BIỆT – ĐI CHƠI VUI CHƠI DÃ NGOẠI
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-[11px] text-slate-800 font-medium">
              {specialSteps.map(step => (
                <div key={step.id} className="flex items-center gap-1.5 bg-white p-1.5 rounded border border-orange-200">
                  <span>{step.emoji}</span>
                  <span className="truncate">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-6 pt-3 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>✦ Chúc bạn có một mùa hè 2026 thật rực rỡ, kỷ luật và tràn ngập niềm vui!</span>
            <span>Solaris Timetable Engine</span>
          </div>

        </div>

      </div>
    </div>
  );
};
