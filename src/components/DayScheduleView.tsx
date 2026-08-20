import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  RotateCcw, 
  CheckCircle, 
  Sparkles, 
  Calendar, 
  Flame,
  Award
} from 'lucide-react';
import { DaySchedule, ScheduleItem, ActivityCategory } from '../types';
import { ActivityCard } from './ActivityCard';
import { soundFx } from '../utils/audio';
import { CATEGORY_CONFIG } from '../data/defaultSchedule';

interface DayScheduleViewProps {
  schedules: DaySchedule[];
  selectedDayId: string;
  setSelectedDayId: (id: string) => void;
  activeActivityId: string | null;
  completedIds: Set<string>;
  onToggleComplete: (id: string) => void;
  onEditActivity: (item: ScheduleItem) => void;
  onAddActivity: (dayId: string) => void;
  onResetDay: (dayId: string) => void;
}

export const DayScheduleView: React.FC<DayScheduleViewProps> = ({
  schedules,
  selectedDayId,
  setSelectedDayId,
  activeActivityId,
  completedIds,
  onToggleComplete,
  onEditActivity,
  onAddActivity,
  onResetDay,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const currentDay = schedules.find(s => s.id === selectedDayId) || schedules[0];

  // Calculate day completion
  const totalInDay = currentDay.items.length;
  const completedInDay = currentDay.items.filter(it => completedIds.has(it.id)).length;
  const progressPercent = totalInDay > 0 ? Math.round((completedInDay / totalInDay) * 100) : 0;

  // Filter items
  const filteredItems = currentDay.items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm.trim() === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.timeRange.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const categories: { id: string; label: string; emoji: string }[] = [
    { id: 'all', label: 'TẤT CẢ HOẠT ĐỘNG', emoji: '✦' },
    { id: 'study', label: 'HỌC TẬP & TRÍ TUỆ', emoji: '📚' },
    { id: 'sports', label: 'THỂ THAO & VẬN ĐỘNG', emoji: '⚽' },
    { id: 'meal', label: 'ĂN UỐNG & DINH DƯỠNG', emoji: '🍳' },
    { id: 'family', label: 'GIA ĐÌNH & GẮN KẾT', emoji: '👨‍👩‍👦' },
    { id: 'relax', label: 'NGHỈ NGƠI & GIẢI TRÍ', emoji: '😴' },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Day Selector (Editorial Weekly Routine Header) */}
      <div className="border border-white/10 bg-[#111111] p-4 sm:p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#FF6B35] font-bold">
              WEEKLY ROUTINE
            </span>
            <span className="text-[10px] uppercase font-mono text-white/40">
              [ 7 DAYS MATRIX ]
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/50">
            CHỌN NGÀY TRONG TUẦN
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {schedules.map(day => {
            const isSelected = day.id === selectedDayId;
            const dayCompleted = day.items.filter(it => completedIds.has(it.id)).length;
            const dayTotal = day.items.length;

            return (
              <button
                key={day.id}
                id={`day-tab-${day.id}`}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedDayId(day.id);
                }}
                className={`flex flex-col items-start p-3 rounded-lg border transition-all text-left group relative ${
                  isSelected
                    ? 'bg-white/5 border-[#FF6B35] text-white shadow-lg'
                    : 'bg-[#0C0C0C]/60 hover:bg-white/5 border-white/10 text-white/70 hover:text-white'
                }`}
              >
                <div className="flex items-baseline justify-between w-full mb-1">
                  <span className={`text-lg sm:text-xl font-serif italic ${isSelected ? 'text-white font-bold' : 'text-white/80 group-hover:text-white'}`}>
                    {day.name}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">
                    {dayCompleted}/{dayTotal}
                  </span>
                </div>

                <span className="text-[10px] uppercase tracking-wider text-white/40 line-clamp-1 mb-2 font-mono">
                  {day.badge}
                </span>

                {/* Hairline underline indicator */}
                <div className={`h-[2px] w-full transition-all ${
                  isSelected ? 'bg-[#FF6B35]' : 'bg-white/10 group-hover:bg-white/30'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Day Banner Details & Actions */}
      <div className="bg-[#111111] rounded-xl border border-white/10 p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Subtle Watermark */}
        <div className="absolute right-4 top-2 opacity-5 pointer-events-none select-none font-serif italic text-8xl font-black">
          {currentDay.name}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6B35]">
                [ SELECTED CHRONICLE ]
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
              {currentDay.fullTitle}
            </h2>
            <p className="text-xs sm:text-sm text-white/50 font-light mt-1">
              {currentDay.tagline}
            </p>
          </div>

          {/* Day summary badges & Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white/70">
              <Award className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>TIẾN ĐỘ: <strong className="text-[#00FF41]">{progressPercent}%</strong></span>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onAddActivity(currentDay.id);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-black text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md shadow-[#FF6B35]/20"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" /> Thêm Hoạt Động
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onResetDay(currentDay.id);
              }}
              className="p-2 rounded-lg bg-black/50 hover:bg-white/10 text-white/40 hover:text-white border border-white/10 transition-all text-xs"
              title="Đặt lại lịch gốc ban đầu của ngày này"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono tracking-wider whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-bold border-white shadow-sm'
                  : 'bg-white/5 text-white/60 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="flex flex-col gap-3">
        {filteredItems.length === 0 ? (
          <div className="bg-[#111111] rounded-xl border border-white/10 p-12 text-center flex flex-col items-center justify-center">
            <span className="text-4xl mb-3 opacity-40">✦</span>
            <h4 className="text-lg font-serif italic text-white mb-1">Không tìm thấy hoạt động nào</h4>
            <p className="text-xs text-white/50 max-w-md font-mono">
              Hãy thử chọn danh mục khác hoặc bấm nút "Thêm Hoạt Động" để tạo thêm lịch trình mới cho ngày này.
            </p>
          </div>
        ) : (
          filteredItems.map(item => (
            <ActivityCard
              key={item.id}
              item={item}
              isActive={item.id === activeActivityId}
              isCompleted={completedIds.has(item.id)}
              onToggleComplete={onToggleComplete}
              onEdit={onEditActivity}
            />
          ))
        )}
      </div>

      {/* Editorial Quote Insight Footer */}
      <div className="mt-4 p-6 rounded-xl border border-white/10 bg-[#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-1 font-mono">
            CURRENT INSIGHT
          </h3>
          <p className="text-sm italic font-serif text-white/80 max-w-lg">
            'Mùa hè không chỉ là nghỉ ngơi, mà là hành trình kiến tạo những thói quen mới và tích lũy năng lượng sống.'
          </p>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF6B35] border border-[#FF6B35]/30 px-3 py-1.5 rounded">
          STAY GOLD. STAY WILD.
        </div>
      </div>

    </div>
  );
};
