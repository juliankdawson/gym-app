import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import Colors from 'src/components/colors';

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.backgroundDark }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome Home!
        </Text>
        <View style={[styles.card, { 
          backgroundColor: colors.background,
        }]}>
          <Text style={[styles.cardText, { color: colors.textMuted }]}>
            This is your home screen content
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

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

export default HomeScreen;