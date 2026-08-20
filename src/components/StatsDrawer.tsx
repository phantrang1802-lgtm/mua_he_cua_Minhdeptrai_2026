import React from 'react';
import { 
  BarChart3, 
  Flame, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  Activity, 
  Heart, 
  Smile, 
  Utensils, 
  Award,
  Zap
} from 'lucide-react';
import { DaySchedule } from '../types';
import { calculateWeeklyStats } from '../utils/timeHelpers';

interface StatsDrawerProps {
  schedules: DaySchedule[];
  completedCount: number;
}

export const StatsDrawer: React.FC<StatsDrawerProps> = ({ schedules, completedCount }) => {
  const stats = calculateWeeklyStats(schedules);

  const achievements = [
    {
      id: 'ach-1',
      title: 'Vua Sân Cỏ & Thể Thao',
      desc: 'Hơn 12 giờ vận động mỗi tuần (Bóng đá, Bóng rổ, Đạp xe, Bơi biển)',
      emoji: '⚽',
      code: 'ATHLETICS_MASTERY',
      unlocked: true,
    },
    {
      id: 'ach-2',
      title: 'Bác Học Toàn Năng',
      desc: 'Toán, Văn, Tiếng Anh, STEM, Tin học và Đấu trí Cờ vua siêu nhạy bén',
      emoji: '🧠',
      code: 'ACADEMIC_EXCELLENCE',
      unlocked: true,
    },
    {
      id: 'ach-3',
      title: 'Sóng Biển Rực Rỡ',
      desc: 'Tắm biển chiều thứ Sáu & Dã ngoại công viên ngày đặc biệt',
      emoji: '🏖️',
      code: 'COASTAL_EXPEDITION',
      unlocked: true,
    },
    {
      id: 'ach-4',
      title: 'Gia Đình Là Số 1',
      desc: 'Trọn vẹn các bữa cơm ấm cúng, cà phê sáng chủ nhật & thăm em họ',
      emoji: '💖',
      code: 'FAMILY_BONDING',
      unlocked: true,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Overview Stats Header */}
      <div className="bg-[#111111] rounded-xl border border-white/10 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute right-4 top-2 opacity-5 pointer-events-none select-none font-serif italic text-8xl font-black">
          METRICS
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6B35]">
                [ SYSTEM BALANCE & ANALYTICS ]
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
              BẢNG CÂN BẰNG MÙA HÈ
            </h2>
            <p className="text-xs sm:text-sm text-white/50 font-light mt-1">
              Phân bổ thời gian khoa học giữa rèn luyện trí tuệ, thể chất dẻo dai và sum họp gia đình
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/60 px-5 py-3 rounded-lg border border-white/10">
            <Zap className="w-5 h-5 text-[#00FF41] fill-[#00FF41]" />
            <div>
              <div className="text-[10px] text-white/40 uppercase font-mono tracking-wider">ĐÃ CHECK-IN</div>
              <div className="text-lg font-mono font-bold text-[#00FF41]">{completedCount} hoạt động</div>
            </div>
          </div>
        </div>

        {/* 4 Major Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 relative z-10">
          
          {/* Study */}
          <div className="bg-black/40 rounded-lg p-5 border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">📚</span>
              <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-[#FF6B35] border border-white/10">
                Trí Tuệ
              </span>
            </div>
            <div>
              <div className="text-3xl font-serif italic text-white">{stats.studyHours} <span className="text-xs font-mono text-white/40">giờ/tuần</span></div>
              <p className="text-[11px] text-white/50 font-light mt-1">Toán, Văn, Anh, STEM, Cờ Vua, Tin học</p>
            </div>
          </div>

          {/* Sports */}
          <div className="bg-black/40 rounded-lg p-5 border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">⚽</span>
              <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-[#00FF41] border border-white/10">
                Thể Lực
              </span>
            </div>
            <div>
              <div className="text-3xl font-serif italic text-white">{stats.sportsHours} <span className="text-xs font-mono text-white/40">giờ/tuần</span></div>
              <p className="text-[11px] text-white/50 font-light mt-1">Bóng đá, Bóng rổ, Đạp xe, Tắm biển</p>
            </div>
          </div>

          {/* Family */}
          <div className="bg-black/40 rounded-lg p-5 border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">💖</span>
              <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-rose-400 border border-white/10">
                Tình Thân
              </span>
            </div>
            <div>
              <div className="text-3xl font-serif italic text-white">{stats.familyHours} <span className="text-xs font-mono text-white/40">giờ/tuần</span></div>
              <p className="text-[11px] text-white/50 font-light mt-1">Cơm gia đình, Cà phê, Bạn xóm & Em họ</p>
            </div>
          </div>

          {/* Relax & Meals */}
          <div className="bg-black/40 rounded-lg p-5 border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🍿</span>
              <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-purple-400 border border-white/10">
                Thư Giãn
              </span>
            </div>
            <div>
              <div className="text-3xl font-serif italic text-white">{stats.relaxHours} <span className="text-xs font-mono text-white/40">giờ/tuần</span></div>
              <p className="text-[11px] text-white/50 font-light mt-1">Xem phim, chơi game, nghỉ ngơi lấy sức</p>
            </div>
          </div>

        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-[#111111] rounded-xl border border-white/10 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FF6B35]" />
            <h3 className="text-lg font-serif italic text-white">
              Danh Hiệu & Huy Hiệu Mùa Hè Rực Rỡ
            </h3>
          </div>
          <span className="text-[10px] font-mono text-white/40 uppercase">
            [ 4 OF 4 UNLOCKED ]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className="p-5 rounded-lg border border-white/10 bg-black/40 hover:bg-white/5 transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                {ach.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-serif italic text-white">{ach.title}</h4>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 uppercase">
                    [ UNLOCKED ]
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1 font-light">
                  {ach.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
