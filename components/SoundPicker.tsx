import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Sound {
  id: string;
  name: string;
  icon: string;
}

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
  sounds: Sound[];
}

export default function SoundPicker({ selectedId, onSelect, sounds }: Props) {
  return (
    <View style={styles.container}>
      {sounds.map((sound) => (
        <TouchableOpacity
          key={sound.id}
          style={[
            styles.soundOption,
            selectedId === sound.id && styles.selectedOption,
          ]}
          onPress={() => onSelect(sound.id)}
        >
          <Ionicons 
            name={sound.icon as any} 
            size={20} 
            color={selectedId === sound.id ? '#FF9F7C' : '#666'} 
          />
          <Text style={[
            styles.soundName,
            selectedId === sound.id && styles.selectedText,
          ]}>
            {sound.name}
          </Text>
          {selectedId === sound.id && (
            <Ionicons name="checkmark" size={20} color="#FF9F7C" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  soundOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  selectedOption: {
    backgroundColor: '#FFF0E8',
    borderWidth: 1,
    borderColor: '#FF9F7C',
  },
  soundName: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  selectedText: {
    color: '#FF9F7C',
    fontWeight: '500',
  },
});