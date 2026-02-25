import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useKeepAwake } from 'expo-keep-awake';
import { useBreathingTimer } from '../hooks/useBreathingTimer';
import { useSound } from '../hooks/useSound';
import { EXERCISES } from '../constants/exercises';
import BreathingCircle from '../components/BreathingCircle';
import { useStats } from '../hooks/useStats';

export default function ExerciseScreen() {
  const router = useRouter();
  const exercise = EXERCISES[0];
  const { addSession } = useStats();

  const {
    currentPhase,
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useBreathingTimer(exercise.phases, exercise.durations);

  const { playSound, stopSound } = useSound();
  useKeepAwake();

  useEffect(() => {
    if (isRunning) {
      playSound();
    } else {
      stopSound();
    }
  }, [isRunning]);

  useEffect(() => {
  if (!isRunning && timeLeft === 0) {
    // Session completed
    const totalSeconds = exercise.durations.reduce((a, b) => a + b, 0) * 
      (exercise.phases.length / exercise.durations.length);
    addSession(totalSeconds, exercise.name);
  }
}, [isRunning, timeLeft]);

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color="#2C3E70" />
        </TouchableOpacity>

        <Text style={styles.phase}>{currentPhase.toUpperCase()}</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
        
        <BreathingCircle phase={currentPhase} isRunning={isRunning} />

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={resetTimer}>
            <Ionicons name="refresh" size={32} color="#2C3E70" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, styles.playButton]} 
            onPress={isRunning ? pauseTimer : startTimer}
          >
            <Ionicons 
              name={isRunning ? "pause" : "play"} 
              size={40} 
              color="white" 
            />
          </TouchableOpacity>
          
          <View style={{ width: 40 }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  phase: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2C3E70',
    marginBottom: 40,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    marginTop: 60,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: '#FF9F7C',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});