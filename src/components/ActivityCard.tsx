import React from 'react';
import { Check, Clock, Edit3, Sparkles } from 'lucide-react';
import { ScheduleItem } from '../types';
import { CATEGORY_CONFIG } from '../data/defaultSchedule';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ActivityCardProps {
  item: ScheduleItem;
  isActive: boolean;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onEdit: (item: ScheduleItem) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  item,
  isActive,
  isCompleted,
  onToggleComplete,
  onEdit,
}) => {
  const categoryMeta = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.relax;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playCheck();
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#FF6B35', '#00FF41', '#FFFFFF'],
        });
      } catch {
        // ignore
      }
    }
    onToggleComplete(item.id);
  };

  return (
    <div
      id={`activity-card-${item.id}`}
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 p-4 sm:p-5 flex items-center justify-between gap-4 ${
        isActive
          ? 'bg-white/5 border-[#FF6B35] shadow-xl ring-1 ring-[#FF6B35]/50'
          : isCompleted
          ? 'bg-[#111111]/60 border-white/5 opacity-60'
          : 'bg-[#111111] hover:bg-white/5 border-white/10 hover:border-white/20 shadow-sm'
      }`}
    >
      {/* Left indicator bar for active item */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6B35] shadow-sm shadow-[#FF6B35]" />
      )}

      {/* Main Content Info */}
      <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0 flex-1">
        
        {/* Checkbox */}
        <button
          onClick={handleCheckboxClick}
          className={`w-7 h-7 rounded flex items-center justify-center border transition-all shrink-0 ${
            isCompleted
              ? 'bg-[#00FF41] text-black border-[#00FF41] font-bold shadow-md shadow-[#00FF41]/20'
              : 'border-white/20 hover:border-[#FF6B35] bg-black/40 text-transparent hover:text-white/40'
          }`}
          title={isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Emoji Badge */}
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-2xl shrink-0 ${
          isActive 
            ? 'bg-white/10 border border-[#FF6B35]/50 text-white' 
            : 'bg-white/5 border border-white/10 text-white/80'
        }`}>
          {item.emoji}
        </div>

        {/* Title, Time, Category */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#FF6B35] bg-white/5 px-2 py-0.5 rounded border border-white/10">
              <Clock className="w-3 h-3 text-[#FF6B35]" />
              {item.timeRange}
            </span>

            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${categoryMeta.color}`}>
              {categoryMeta.label}
            </span>

            {isActive && (
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF6B35] text-black flex items-center gap-1 shadow-sm">
                <Sparkles className="w-2.5 h-2.5" /> [ ĐANG CHẠY ]
              </span>
            )}
          </div>

          <h3 className={`text-base sm:text-lg font-serif italic tracking-tight truncate ${
            isCompleted 
              ? 'line-through text-white/40' 
              : isActive 
              ? 'text-white font-bold' 
              : 'text-white'
          }`}>
            {item.title}
          </h3>

          {item.notes && (
            <p className="text-xs text-white/50 mt-1 italic font-serif line-clamp-1">
              ✦ {item.notes}
            </p>
          )}
        </div>
      </div>

      {/* Right controls: Quick Edit */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => {
            soundFx.playClick();
            onEdit(item);
          }}
          className="p-2 text-white/40 hover:text-[#FF6B35] hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all"
          title="Chỉnh sửa hoặc thêm ghi chú cho mục này"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
