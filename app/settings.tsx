import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SOUNDS } from '../constants/sounds';
import { useSound } from '../hooks/useSound';
import SoundPicker from '../components/SoundPicker';

export default function SettingsScreen() {
  const router = useRouter();
  const {
    selectedSoundId,
    isSoundEnabled,
    changeSound,
    toggleSound,
  } = useSound();

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#2C3E70" />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-high" size={24} color="#2C3E70" />
              <Text style={styles.settingLabel}>Ambient Sound</Text>
            </View>
            <Switch
              value={isSoundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: '#ddd', true: '#FF9F7C' }}
              thumbColor="white"
            />
          </View>

          {isSoundEnabled && (
            <View style={styles.soundPickerContainer}>
              <Text style={styles.pickerLabel}>Sound Track</Text>
              <SoundPicker
                selectedId={selectedSoundId}
                onSelect={changeSound}
                sounds={SOUNDS}
              />
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={24} color="#2C3E70" />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Text style={styles.comingSoon}>Coming Soon</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="heart" size={24} color="#2C3E70" />
              <Text style={styles.settingLabel}>Haptic Feedback</Text>
            </View>
            <Text style={styles.comingSoon}>Coming Soon</Text>
          </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E70',
  },
  content: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  comingSoon: {
    color: '#999',
    fontSize: 14,
  },
  soundPickerContainer: {
    marginTop: 10,
    marginLeft: 39,
  },
  pickerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
  },
});