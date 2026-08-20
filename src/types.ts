export type ActivityCategory = 'study' | 'sports' | 'meal' | 'relax' | 'family' | 'outing';

export interface ScheduleItem {
  id: string;
  timeRange: string; // e.g. "07:30 – 09:00"
  startTime: string; // "07:30"
  endTime: string;   // "09:00"
  emoji: string;
  title: string;
  category: ActivityCategory;
  notes?: string;
  completed?: boolean;
}

export interface DaySchedule {
  id: string; // 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'special'
  dayIndex: number; // 1 = Monday, 7 = Sunday, 8 = Special
  name: string; // 'Thứ Hai', 'Thứ Ba', ...
  fullTitle: string; // '🌞 THỨ HAI - Khởi Đầu Năng Lượng'
  badge: string;
  tagline: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    gradient: string;
    lightBg: string;
  };
  items: ScheduleItem[];
}

export interface SpecialOutingStep {
  id: string;
  stepNumber: number;
  emoji: string;
  title: string;
  detail: string;
  category: ActivityCategory;
  suggestedTime?: string;
  completed: boolean;
  notes?: string;
  photoUrl?: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'must-have' | 'fun' | 'clothes' | 'food';
  emoji: string;
  checked: boolean;
}

export interface SummerMemory {
  id: string;
  date: string;
  dayName: string;
  title: string;
  content: string;
  emoji: string;
  mood: '🔥 Siêu vui' | '🌟 Đáng nhớ' | '⚡ Hăng say' | '🌊 Thư giãn' | '🏆 Chiến thắng';
  photoUrl?: string;
  tags: string[];
}
