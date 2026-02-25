import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SOUNDS } from '../constants/sounds';
import { useSound } from '../hooks/useSound';
import SoundPicker from '../components/SoundPicker';
import DeveloperFooter from '../components/DeveloperFooter';

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2C3E70" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          {/* Sound Settings */}
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

          {/* Dark Mode (Coming Soon) */}
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={24} color="#2C3E70" />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Soon</Text>
            </View>
          </View>

          {/* Haptic Feedback (Coming Soon) */}
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="heart" size={24} color="#2C3E70" />
              <Text style={styles.settingLabel}>Haptic Feedback</Text>
            </View>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Soon</Text>
            </View>
          </View>
        </View>

        {/* Developer Footer - Now clearly separate */}
        <DeveloperFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E70',
  },
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E70',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  comingSoonBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  soundPickerContainer: {
    marginTop: 12,
    marginLeft: 36,
    marginBottom: 12,
  },
  pickerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});