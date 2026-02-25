import { View, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

interface Props {
  phase: string;
  isRunning: boolean;
}

export default function BreathingCircle({ phase, isRunning }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isRunning) return;

    let toValue = 1;
    let duration = 4000;

    if (phase === 'inhale') {
      toValue = 1.5;
      duration = 4000;
    } else if (phase === 'exhale') {
      toValue = 1;
      duration = 4000;
    } else {
      return;
    }

    Animated.timing(scaleAnim, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();

  }, [phase, isRunning]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: phase === 'inhale' ? '#9B9BCF' : 
                            phase === 'exhale' ? '#FF9F7C' : '#2C3E70'
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});