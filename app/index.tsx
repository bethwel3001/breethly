import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EXERCISES } from '../constants/exercises';
import { useStats } from '../hooks/useStats';

export default function HomeScreen() {
  const router = useRouter();
  const { currentStreak } = useStats();

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Breathly:</Text>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={16} color="#FF9F7C" />
              <Text style={styles.streakText}>{currentStreak} day streak</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              onPress={() => router.push('/stats')}
              style={styles.iconButton}
            >
              <Ionicons name="stats-chart" size={24} color="#2C3E70" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/settings')}
              style={styles.iconButton}
            >
              <Ionicons name="settings-outline" size={24} color="#2C3E70" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Button */}
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => router.push('/emergency')}
        >
          <Ionicons name="heart" size={24} color="#fff" />
          <Text style={styles.emergencyText}>Need a moment?</Text>
        </TouchableOpacity>
        
        <Text style={styles.subtitle}>Choose an exercise</Text>
        
        <FlatList
          data={EXERCISES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.card, { backgroundColor: item.color + '20' }]}
              onPress={() => router.push('/exercise')}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E70',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  streakText: {
    fontSize: 14,
    color: '#666',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  emergencyButton: {
    backgroundColor: '#FF9F7C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});