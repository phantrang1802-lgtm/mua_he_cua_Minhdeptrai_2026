import { DaySchedule, ScheduleItem } from '../types';

export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':');
  if (parts.length < 2) return 0;
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  return h * 60 + m;
}

export function getCurrentDayId(date: Date = new Date()): string {
  const day = date.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ...
  const map: Record<number, string> = {
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
    0: 'sun',
  };
  return map[day] || 'mon';
}

export function getCurrentTimeFormatted(date: Date = new Date()): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

export interface ActivityStatus {
  currentActivity: ScheduleItem | null;
  nextActivity: ScheduleItem | null;
  statusText: string;
  progressPercent: number;
  minutesRemaining: number;
  minutesUntilNext: number;
}

export function evaluateActivityStatus(
  daySchedule: DaySchedule | undefined,
  currentMinutes: number
): ActivityStatus {
  if (!daySchedule || !daySchedule.items.length) {
    return {
      currentActivity: null,
      nextActivity: null,
      statusText: 'Chưa có lịch trình',
      progressPercent: 0,
      minutesRemaining: 0,
      minutesUntilNext: 0,
    };
  }

  const items = daySchedule.items;
  let current: ScheduleItem | null = null;
  let next: ScheduleItem | null = null;
  let progressPercent = 0;
  let minutesRemaining = 0;
  let minutesUntilNext = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const start = timeToMinutes(item.startTime);
    let end = timeToMinutes(item.endTime);
    
    // Handle overnight sleep e.g. 21:30 to 06:30
    if (end < start) {
      if (currentMinutes >= start || currentMinutes < end) {
        current = item;
        const totalDuration = (24 * 60 - start) + end;
        const elapsed = currentMinutes >= start 
          ? currentMinutes - start 
          : (24 * 60 - start) + currentMinutes;
        progressPercent = Math.min(100, Math.round((elapsed / totalDuration) * 100));
        minutesRemaining = totalDuration - elapsed;
        next = items[(i + 1) % items.length];
        break;
      }
    } else {
      if (currentMinutes >= start && currentMinutes <= end) {
        current = item;
        const totalDuration = end - start || 1;
        const elapsed = currentMinutes - start;
        progressPercent = Math.min(100, Math.round((elapsed / totalDuration) * 100));
        minutesRemaining = end - currentMinutes;
        next = items[i + 1] || items[0];
        break;
      } else if (currentMinutes < start && !next) {
        next = item;
        minutesUntilNext = start - currentMinutes;
      }
    }
  }

  // If no active item found (gap between activities)
  if (!current && next) {
    const nextStart = timeToMinutes(next.startTime);
    minutesUntilNext = nextStart > currentMinutes ? nextStart - currentMinutes : 0;
    return {
      currentActivity: null,
      nextActivity: next,
      statusText: `Thời gian tự do • Hoạt động kế tiếp: ${next.title}`,
      progressPercent: 0,
      minutesRemaining: 0,
      minutesUntilNext,
    };
  }

  return {
    currentActivity: current,
    nextActivity: next,
    statusText: current ? `Đang diễn ra: ${current.title}` : 'Đang nghỉ ngơi',
    progressPercent,
    minutesRemaining,
    minutesUntilNext,
  };
}

export function calculateWeeklyStats(schedules: DaySchedule[]) {
  let totalStudyMinutes = 0;
  let totalSportsMinutes = 0;
  let totalMealMinutes = 0;
  let totalRelaxMinutes = 0;
  let totalFamilyMinutes = 0;
  let totalItemsCount = 0;

  schedules.forEach(day => {
    day.items.forEach(item => {
      totalItemsCount++;
      const start = timeToMinutes(item.startTime);
      let end = timeToMinutes(item.endTime);
      if (end < start) end += 24 * 60; // overnight handling
      const duration = Math.max(15, end - start);

      switch (item.category) {
        case 'study':
          totalStudyMinutes += duration;
          break;
        case 'sports':
          totalSportsMinutes += duration;
          break;
        case 'meal':
          totalMealMinutes += duration;
          break;
        case 'relax':
          totalRelaxMinutes += duration;
          break;
        case 'family':
          totalFamilyMinutes += duration;
          break;
      }
    });
  });

  return {
    studyHours: (totalStudyMinutes / 60).toFixed(1),
    sportsHours: (totalSportsMinutes / 60).toFixed(1),
    mealHours: (totalMealMinutes / 60).toFixed(1),
    relaxHours: (totalRelaxMinutes / 60).toFixed(1),
    familyHours: (totalFamilyMinutes / 60).toFixed(1),
    totalItemsCount,
  };
}
