import { useState, useEffect, useRef } from 'react';

export const useBreathingTimer = (phases: string[], durations: number[]) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durations[0]);
  const [isRunning, setIsRunning] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setCurrentPhaseIndex(0);
    setTimeLeft(durations[0]);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextIndex = (currentPhaseIndex + 1) % phases.length;
          setCurrentPhaseIndex(nextIndex);
          return durations[nextIndex];
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [isRunning, currentPhaseIndex, phases.length, durations]);

  return {
    currentPhase: phases[currentPhaseIndex],
    timeLeft,
    isRunning,
    startTimer: () => setIsRunning(true),
    pauseTimer: () => setIsRunning(false),
    resetTimer: () => {
      setCurrentPhaseIndex(0);
      setTimeLeft(durations[0]);
      setIsRunning(false);
    },
  };
};