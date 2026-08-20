import React from 'react';
import { 
  Sun, 
  Volume2, 
  VolumeX, 
  Printer, 
  BarChart3, 
  BookMarked, 
  Sparkles,
  Clock,
  RotateCcw
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  activeTab: 'schedule' | 'special' | 'diary' | 'stats';
  setActiveTab: (tab: 'schedule' | 'special' | 'diary' | 'stats') => void;
  currentTimeString: string;
  simulatedTime: string | null;
  setSimulatedTime: (time: string | null) => void;
  onOpenPrintModal: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentTimeString,
  simulatedTime,
  setSimulatedTime,
  onOpenPrintModal,
  soundEnabled,
  setSoundEnabled,
}) => {
  const handleToggleSound = () => {
    const nextState = soundFx.toggleSound();
    setSoundEnabled(nextState);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0C0C0C]/95 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name (Editorial Style) */}
          <div 
            id="brand-logo"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('schedule');
            }}
          >
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-[#FF6B35]">
                SOLARIS
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] font-light text-white/60">
                  SUMMER QUEST 2026
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#00FF41] hidden sm:block">
                  [ ACTIVE CHRONICLES ]
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Mode Tabs (Minimalist Editorial Underline/Pill Style) */}
          <div className="hidden md:flex items-center gap-1 border border-white/10 p-1 bg-[#111111] rounded-lg">
            <button
              id="nav-tab-schedule"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('schedule');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs tracking-wider uppercase transition-all ${
                activeTab === 'schedule'
                  ? 'bg-[#FF6B35] text-black font-bold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Lịch Tuần Năng Động
            </button>

            <button
              id="nav-tab-special"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('special');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs tracking-wider uppercase transition-all relative ${
                activeTab === 'special'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#D7263D] text-white font-bold shadow-sm'
                  : 'text-rose-300/80 hover:text-rose-200 hover:bg-white/5 font-medium'
              }`}
            >
              <span>🎡</span>
              Ngày Đặc Biệt
              <span className="w-1.5 h-1.5 bg-[#00FF41] rounded-full animate-ping" />
            </button>

            <button
              id="nav-tab-diary"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('diary');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs tracking-wider uppercase transition-all ${
                activeTab === 'diary'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              Nhật Ký Kỷ Niệm
            </button>

            <button
              id="nav-tab-stats"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('stats');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs tracking-wider uppercase transition-all ${
                activeTab === 'stats'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Cân Bằng Mùa Hè
            </button>
          </div>

          {/* Right Action Controls: Live Clock & Quick Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Clock Display & Simulation Indicator */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#111111] border border-white/10 rounded-lg text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-white/40">TIME</span>
                  <span className="font-mono font-bold text-[#FF6B35] text-xs">
                    {currentTimeString}
                  </span>
                </div>
                {simulatedTime ? (
                  <span className="text-[9px] text-[#FF6B35] font-mono uppercase">
                    [ SIMULATED ]
                  </span>
                ) : (
                  <span className="text-[9px] text-white/40 font-mono uppercase">
                    [ LIVE UTC+7 ]
                  </span>
                )}
              </div>

              {simulatedTime && (
                <button
                  onClick={() => setSimulatedTime(null)}
                  title="Quay lại giờ thực tế"
                  className="ml-1 p-1 hover:bg-white/10 text-white/60 hover:text-white rounded"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sound FX Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={handleToggleSound}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled 
                  ? 'bg-[#111111] text-[#FF6B35] border-[#FF6B35]/40 hover:bg-[#FF6B35]/10' 
                  : 'bg-[#111111] text-white/30 border-white/10 hover:text-white/60'
              }`}
              title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Print Timetable */}
            <button
              id="btn-print-timetable"
              onClick={() => {
                soundFx.playClick();
                onOpenPrintModal();
              }}
              className="p-2 bg-[#111111] hover:bg-white/5 border border-white/10 hover:border-white/30 text-white/90 hover:text-white rounded-lg transition-all flex items-center gap-1.5 text-xs font-mono tracking-wide"
              title="Xuất bảng thời gian biểu / In"
            >
              <Printer className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="hidden lg:inline text-[11px] uppercase tracking-wider">PRINT / PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-white/10">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('schedule');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold ${
              activeTab === 'schedule'
                ? 'bg-[#FF6B35] text-black font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sun className="w-3 h-3" />
            Lịch Tuần
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('special');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold ${
              activeTab === 'special'
                ? 'bg-[#D7263D] text-white font-bold'
                : 'text-rose-400 hover:text-rose-300'
            }`}
          >
            🎡 Đi Chơi
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('diary');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold ${
              activeTab === 'diary'
                ? 'bg-white text-black font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <BookMarked className="w-3 h-3" />
            Nhật Ký
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('stats');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold ${
              activeTab === 'stats'
                ? 'bg-white text-black font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3 h-3" />
            Thống Kê
          </button>
        </div>
      </div>
    </header>
  );
};
