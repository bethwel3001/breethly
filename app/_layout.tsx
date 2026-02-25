import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreenProvider, useSplashScreen } from '../contexts/SplashScreenContext';

function RootLayoutContent() {
  const { isReady } = useSplashScreen();

  if (!isReady) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="exercise" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="stats" />
        <Stack.Screen name="emergency" />
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