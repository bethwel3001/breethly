import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SessionData {
  date: string;
  duration: number;
  exercise: string;
  completedAt: number;
}

export const useStats = () => {
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [sessionsToday, setSessionsToday] = useState(0);
  const [history, setHistory] = useState<SessionData[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load stats on mount
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const historyData = await AsyncStorage.getItem('breathHistory');
      if (historyData) {
        const parsedHistory = JSON.parse(historyData);
        setHistory(parsedHistory);
        calculateStats(parsedHistory);
      }
    } catch (error) {
      console.log('Error loading stats:', error);
    }
  };

  const calculateStats = (sessions: SessionData[]) => {
    // Total sessions
    setTotalSessions(sessions.length);
    
    // Total minutes
    const minutes = sessions.reduce((acc, session) => acc + session.duration, 0);
    setTotalMinutes(minutes);
    
    // Sessions today
    const today = new Date().toDateString();
    const todayCount = sessions.filter(s => 
      new Date(s.date).toDateString() === today
    ).length;
    setSessionsToday(todayCount);
    
    // Calculate streak
    calculateStreak(sessions);
  };

  const calculateStreak = (sessions: SessionData[]) => {
    if (sessions.length === 0) {
      setCurrentStreak(0);
      return;
    }

    // Sort by date (newest first)
    const sorted = [...sessions].sort((a, b) => b.completedAt - a.completedAt);
    
    let streak = 1;
    let currentDate = new Date(sorted[0].date);
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i].date);
      prevDate.setHours(0, 0, 0, 0);
      
      const diffTime = currentDate.getTime() - prevDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        streak++;
        currentDate = prevDate;
      } else if (diffDays > 1) {
        break;
      }
    }
    
    setCurrentStreak(streak);
  };

  const addSession = async (duration: number, exercise: string) => {
    const newSession: SessionData = {
      date: new Date().toISOString(),
      duration: Math.round(duration / 60), // Convert seconds to minutes
      exercise,
      completedAt: Date.now(),
    };

    const updatedHistory = [newSession, ...history];
    setHistory(updatedHistory);
    
    try {
      await AsyncStorage.setItem('breathHistory', JSON.stringify(updatedHistory));
      calculateStats(updatedHistory);
      
      // Show confetti for milestones
      const newTotal = updatedHistory.length;
      if (newTotal === 1 || newTotal === 5 || newTotal === 10 || newTotal === 25 || newTotal === 50) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      console.log('Error saving session:', error);
    }
  };

  return {
    totalSessions,
    totalMinutes,
    currentStreak,
    sessionsToday,
    history,
    showConfetti,
    addSession,
    loadStats,
  };
};