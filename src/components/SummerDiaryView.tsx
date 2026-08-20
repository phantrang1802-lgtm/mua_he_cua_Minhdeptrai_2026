import React, { useState } from 'react';
import { 
  BookMarked, 
  Plus, 
  Sparkles, 
  Trash2, 
  Heart, 
  Smile, 
  Calendar,
  Tag
} from 'lucide-react';
import { SummerMemory } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface SummerDiaryViewProps {
  memories: SummerMemory[];
  setMemories: React.Dispatch<React.SetStateAction<SummerMemory[]>>;
}

export const SummerDiaryView: React.FC<SummerDiaryViewProps> = ({
  memories,
  setMemories,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dayName, setDayName] = useState('Thứ Sáu');
  const [mood, setMood] = useState<SummerMemory['mood']>('🔥 Siêu vui');
  const [tagInput, setTagInput] = useState('Kỷ niệm, Mùa hè');

  const moods: SummerMemory['mood'][] = [
    '🔥 Siêu vui',
    '🌟 Đáng nhớ',
    '⚡ Hăng say',
    '🌊 Thư giãn',
    '🏆 Chiến thắng',
  ];

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    soundFx.playChime();
    const newMem: SummerMemory = {
      id: 'mem-' + Date.now(),
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      dayName,
      title: title.trim(),
      content: content.trim(),
      emoji: mood.split(' ')[0] || '✨',
      mood,
      tags: tagInput.split(',').map(t => t.trim()).filter(Boolean),
    };

    setMemories(prev => [newMem, ...prev]);
    setIsAdding(false);
    setTitle('');
    setContent('');

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

  const handleDeleteMemory = (id: string) => {
    soundFx.playClick();
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111111] rounded-xl border border-white/10 p-6 shadow-xl relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute right-4 top-2 opacity-5 pointer-events-none select-none font-serif italic text-8xl font-black">
          MEMORIES
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6B35]">
              [ SUMMER ARCHIVES 2026 ]
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
            NHẬT KÝ KỶ NIỆM MÙA HÈ
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-light mt-1">
            Lưu giữ những khoảnh khắc bùng nổ, kỷ lục đá bóng, buổi bơi biển và niềm vui gia đình
          </p>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            setIsAdding(!isAdding);
          }}
          className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-md transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          {isAdding ? 'Đóng Biểu Mẫu' : 'Viết Kỷ Niệm Mới'}
        </button>
      </div>

      {/* Add Memory Form */}
      {isAdding && (
        <form onSubmit={handleSaveMemory} className="bg-[#111111] rounded-xl border border-[#FF6B35]/40 p-6 shadow-2xl flex flex-col gap-4">
          <h3 className="text-lg font-serif italic text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF6B35]" /> Viết Nhật Ký Khoảnh Khắc Mùa Hè
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
                Tiêu đề khoảnh khắc:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ví dụ: Cú sút phạt thành bàn tuyệt đẹp..."
                className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B35]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
                Ngày trong tuần:
              </label>
              <select
                value={dayName}
                onChange={e => setDayName(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B35]"
              >
                <option value="Thứ Hai">Thứ Hai</option>
                <option value="Thứ Ba">Thứ Ba</option>
                <option value="Thứ Tư">Thứ Tư</option>
                <option value="Thứ Năm">Thứ Năm</option>
                <option value="Thứ Sáu">Thứ Sáu</option>
                <option value="Thứ Bảy">Thứ Bảy</option>
                <option value="Chủ Nhật">Chủ Nhật</option>
                <option value="🎡 Ngày Đi Chơi Đặc Biệt">🎡 Ngày Đi Chơi Đặc Biệt</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
              Cảm xúc & Tâm trạng:
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map(m => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMood(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                    mood === m
                      ? 'bg-[#FF6B35] text-black font-bold border-[#FF6B35] shadow-md'
                      : 'bg-black/40 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
              Nội dung nhật ký:
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Kể lại điều thú vị nhất bạn đã trải qua trong ngày..."
              className="w-full bg-black/60 border border-white/15 rounded-lg p-4 text-xs text-white focus:outline-none focus:border-[#FF6B35]"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
              Thẻ / Tags (ngăn cách bởi dấu phẩy):
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              placeholder="Bóng đá, Bạn bè, Thư viện..."
              className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B35]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs font-mono text-white/50 hover:text-white"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-black font-mono font-bold text-xs uppercase shadow-md"
            >
              Lưu Vào Nhật Ký
            </button>
          </div>
        </form>
      )}

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {memories.map(mem => (
          <div
            key={mem.id}
            className="bg-[#111111] hover:bg-white/5 rounded-xl border border-white/10 p-5 sm:p-6 shadow-lg flex flex-col justify-between gap-4 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{mem.emoji}</span>
                  <span className="px-2.5 py-0.5 rounded bg-white/5 text-[#FF6B35] border border-white/10 text-xs font-mono">
                    {mem.mood}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                  <span>{mem.dayName}</span>
                  <button
                    onClick={() => handleDeleteMemory(mem.id)}
                    className="p-1 text-white/30 hover:text-rose-400 rounded transition-all"
                    title="Xóa kỷ niệm này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-lg font-serif italic text-white mb-2">
                {mem.title}
              </h4>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                {mem.content}
              </p>
            </div>

            {/* Tags footer */}
            <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-white/10">
              {mem.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-black/50 text-white/50 text-[10px] font-mono border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
