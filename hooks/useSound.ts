import React, { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SOUNDS, DEFAULT_SOUND_ID } from '../constants/sounds';

export const useSound = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [selectedSoundId, setSelectedSoundId] = useState(DEFAULT_SOUND_ID);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSoundId = await AsyncStorage.getItem('selectedSound');
      const savedEnabled = await AsyncStorage.getItem('soundEnabled');
      
      if (savedSoundId) setSelectedSoundId(savedSoundId);
      if (savedEnabled !== null) setIsSoundEnabled(savedEnabled === 'true');
    } catch (error) {
      console.log('Error loading sound settings:', error);
    }
  };

  const saveSettings = async (soundId: string, enabled: boolean) => {
    try {
      if (soundId) {
        await AsyncStorage.setItem('selectedSound', soundId);
      }
      await AsyncStorage.setItem('soundEnabled', String(enabled));
    } catch (error) {
      console.log('Error saving sound settings:', error);
    }
  };

  const playSound = async () => {
    if (!isSoundEnabled) return;
    
    const soundConfig = SOUNDS.find(s => s.id === selectedSoundId);
    if (!soundConfig || !soundConfig.file) return;

    try {
      setIsLoading(true);
      
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        soundConfig.file,
        { 
          isLooping: true,
          volume: 0.5,
          shouldPlay: true 
        }
      );
      
      setSound(newSound);
    } catch (error) {
      console.log('Error playing sound:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const changeSound = async (soundId: string) => {
    if (!soundId) return;
    
    setSelectedSoundId(soundId);
    await saveSettings(soundId, isSoundEnabled);
    
    if (isSoundEnabled && sound) {
      await stopSound();
      await playSound();
    }
  };

  const toggleSound = async (enabled: boolean) => {
    setIsSoundEnabled(enabled);
    await saveSettings(selectedSoundId, enabled);
    
    if (!enabled) {
      await stopSound();
    } else {
      await playSound();
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return {
    playSound,
    stopSound,
    changeSound,
    toggleSound,
    selectedSoundId,
    isSoundEnabled,
    isLoading,
  };
};