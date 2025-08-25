import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import WeekCalendar from 'src/components/WeekCalendar';
import MainWorkoutButton from 'src/components/MainWorkoutButton';
import { useAuth } from 'src/auth/AuthContext';
import Colors from 'src/components/colors';
import WorkoutTemplates from 'src/components/WorkoutTemplates';

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? '';

  const handleDayPress = (day: { date: Date }) => {
    console.log('Pressed day:', day.date.toDateString());
    // TODO: open modal for this day's workout
  };

  const handleTemplatePress = () => {
    console.log('Pressed New +');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.backgroundDark }]}>
      <View style={styles.content}>
        {/* Greeting + Today’s Workout */}
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Welcome back, {firstName} 👋
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>
          Today's Workout
        </Text>
        <MainWorkoutButton
          workoutName="Chest & Triceps"
          onPress={() => console.log('Go to workout')}
        />
        <WeekCalendar onDayPress={handleDayPress} />

        {/* Templates Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Templates</Text>
          <TouchableOpacity
            style={[styles.newButton, { backgroundColor: colors.background, borderColor: colors.backgroundLight }]}
            onPress={handleTemplatePress}
            activeOpacity={0.8}
          >
            <Text style={[styles.newButtonText, { color: colors.text }]}>New +</Text>
          </TouchableOpacity>
        </View>

        <WorkoutTemplates />
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
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  newButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderRadius: 12,
  },
  newButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default HomeScreen;