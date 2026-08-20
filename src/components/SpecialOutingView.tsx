import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  PackageCheck, 
  Camera, 
  Gift, 
  IceCream, 
  Compass, 
  Plus,
  Trash2,
  Trophy,
  Dices
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpecialOutingStep, PackingItem } from '../types';
import { soundFx } from '../utils/audio';

interface SpecialOutingViewProps {
  steps: SpecialOutingStep[];
  setSteps: React.Dispatch<React.SetStateAction<SpecialOutingStep[]>>;
  packingList: PackingItem[];
  setPackingList: React.Dispatch<React.SetStateAction<PackingItem[]>>;
  destination: string;
  setDestination: (dest: string) => void;
}

export const SpecialOutingView: React.FC<SpecialOutingViewProps> = ({
  steps,
  setSteps,
  packingList,
  setPackingList,
  destination,
  setDestination,
}) => {
  const [activeTab, setActiveTab] = useState<'quest' | 'packing' | 'places'>('quest');
  const [newPackingItem, setNewPackingItem] = useState('');
  const [customNoteStepId, setCustomNoteStepId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const completedStepsCount = steps.filter(s => s.completed).length;
  const questProgress = Math.round((completedStepsCount / steps.length) * 100);

  const completedPackingCount = packingList.filter(p => p.checked).length;
  const packingProgress = packingList.length > 0 ? Math.round((completedPackingCount / packingList.length) * 100) : 0;

  const popularDestinations = [
    { name: 'Công viên nước Đầm Sen', emoji: '🌊', type: 'Vui chơi bơi lội' },
    { name: 'Khu du lịch Suối Tiên', emoji: '🏰', type: 'Công viên văn hóa giải trí' },
    { name: 'VinWonders / Vinpearl Safari', emoji: '🦁', type: 'Thế giới hoang dã & trò chơi' },
    { name: 'Sun World Hạ Long / Ba Na Hills', emoji: '🚠', type: 'Cáp treo & Lâu đài' },
    { name: 'Biển Vũng Tàu / Nha Trang', emoji: '🏖️', type: 'Tắm biển ngắm hoàng hôn' },
    { name: 'Khu vui chơi bạt nhún Jump Arena', emoji: '🤸', type: 'Vận động siêu vui' },
    { name: 'Thảo Cầm Viên Sài Gòn', emoji: '🦒', type: 'Khám phá thiên nhiên' },
    { name: 'Khu cắm trại dã ngoại ngoại ô', emoji: '⛺', type: 'BBQ & Lửa trại' },
  ];

  const handleToggleStep = (stepId: string) => {
    soundFx.playCheck();
    setSteps(prev => {
      const next = prev.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s);
      const allDone = next.every(s => s.completed);
      if (allDone) {
        soundFx.playVictory();
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
          });
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const handleTogglePacking = (id: string) => {
    soundFx.playClick();
    setPackingList(prev => prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  };

  const handleAddPacking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackingItem.trim()) return;
    soundFx.playClick();
    const newItem: PackingItem = {
      id: 'pk-' + Date.now(),
      name: newPackingItem.trim(),
      category: 'must-have',
      emoji: '🎒',
      checked: false,
    };
    setPackingList(prev => [...prev, newItem]);
    setNewPackingItem('');
  };

  const handleDeletePacking = (id: string) => {
    soundFx.playClick();
    setPackingList(prev => prev.filter(p => p.id !== id));
  };

  const handlePickRandomPlace = () => {
    soundFx.playChime();
    const randomIndex = Math.floor(Math.random() * popularDestinations.length);
    const chosen = popularDestinations[randomIndex];
    setDestination(`${chosen.emoji} ${chosen.name}`);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const handleSaveStepNote = (stepId: string) => {
    soundFx.playClick();
    setSteps(prev => prev.map(s => s.id === stepId ? { ...s, notes: noteText } : s));
    setCustomNoteStepId(null);
    setNoteText('');
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Hero Banner for Special Outing (Editorial Spotlight) */}
      <div className="relative overflow-hidden rounded-xl bg-[#111111] border border-white/10 p-6 sm:p-8 shadow-2xl">
        {/* Subtle Watermark */}
        <div className="absolute right-4 top-2 opacity-5 pointer-events-none select-none font-serif italic text-9xl font-black">
          EXPEDITION
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/30 text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-2.5">
              <Sparkles className="w-3 h-3" /> [ SPECIAL EXPEDITION 2026 ]
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              NGÀY ĐẶC BIỆT – ĐI CHƠI SIÊU VUI
            </h1>

            <p className="text-xs sm:text-sm text-white/60 mt-2 font-light max-w-xl">
              Thời gian linh hoạt theo địa điểm và kế hoạch. Chinh phục trọn vẹn 11 chặng trải nghiệm từ sáng sớm tới tối mịt!
            </p>

            {/* Selected Destination Tag */}
            <div className="mt-4 flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-2 bg-black/60 px-3.5 py-2 rounded-lg border border-white/10 text-white text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span className="text-white/50">ĐỊA ĐIỂM:</span> <span className="text-white font-bold">{destination || 'Chưa chọn địa điểm'}</span>
              </div>

              <button
                onClick={handlePickRandomPlace}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 hover:text-white font-mono text-xs transition-all uppercase tracking-wider"
              >
                <Dices className="w-3.5 h-3.5 text-[#FF6B35]" /> Quay Chọn Ngẫu Nhiên
              </button>
            </div>
          </div>

          {/* Progress gauge card */}
          <div className="w-full md:w-auto flex-shrink-0 bg-black/50 rounded-xl p-4 sm:p-5 border border-white/10 flex flex-col gap-2 min-w-[220px]">
            <div className="flex items-center justify-between text-xs text-white/70 font-mono">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#FF6B35]" /> TIẾN ĐỘ:
              </span>
              <span className="text-[#00FF41] font-bold text-sm">{questProgress}%</span>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#00FF41] transition-all duration-500"
                style={{ width: `${questProgress}%` }}
              />
            </div>

            <p className="text-[10px] font-mono text-white/40 text-right">
              Đã hoàn tất {completedStepsCount}/{steps.length} chặng
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="relative z-10 flex items-center gap-2 mt-6 border-t border-white/10 pt-4 overflow-x-auto">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('quest');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all border ${
              activeTab === 'quest'
                ? 'bg-[#FF6B35] text-black font-bold border-[#FF6B35] shadow-sm'
                : 'bg-white/5 text-white/70 hover:text-white border-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> 11 Chặng Hành Trình ({completedStepsCount}/11)
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('packing');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all border ${
              activeTab === 'packing'
                ? 'bg-white text-black font-bold border-white shadow-sm'
                : 'bg-white/5 text-white/70 hover:text-white border-white/10'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" /> Balo Chuẩn Bị Đồ ({completedPackingCount}/{packingList.length})
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('places');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all border ${
              activeTab === 'places'
                ? 'bg-white text-black font-bold border-white shadow-sm'
                : 'bg-white/5 text-white/70 hover:text-white border-white/10'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" /> Gợi Ý Địa Điểm Đi Chơi
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'quest' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-base font-serif italic text-white flex items-center gap-2">
              <span>🗺️</span> Bản Đồ 11 Chặng Trải Nghiệm Mùa Hè
            </h3>
            <span className="text-[11px] font-mono text-white/40">
              Nhấn vào từng chặng để check-in hoàn tất
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {steps.map((step) => {
              return (
                <div
                  key={step.id}
                  id={`step-card-${step.id}`}
                  className={`group rounded-xl border transition-all duration-300 p-4 sm:p-5 relative ${
                    step.completed
                      ? 'bg-[#111111]/60 border-white/5 opacity-60'
                      : 'bg-[#111111] hover:bg-white/5 border-white/10 hover:border-white/20 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    
                    {/* Left Checkbox & Number */}
                    <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                      <button
                        onClick={() => handleToggleStep(step.id)}
                        className={`w-7 h-7 rounded flex items-center justify-center border transition-all shrink-0 mt-0.5 ${
                          step.completed
                            ? 'bg-[#00FF41] text-black border-[#00FF41] font-bold shadow-md'
                            : 'border-white/20 hover:border-[#FF6B35] bg-black/40 text-transparent hover:text-white/40'
                        }`}
                        title={step.completed ? 'Đã hoàn thành chặng này' : 'Check-in hoàn thành'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      {/* Emoji Stamp */}
                      <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-2xl shrink-0 ${
                        step.completed
                          ? 'bg-white/5 border border-white/10 text-white/50'
                          : 'bg-white/5 border border-white/10 text-white'
                      }`}>
                        {step.emoji}
                      </div>

                      {/* Step details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#FF6B35]">
                            CHẶNG {step.stepNumber}/11
                          </span>
                          {step.suggestedTime && (
                            <span className="text-[11px] font-mono text-white/50">
                              🕒 {step.suggestedTime}
                            </span>
                          )}
                          {step.completed && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30">
                              [ ĐÃ TRẢI NGHIỆM ]
                            </span>
                          )}
                        </div>

                        <h4 className={`text-base sm:text-lg font-serif italic tracking-tight ${
                          step.completed ? 'line-through text-white/40' : 'text-white'
                        }`}>
                          {step.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-white/60 mt-1 font-light">
                          {step.detail}
                        </p>

                        {/* Custom note or memory */}
                        {step.notes && (
                          <div className="mt-2.5 p-2.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white/80">
                            <span className="font-bold text-[#FF6B35]">✦ Ghi chú: </span>
                            {step.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Note Button */}
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCustomNoteStepId(step.id);
                        setNoteText(step.notes || '');
                      }}
                      className="p-2 text-white/40 hover:text-[#FF6B35] hover:bg-white/5 rounded-lg transition-all shrink-0 border border-transparent hover:border-white/10"
                      title="Viết cảm nghĩ cho chặng này"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Note Editing form */}
                  {customNoteStepId === step.id && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                      <label className="text-xs font-mono text-[#FF6B35]">
                        Viết kỷ niệm hoặc ghi chú cho chặng: {step.title}
                      </label>
                      <input
                        type="text"
                        value={noteText}
                        onChange={e => setNoteText(e.target.value)}
                        placeholder="Ví dụ: Ăn kem ốc quế socola siêu ngon, chụp được 10 tấm ảnh..."
                        className="w-full bg-black/60 border border-white/15 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B35]"
                      />
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => setCustomNoteStepId(null)}
                          className="px-3 py-1 text-xs text-white/50 hover:text-white font-mono"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={() => handleSaveStepNote(step.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#FF6B35] text-black font-bold text-xs font-mono uppercase hover:bg-[#FF6B35]/90"
                        >
                          Lưu Kỷ Niệm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Packing Checklist Tab */}
      {activeTab === 'packing' && (
        <div className="bg-[#111111] rounded-xl border border-white/10 p-6 shadow-xl flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-serif italic text-white flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-[#FF6B35]" /> Balo Chuẩn Bị Đồ Cho Ngày Đi Chơi
              </h3>
              <p className="text-xs text-white/50 mt-0.5 font-light">
                Kiểm tra đầy đủ các vật dụng cần thiết trước khi xuất phát để chuyến đi trọn vẹn nhất!
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-mono">
              ĐÃ SOẠN: <strong className="text-[#00FF41]">{completedPackingCount}/{packingList.length} ({packingProgress}%)</strong>
            </div>
          </div>

          {/* Add custom item form */}
          <form onSubmit={handleAddPacking} className="flex gap-2">
            <input
              type="text"
              value={newPackingItem}
              onChange={e => setNewPackingItem(e.target.value)}
              placeholder="Thêm món đồ cần mang theo (Ví dụ: Thẻ học sinh, áo mưa, tai nghe...)"
              className="flex-1 bg-black/60 border border-white/15 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B35]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm
            </button>
          </form>

          {/* List of items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {packingList.map(item => (
              <div
                key={item.id}
                onClick={() => handleTogglePacking(item.id)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  item.checked
                    ? 'bg-black/40 border-white/5 text-white/40'
                    : 'bg-black/60 border-white/10 hover:border-white/20 text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border text-[10px] ${
                    item.checked
                      ? 'bg-[#00FF41] text-black border-[#00FF41] font-bold'
                      : 'border-white/20 bg-black/40'
                  }`}>
                    {item.checked && '✓'}
                  </div>

                  <span className="text-xl">{item.emoji}</span>

                  <span className={`text-xs font-mono truncate ${item.checked ? 'line-through text-white/40' : 'text-white'}`}>
                    {item.name}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePacking(item.id);
                  }}
                  className="p-1.5 text-white/30 hover:text-rose-400 hover:bg-white/5 rounded transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Outing Places Tab */}
      {activeTab === 'places' && (
        <div className="bg-[#111111] rounded-xl border border-white/10 p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-serif italic text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#FF6B35]" /> Gợi Ý Các Điểm Đến Mùa Hè Cực Hấp Dẫn
              </h3>
              <p className="text-xs text-white/50 mt-0.5 font-light">
                Bấm chọn địa điểm yêu thích để tự động ghim vào kế hoạch của Ngày Đặc Biệt!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularDestinations.map(dest => {
              const isCurrent = destination.includes(dest.name);
              return (
                <div
                  key={dest.name}
                  onClick={() => {
                    soundFx.playChime();
                    setDestination(`${dest.emoji} ${dest.name}`);
                  }}
                  className={`p-5 rounded-lg border transition-all cursor-pointer flex flex-col items-start gap-2 text-left ${
                    isCurrent
                      ? 'bg-white/5 border-[#FF6B35] shadow-lg ring-1 ring-[#FF6B35]'
                      : 'bg-black/60 hover:bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="text-3xl mb-1">{dest.emoji}</span>
                  <h4 className="text-sm font-serif italic text-white">
                    {dest.name}
                  </h4>
                  <span className="text-[11px] text-white/50 font-mono">
                    {dest.type}
                  </span>

                  {isCurrent && (
                    <span className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FF6B35] text-black uppercase">
                      [ ĐANG CHỌN ]
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
