import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ConfettiPiece {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  rotation: Animated.Value;
  color: string;
  delay: number;
}

export default function Confetti({ visible }: { visible: boolean }) {
  const pieces = useRef<ConfettiPiece[]>([]);
  const animations = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    if (visible) {
      startConfetti();
    }
    return () => {
      animations.current.forEach(anim => anim.stop());
    };
  }, [visible]);

  const startConfetti = () => {
    // Create 50 confetti pieces
    pieces.current = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      rotation: new Animated.Value(0),
      color: ['#FF9F7C', '#9B9BCF', '#5D7A5C', '#FFD966', '#A9D4E8'][i % 5],
      delay: i * 20,
    }));

    // Animate each piece
    pieces.current.forEach(piece => {
      const targetX = (Math.random() - 0.5) * 300;
      const targetY = 800 + Math.random() * 400;
      const targetRotation = (Math.random() - 0.5) * 720;

      const anim = Animated.parallel([
        Animated.timing(piece.x, {
          toValue: targetX,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
          delay: piece.delay,
        }),
        Animated.timing(piece.y, {
          toValue: targetY,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
          delay: piece.delay,
        }),
        Animated.timing(piece.rotation, {
          toValue: targetRotation,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
          delay: piece.delay,
        }),
      ]);

      animations.current.push(anim);
      anim.start();
    });
  };

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.current.map(piece => (
        <Animated.View
          key={piece.id}
          style={[
            styles.piece,
            {
              backgroundColor: piece.color,
              transform: [
                { translateX: piece.x },
                { translateY: piece.y },
                { rotate: piece.rotation.interpolate({
                    inputRange: [-360, 360],
                    outputRange: ['-360deg', '360deg']
                  })
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  piece: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: -20,
    left: '50%',
    marginLeft: -4,
  },
});