import { create } from 'zustand';

interface TimerState {
  isRunning: boolean;
  elapsedTime: number;
  startTime: number;
  intervalId: NodeJS.Timeout | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  isRunning: false,
  elapsedTime: 0,
  startTime: 0,
  intervalId: null,
  start: () => {
    const { isRunning, elapsedTime } = get();
    if (!isRunning) {
      set({
        isRunning: true,
        startTime: Date.now() - elapsedTime,
        intervalId: setInterval(() => {
          set({ elapsedTime: Date.now() - get().startTime });
        }, 10),
      });
    }
  },
  stop: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
      set({ isRunning: false, intervalId: null });
    }
  },
  reset: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({ isRunning: false, elapsedTime: 0, startTime: 0, intervalId: null });
  },
}));