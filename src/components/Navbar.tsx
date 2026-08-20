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
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            id="brand-logo"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('schedule');
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl">
                ☀️
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 tracking-tight text-xl sm:text-2xl font-display">
                  SUMMER QUEST
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  2026
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Lịch Trình Mùa Hè Rực Rỡ & Nhật Ký Phiêu Lưu
              </p>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="hidden md:flex items-center p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 shadow-inner">
            <button
              id="nav-tab-schedule"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('schedule');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'schedule'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Sun className="w-4 h-4" />
              Lịch Tuần Năng Động
            </button>

            <button
              id="nav-tab-special"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('special');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                activeTab === 'special'
                  ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold shadow-md shadow-pink-500/25'
                  : 'text-pink-300 hover:text-pink-100 hover:bg-pink-950/30'
              }`}
            >
              <span className="animate-spin text-base">🎡</span>
              Ngày Đi Chơi Đặc Biệt
              <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </button>

            <button
              id="nav-tab-diary"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('diary');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'diary'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookMarked className="w-4 h-4" />
              Nhật Ký Kỷ Niệm
            </button>

            <button
              id="nav-tab-stats"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('stats');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'stats'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Cân Bằng Mùa Hè
            </button>
          </div>

          {/* Right Action Controls: Live Clock & Quick Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Clock Display & Simulation Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <div className="flex flex-col text-left">
                <span className="font-mono font-bold text-amber-300 text-sm leading-none">
                  {currentTimeString}
                </span>
                {simulatedTime ? (
                  <span className="text-[10px] text-orange-400 font-medium leading-none mt-0.5">
                    (Giả lập)
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 leading-none mt-0.5">
                    Giờ thực tế
                  </span>
                )}
              </div>

              {simulatedTime && (
                <button
                  onClick={() => setSimulatedTime(null)}
                  title="Quay lại giờ thực tế"
                  className="ml-1 p-1 hover:bg-slate-700 text-slate-400 hover:text-white rounded"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sound FX Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={handleToggleSound}
              className={`p-2.5 rounded-xl border transition-all ${
                soundEnabled 
                  ? 'bg-slate-800 text-amber-400 border-amber-500/40 hover:bg-amber-500/10' 
                  : 'bg-slate-800/50 text-slate-500 border-slate-700 hover:text-slate-300'
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
              className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white rounded-xl transition-all shadow-sm flex items-center gap-1.5 text-xs font-semibold"
              title="Xuất bảng thời gian biểu / In"
            >
              <Printer className="w-4 h-4 text-sky-400" />
              <span className="hidden lg:inline">In Thời Khóa Biểu</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('schedule');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'schedule'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            Lịch Tuần
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('special');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'special'
                ? 'bg-pink-500 text-white font-bold'
                : 'text-pink-400 hover:text-pink-300'
            }`}
          >
            🎡 Đi Chơi
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('diary');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'diary'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            Kỷ Niệm
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('stats');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'stats'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Thống Kê
          </button>
        </div>
      </div>
    </header>
  );
};
