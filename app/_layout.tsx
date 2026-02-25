import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreenProvider, useSplashScreen } from '../contexts/SplashScreenContext';

// This component handles showing/hiding the splash screen
function RootLayoutContent() {
  const { isReady } = useSplashScreen();

  if (!isReady) {
    return null; // Splash screen is still visible
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="exercise" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SplashScreenProvider>
        <RootLayoutContent />
      </SplashScreenProvider>
    </SafeAreaProvider>
  );
}