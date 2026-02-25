import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStats } from '../hooks/useStats';
import Confetti from '../components/Confetti';

export default function StatsScreen() {
  const router = useRouter();
  const { 
    totalSessions, 
    totalMinutes, 
    currentStreak, 
    sessionsToday, 
    history,
    showConfetti 
  } = useStats();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <Confetti visible={showConfetti} />
      
      {/* Simple header with just back button and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2C3E70" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Progress</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={24} color="#FF9F7C" />
            <Text style={styles.statNumber}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#9B9BCF" />
            <Text style={styles.statNumber}>{totalSessions}</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#5D7A5C" />
            <Text style={styles.statNumber}>{totalMinutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="today" size={24} color="#A9D4E8" />
            <Text style={styles.statNumber}>{sessionsToday}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Today's Goal</Text>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${Math.min((sessionsToday / 3) * 100, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{sessionsToday} / 3 sessions</Text>
        </View>

        {/* History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          {history.length === 0 ? (
            <Text style={styles.emptyText}>
              No sessions yet. Start breathing to see your history!
            </Text>
          ) : (
            history.slice(0, 10).map((session, index) => (
              <View key={index} style={styles.historyItem}>
                <Ionicons name="leaf" size={20} color="#FF9F7C" />
                <View style={styles.historyDetails}>
                  <Text style={styles.historyExercise}>{session.exercise}</Text>
                  <Text style={styles.historyDate}>{formatDate(session.date)}</Text>
                </View>
                <Text style={styles.historyDuration}>{session.duration} min</Text>
              </View>
            ))
          )}
        </View>

        <View style={{ height: 20 }} />
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
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E70',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  progressSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E70',
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#FF9F7C',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  historySection: {
    marginBottom: 24,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  historyDetails: {
    flex: 1,
    marginLeft: 12,
  },
  historyExercise: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  historyDuration: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E70',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
});