import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DeveloperFooter() {
  const socialLinks = [
    { icon: 'logo-instagram', url: 'https://instagram.com/am_kiplagat', color: '#E4405F' },
    { icon: 'logo-twitter', url: 'https://twitter.com/am_kiplagat', color: '#1DA1F2' },
    { icon: 'logo-github', url: 'https://github.com/bethwel3001', color: '#333' },
    { icon: 'globe-outline', url: 'https:/bethwell.vercel.app', color: '#2C3E70' },
  ];

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Error opening link:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      
      <Text style={styles.sectionTitle}>Know the Developer</Text>
      
      <View style={styles.developerCard}>
        <Image 
          source={require('../assets/images/developer.jpeg')} 
          style={styles.developerImage}
        />
        
        <View style={styles.developerInfo}>
          <Text style={styles.developerName}>Bethwel Kiplagat</Text>
          <Text style={styles.developerBio}>
            Software Engineer passionate about creating solutions that bridge technology and Humanity. 
          </Text>
        </View>
      </View>

      <View style={styles.socialContainer}>
        {socialLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.socialButton, { backgroundColor: link.color + '20' }]}
            onPress={() => openLink(link.url)}
          >
            <Ionicons name={link.icon as any} size={24} color={link.color} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.openSourceContainer}>
        <Ionicons name="code-slash-outline" size={20} color="#666" />
        <Text style={styles.openSourceText}>
          Open source | Contribute on GitHub
        </Text>
      </View>
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E70',
    marginBottom: 15,
  },
  developerCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  developerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  developerInfo: {
    flex: 1,
  },
  developerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  developerBio: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openSourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  openSourceText: {
    fontSize: 14,
    color: '#666',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },
});