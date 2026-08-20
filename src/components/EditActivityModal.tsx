import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Clock, Sparkles } from 'lucide-react';
import { ScheduleItem, ActivityCategory } from '../types';
import { CATEGORY_CONFIG } from '../data/defaultSchedule';
import { soundFx } from '../utils/audio';

interface EditActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ScheduleItem | null;
  dayId: string;
  onSave: (dayId: string, item: ScheduleItem) => void;
  onDelete?: (dayId: string, itemId: string) => void;
}

export const EditActivityModal: React.FC<EditActivityModalProps> = ({
  isOpen,
  onClose,
  item,
  dayId,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:30');
  const [emoji, setEmoji] = useState('⚽');
  const [category, setCategory] = useState<ActivityCategory>('study');
  const [notes, setNotes] = useState('');

  const commonEmojis = [
    '🍳', '📺', '➗', '📚', '🍚', '😴', '✍️', '🍽️', '🇬🇧', '📖', 
    '🚲', '🏀', '⚽', '👦', '🍜', '💻', '😎', '👬', '🏖️', '🔬', 
    '🎮', '♟️', '☕', '👨‍👩‍👦', '🎡', '🍦', '📸', '🎁', '🚗', '🛏️'
  ];

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setStartTime(item.startTime || '08:00');
      setEndTime(item.endTime || '09:00');
      setEmoji(item.emoji || '✨');
      setCategory(item.category || 'study');
      setNotes(item.notes || '');
    } else {
      setTitle('');
      setStartTime('14:30');
      setEndTime('16:00');
      setEmoji('⚽');
      setCategory('sports');
      setNotes('');
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    soundFx.playChime();
    const newItem: ScheduleItem = {
      id: item ? item.id : 'act-' + Date.now(),
      timeRange: `${startTime} – ${endTime}`,
      startTime,
      endTime,
      emoji,
      title: title.trim(),
      category,
      notes: notes.trim() || undefined,
      completed: item ? item.completed : false,
    };

    onSave(dayId, newItem);
    onClose();
  };

  const handleDelete = () => {
    if (item && onDelete) {
      soundFx.playClick();
      onDelete(dayId, item.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#111111] border border-white/15 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF6B35] block">
                [ SCHEDULE CONFIGURATION ]
              </span>
              <h3 className="text-base sm:text-lg font-serif italic text-white">
                {item ? 'Chỉnh Sửa Hoạt Động' : 'Thêm Hoạt Động Mới'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-4 flex-1">
          
          {/* Title */}
          <div>
            <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
              Tên hoạt động:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ví dụ: Học thêm Toán, Đá banh, Đi thư viện..."
              className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B35]"
            />
          </div>

          {/* Time Picker Start & End */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
                Giờ bắt đầu:
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B35] font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
                Giờ kết thúc:
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B35] font-mono"
              />
            </div>
          </div>

          {/* Emoji Grid Selector */}
          <div>
            <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
              Chọn biểu tượng (Emoji):
            </label>
            <div className="flex flex-wrap gap-2 p-2.5 bg-black/40 rounded-lg border border-white/10 max-h-32 overflow-y-auto">
              {commonEmojis.map(em => (
                <button
                  type="button"
                  key={em}
                  onClick={() => setEmoji(em)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-base transition-all ${
                    emoji === em
                      ? 'bg-[#FF6B35] text-black scale-105 shadow-sm font-bold'
                      : 'hover:bg-white/5 text-white/80'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
              Phân loại:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(CATEGORY_CONFIG) as ActivityCategory[]).map(catKey => {
                const config = CATEGORY_CONFIG[catKey];
                const isSelected = category === catKey;
                return (
                  <button
                    type="button"
                    key={catKey}
                    onClick={() => setCategory(catKey)}
                    className={`p-2 rounded-lg text-xs font-mono border transition-all text-left uppercase ${
                      isSelected
                        ? 'bg-[#FF6B35] border-[#FF6B35] text-black font-bold shadow-sm'
                        : 'bg-black/40 border-white/10 text-white/60 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Note */}
          <div>
            <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
              Ghi chú thêm (Tùy chọn):
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Ví dụ: Mang theo sách bài tập, mang chai nước..."
              className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B35]"
            />
          </div>

          {/* Action buttons footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
            {item ? (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-rose-400 hover:bg-rose-950/30 rounded-lg transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa mục này
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs font-mono text-white/50 hover:text-white"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-black font-mono font-bold text-xs uppercase shadow-md"
              >
                <Save className="w-3.5 h-3.5" /> Lưu Lại
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
