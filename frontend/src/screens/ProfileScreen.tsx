import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, Button } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import Colors from 'src/components/colors';

const ProfileScreen: React.FC = () => {
  const { logout } = useAuth();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.backgroundDark }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Profile
        </Text>
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Text style={[styles.cardText, { color: colors.textMuted }]}>
            Your profile content will go here
          </Text>
        </View>

        <Button title="Log Out" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
