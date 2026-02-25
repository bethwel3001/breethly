import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useKeepAwake } from 'expo-keep-awake';
import { useBreathingTimer } from '../hooks/useBreathingTimer';
import BreathingCircle from '../components/BreathingCircle';
import * as Haptics from 'expo-haptics';

export default function EmergencyScreen() {
  const router = useRouter();
  useKeepAwake();

  // Simple 4-4-4-4 box breathing for 1 minute (about 4 cycles)
  const phases = ['inhale', 'hold', 'exhale', 'hold'];
  const durations = [4, 4, 4, 4];
  
  const {
    currentPhase,
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useBreathingTimer(phases, durations);

  useEffect(() => {
    // Auto-start when screen opens
    startTimer();
    
    // Gentle haptic on phase change
    if (currentPhase === 'inhale') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [currentPhase]);

  const handleDone = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Breathe with me</Text>
        <Text style={styles.subtitle}>Just follow the circle</Text>
        
        <View style={styles.circleContainer}>
          <BreathingCircle phase={currentPhase} isRunning={isRunning} />
        </View>

        <View style={styles.phaseContainer}>
          <Text style={styles.phaseText}>{currentPhase}</Text>
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>

        <TouchableOpacity 
          style={styles.pauseButton}
          onPress={isRunning ? pauseTimer : startTimer}
        >
          <Ionicons 
            name={isRunning ? 'pause' : 'play'} 
            size={32} 
            color="white" 
          />
        </TouchableOpacity>

        <Text style={styles.encouragement}>
          You're doing great. This will pass.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#2C3E70',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  doneButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  doneText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 20,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  phaseText: {
    fontSize: 24,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  pauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF9F7C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  encouragement: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 20,
  },
});