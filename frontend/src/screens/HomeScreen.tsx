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
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.backgroundDark }]}>
      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Welcome back, {firstName} 👋
        </Text>
        <Text style={[styles.title, {color: colors.text}]}>
          Today's Workout
        </Text>
        <MainWorkoutButton
          workoutName="Chest & Triceps"
          onPress={() => console.log('Go to workout')}
        />
        <WeekCalendar onDayPress={handleDayPress} />
        <View style={styles.headerRow}>
          <Text style={[styles.title, {color: colors.text}]}>Templates</Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.background, borderColor: colors.backgroundLight}]}
            onPress={handleTemplatePress}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, {color: colors.text}]}>NEW +</Text>
          </TouchableOpacity>
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
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    paddingBottom: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // pushes them apart
    alignItems: "center", // vertically centers them
    marginBottom: 12, // optional spacing under row
  },
  button: {
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 40,
    width: 100,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 700,
  }
});

export default HomeScreen;