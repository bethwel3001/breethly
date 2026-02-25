import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep native splash visible while we prepare
SplashScreen.preventAutoHideAsync();

interface SplashScreenContextType {
  isReady: boolean;
}

const SplashScreenContext = createContext<SplashScreenContextType>({ isReady: false });

export const useSplashScreen = () => useContext(SplashScreenContext);

export function SplashScreenProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const containerOpacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function prepare() {
      try {
        // Start fade-in animation immediately
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();

        // Keep splash visible for at least 2 seconds total
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Fade out splash screen
        Animated.timing(containerOpacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(async () => {
          // Hide native splash and mark as ready
          await SplashScreen.hideAsync();
          setIsSplashVisible(false);
          setIsReady(true);
        });
        
      } catch (e) {
        console.warn(e);
        setIsSplashVisible(false);
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady && isSplashVisible) {
    return (
      <Animated.View style={[styles.container, { opacity: containerOpacityAnim }]}>
        <Animated.View 
          style={[
            styles.squircleContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image 
            source={require('../assets/images/breethly.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>
    );
  }

  return (
    <SplashScreenContext.Provider value={{ isReady }}>
      {children}
    </SplashScreenContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2C3E70',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  squircleContainer: {
    width: 200,
    height: 200,
    borderRadius: 40,
    backgroundColor: '#2C3E70',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 180,
    height: 180,
  },
});