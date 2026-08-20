import React from 'react';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Flame, 
  ChevronRight,
  Coffee,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { DaySchedule, ScheduleItem } from '../types';
import { CATEGORY_CONFIG } from '../data/defaultSchedule';
import { ActivityStatus } from '../utils/timeHelpers';

interface LiveActivityBannerProps {
  currentDaySchedule: DaySchedule | undefined;
  status: ActivityStatus;
  currentTimeString: string;
  simulatedTime: string | null;
  setSimulatedTime: (time: string | null) => void;
  onToggleComplete: (itemId: string) => void;
  completedIds: Set<string>;
}

export const LiveActivityBanner: React.FC<LiveActivityBannerProps> = ({
  currentDaySchedule,
  status,
  currentTimeString,
  simulatedTime,
  setSimulatedTime,
  onToggleComplete,
  completedIds,
}) => {
  const current = status.currentActivity;
  const next = status.nextActivity;
  const isDone = current ? completedIds.has(current.id) : false;

  const handleCelebrate = () => {
    if (!current) return;
    soundFx.playVictory();
    onToggleComplete(current.id);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B35', '#D7263D', '#00FF41', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  const quickTimes = [
    { label: '07:30 Sáng', time: '07:30' },
    { label: '10:00 Thư Viện', time: '10:00' },
    { label: '12:00 Trưa', time: '12:00' },
    { label: '16:00 Chiều', time: '16:00' },
    { label: '19:45 Tối', time: '19:45' },
  ];

  return (
    <div className="relative overflow-hidden bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-xl shadow-2xl">
      
      {/* Editorial Ghost Watermark */}
      <div className="absolute top-0 right-4 p-4 opacity-5 pointer-events-none select-none">
        <span className="text-[120px] sm:text-[160px] font-serif font-black leading-none italic text-white">
          {currentDaySchedule ? `0${currentDaySchedule.dayIndex}` : 'LIVE'}
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        
        {/* Top Header: Day title + Simulation switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 bg-white/5 border border-white/15 text-[#FF6B35] font-serif italic font-bold text-lg rounded">
              {currentDaySchedule ? currentDaySchedule.name.slice(0, 3) : 'Hôm'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FF6B35]">
                  {currentDaySchedule?.fullTitle || 'LỊCH TRÌNH HÔM NAY'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20">
                  <Flame className="w-2.5 h-2.5 fill-current" /> [ LIVE TRACKER ]
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5 font-light">
                {currentDaySchedule?.tagline}
              </p>
            </div>
          </div>

          {/* Time simulation fast buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase tracking-widest text-white/40 mr-1 hidden sm:inline flex items-center gap-1 font-mono">
              <Sliders className="w-3 h-3" /> MỐC GIỜ:
            </span>
            {quickTimes.map(qt => (
              <button
                key={qt.time}
                onClick={() => {
                  soundFx.playClick();
                  setSimulatedTime(qt.time);
                }}
                className={`text-[11px] font-mono px-2.5 py-1 rounded border transition-all ${
                  simulatedTime === qt.time
                    ? 'bg-[#FF6B35] text-black font-bold border-[#FF6B35] shadow-sm'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-[#FF6B35]/50 hover:text-[#FF6B35]'
                }`}
              >
                {qt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Main Active Activity Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Main active status column */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-start gap-4 sm:gap-5">
              
              {/* Animated emoji badge */}
              <div className="relative shrink-0">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center text-3xl sm:text-4xl shadow-xl transition-all ${
                  current
                    ? 'bg-white/5 border border-[#FF6B35]/60 glow-active'
                    : 'bg-white/5 border border-white/10 text-2xl'
                }`}>
                  {current ? current.emoji : '☕'}
                </div>
                {current && (
                  <div className="absolute -bottom-2 -right-1 px-1.5 py-0.2 bg-[#FF6B35] text-black text-[9px] font-mono font-bold rounded uppercase tracking-wider shadow">
                    ACTIVE
                  </div>
                )}
              </div>

              {/* Title, Time & Description */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold text-[#FF6B35] bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                    {current ? current.timeRange : currentTimeString}
                  </span>

                  {current && (
                    <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded border ${
                      CATEGORY_CONFIG[current.category]?.color || 'bg-white/5 text-white/70 border-white/10'
                    }`}>
                      {CATEGORY_CONFIG[current.category]?.label || current.category}
                    </span>
                  )}

                  {isDone && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> [ ĐÃ CHECK-IN ]
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif italic text-white tracking-tight break-words">
                  {current ? current.title : 'Thời Gian Tự Do & Nghỉ Ngơi'}
                </h2>

                <p className="text-xs sm:text-sm text-white/60 mt-1 line-clamp-2 font-light">
                  {current 
                    ? `Hoạt động rèn luyện mùa hè theo đúng thời gian biểu. Chú trọng chất lượng và trải nghiệm.` 
                    : 'Hiện không có hoạt động bắt buộc nào trong khung giờ này. Tự do thư giãn, đọc sách hoặc nạp năng lượng!'}
                </p>
              </div>
            </div>

            {/* Progress Bar & Countdown timer (Editorial Hairline) */}
            {current && (
              <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5 text-white/70 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>TIẾN ĐỘ: <strong className="text-white">{status.progressPercent}%</strong></span>
                  </div>
                  <span className="text-[#FF6B35] font-mono text-xs">
                    {status.minutesRemaining > 0 
                      ? `[ CÒN KHOẢNG ${status.minutesRemaining} PHÚT ]`
                      : '[ CHUẨN BỊ CHUYỂN HOẠT ĐỘNG ]'}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#D7263D] transition-all duration-700 ease-out"
                    style={{ width: `${Math.max(5, status.progressPercent)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Action column: Action Buttons & Next Activity Preview */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            
            {/* Complete Check-in Button */}
            {current && (
              <button
                id="btn-complete-current-activity"
                onClick={handleCelebrate}
                className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md text-xs uppercase tracking-wider font-mono ${
                  isDone
                    ? 'bg-emerald-700/80 text-white hover:bg-emerald-600 border border-emerald-500/50'
                    : 'bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-black shadow-lg shadow-[#FF6B35]/20 hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isDone ? '[ ĐÃ HOÀN THÀNH - BẤM ĐỔI ]' : '[ CHECK-IN HOÀN THÀNH ]'}
              </button>
            )}

            {/* Next activity preview box */}
            {next && (
              <div className="bg-white/5 rounded-lg p-3.5 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between text-[10px] text-white/50 mb-1.5 uppercase font-mono tracking-wider">
                  <span className="flex items-center gap-1 text-white/70">
                    <ArrowRight className="w-3 h-3 text-[#FF6B35]" /> TIẾP THEO:
                  </span>
                  <span className="font-mono text-[#FF6B35] font-bold">{next.startTime}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-white/5 flex items-center justify-center text-lg shrink-0 border border-white/10">
                    {next.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-serif italic text-white truncate">
                      {next.title}
                    </h4>
                    <p className="text-[11px] text-white/40 font-mono">
                      {next.timeRange}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
