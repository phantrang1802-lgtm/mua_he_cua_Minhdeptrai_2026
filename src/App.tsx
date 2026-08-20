/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { LiveActivityBanner } from './components/LiveActivityBanner';
import { DayScheduleView } from './components/DayScheduleView';
import { SpecialOutingView } from './components/SpecialOutingView';
import { StatsDrawer } from './components/StatsDrawer';
import { SummerDiaryView } from './components/SummerDiaryView';
import { EditActivityModal } from './components/EditActivityModal';
import { PrintTimetableModal } from './components/PrintTimetableModal';

import { 
  DaySchedule, 
  ScheduleItem, 
  SpecialOutingStep, 
  PackingItem, 
  SummerMemory 
} from './types';
import { 
  DEFAULT_WEEK_SCHEDULES, 
  DEFAULT_SPECIAL_OUTING, 
  DEFAULT_PACKING_LIST, 
  INITIAL_MEMORIES 
} from './data/defaultSchedule';
import { 
  getCurrentDayId, 
  getCurrentTimeFormatted, 
  timeToMinutes, 
  evaluateActivityStatus 
} from './utils/timeHelpers';
import { soundFx } from './utils/audio';

export default function App() {
  // Navigation tab
  const [activeTab, setActiveTab] = useState<'schedule' | 'special' | 'diary' | 'stats'>('schedule');

  // Schedules state with localStorage persistence
  const [schedules, setSchedules] = useState<DaySchedule[]>(() => {
    try {
      const saved = localStorage.getItem('summer_quest_schedules_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_WEEK_SCHEDULES;
  });

  // Selected Day tab in schedule
  const [selectedDayId, setSelectedDayId] = useState<string>(() => getCurrentDayId());

  // Completed items Set
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('summer_quest_completed_ids');
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // ignore
    }
    return new Set<string>();
  });

  // Special Outing Steps
  const [specialSteps, setSpecialSteps] = useState<SpecialOutingStep[]>(() => {
    try {
      const saved = localStorage.getItem('summer_quest_special_steps');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_SPECIAL_OUTING;
  });

  // Outing Packing List
  const [packingList, setPackingList] = useState<PackingItem[]>(() => {
    try {
      const saved = localStorage.getItem('summer_quest_packing');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_PACKING_LIST;
  });

  // Outing Destination
  const [destination, setDestination] = useState<string>(() => {
    try {
      return localStorage.getItem('summer_quest_destination') || '🎡 Công viên nước & Khu giải trí';
    } catch {
      return '🎡 Công viên nước & Khu giải trí';
    }
  });

  // Summer Memories Diary
  const [memories, setMemories] = useState<SummerMemory[]>(() => {
    try {
      const saved = localStorage.getItem('summer_quest_memories');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_MEMORIES;
  });

  // Sound FX enabled
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => soundFx.isEnabled());

  // Live real clock & simulated test time
  const [realTime, setRealTime] = useState<Date>(new Date());
  const [simulatedTime, setSimulatedTime] = useState<string | null>(null);

  // Modals state
  const [editingItem, setEditingItem] = useState<{ dayId: string; item: ScheduleItem | null } | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Sync real-time clock every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRealTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('summer_quest_schedules_v1', JSON.stringify(schedules));
    } catch {}
  }, [schedules]);

  useEffect(() => {
    try {
      localStorage.setItem('summer_quest_completed_ids', JSON.stringify(Array.from(completedIds)));
    } catch {}
  }, [completedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('summer_quest_special_steps', JSON.stringify(specialSteps));
    } catch {}
  }, [specialSteps]);

  useEffect(() => {
    try {
      localStorage.setItem('summer_quest_packing', JSON.stringify(packingList));
    } catch {}
  }, [packingList]);

  useEffect(() => {
    try {
      localStorage.setItem('summer_quest_destination', destination);
    } catch {}
  }, [destination]);

  useEffect(() => {
    try {
      localStorage.setItem('summer_quest_memories', JSON.stringify(memories));
    } catch {}
  }, [memories]);

  // Determine current effective time & day
  const effectiveTimeString = useMemo(() => {
    return simulatedTime || getCurrentTimeFormatted(realTime);
  }, [simulatedTime, realTime]);

  const effectiveMinutes = useMemo(() => {
    return timeToMinutes(effectiveTimeString);
  }, [effectiveTimeString]);

  const todaySchedule = useMemo(() => {
    const todayId = getCurrentDayId(realTime);
    return schedules.find(s => s.id === todayId) || schedules[0];
  }, [schedules, realTime]);

  const liveStatus = useMemo(() => {
    return evaluateActivityStatus(todaySchedule, effectiveMinutes);
  }, [todaySchedule, effectiveMinutes]);

  // Handlers for activity completion
  const handleToggleComplete = (itemId: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  // Handlers for activity editing/adding
  const handleSaveActivity = (dayId: string, item: ScheduleItem) => {
    setSchedules(prev => {
      return prev.map(day => {
        if (day.id !== dayId) return day;
        const exists = day.items.some(it => it.id === item.id);
        const nextItems = exists
          ? day.items.map(it => (it.id === item.id ? item : it))
          : [...day.items, item];

        // Sort items by start time
        nextItems.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
        return { ...day, items: nextItems };
      });
    });
  };

  const handleDeleteActivity = (dayId: string, itemId: string) => {
    setSchedules(prev => {
      return prev.map(day => {
        if (day.id !== dayId) return day;
        return {
          ...day,
          items: day.items.filter(it => it.id !== itemId),
        };
      });
    });
  };

  const handleResetDay = (dayId: string) => {
    const original = DEFAULT_WEEK_SCHEDULES.find(d => d.id === dayId);
    if (!original) return;
    setSchedules(prev => prev.map(d => d.id === dayId ? original : d));
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#E0E0E0] flex flex-col selection:bg-[#FF6B35] selection:text-black font-sans">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTimeString={effectiveTimeString}
        simulatedTime={simulatedTime}
        setSimulatedTime={setSimulatedTime}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 flex flex-col gap-6">
        
        {/* Live Real-time / Active Activity Banner */}
        <LiveActivityBanner
          currentDaySchedule={todaySchedule}
          status={liveStatus}
          currentTimeString={effectiveTimeString}
          simulatedTime={simulatedTime}
          setSimulatedTime={setSimulatedTime}
          onToggleComplete={handleToggleComplete}
          completedIds={completedIds}
        />

        {/* View Switcher based on Active Tab */}
        {activeTab === 'schedule' && (
          <DayScheduleView
            schedules={schedules}
            selectedDayId={selectedDayId}
            setSelectedDayId={setSelectedDayId}
            activeActivityId={liveStatus.currentActivity?.id || null}
            completedIds={completedIds}
            onToggleComplete={handleToggleComplete}
            onEditActivity={(item) => setEditingItem({ dayId: selectedDayId, item })}
            onAddActivity={(dayId) => setEditingItem({ dayId, item: null })}
            onResetDay={handleResetDay}
          />
        )}

        {activeTab === 'special' && (
          <SpecialOutingView
            steps={specialSteps}
            setSteps={setSpecialSteps}
            packingList={packingList}
            setPackingList={setPackingList}
            destination={destination}
            setDestination={setDestination}
          />
        )}

        {activeTab === 'diary' && (
          <SummerDiaryView
            memories={memories}
            setMemories={setMemories}
          />
        )}

        {activeTab === 'stats' && (
          <StatsDrawer
            schedules={schedules}
            completedCount={completedIds.size}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="no-print border-t border-white/10 bg-[#0C0C0C] py-6 text-center text-xs text-white/40 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[#FF6B35] font-bold">[ SOLARIS SUMMER 2026 ]</span>
            <span>• Mùa hè rực rỡ, kỷ luật & khám phá bất tận</span>
          </div>
          <div className="flex items-center gap-4 text-white/40">
            <span>⚽ Thể thao</span>
            <span>📚 Học tập</span>
            <span>🎡 Dã ngoại</span>
            <span>💖 Gia đình</span>
          </div>
        </div>
      </footer>

      {/* Edit / Add Activity Modal */}
      <EditActivityModal
        isOpen={editingItem !== null}
        onClose={() => setEditingItem(null)}
        item={editingItem?.item || null}
        dayId={editingItem?.dayId || selectedDayId}
        onSave={handleSaveActivity}
        onDelete={handleDeleteActivity}
      />

      {/* Print Timetable Modal */}
      <PrintTimetableModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        schedules={schedules}
        specialSteps={specialSteps}
      />

    </div>
  );
}
