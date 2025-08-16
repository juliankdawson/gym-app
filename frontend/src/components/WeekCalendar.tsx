import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Dimensions } from 'react-native';
import Colors from 'src/components/colors';

interface Day {
  date: Date;
  isWorkoutDay?: boolean;
  workoutCompleted?: boolean;
}

interface WeekCalendarProps {
  onDayPress?: (day: Day) => void;
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({ onDayPress }) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const sidePadding = Math.max(16, screenWidth * 0.03);

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday start

  const days: Day[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    // Placeholder demo logic
    const isWorkoutDay = Math.random() < 0.7;
    const workoutCompleted = isWorkoutDay ? Math.random() < 0.5 : false;

    days.push({
      date,
      isWorkoutDay,
      workoutCompleted,
    });
  }

  const cardWidth = Math.min(80, (screenWidth - sidePadding * 2 - 6 * 8) / 7);

  return (
    <View style={[styles.container, { paddingHorizontal: sidePadding }]}>
      {days.map((item) => {
        const dayString = item.date.toDateString();
        const isToday = dayString === today.toDateString();

        const dayName = item.date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNumber = item.date.getDate();

        // Soft colors for workout days
        let backgroundColor = colors.background;
        if (isToday) backgroundColor = colors.primary;
        else if (item.isWorkoutDay && item.workoutCompleted) backgroundColor = 'rgba(76, 175, 80, 0.4)'; 
        else if (item.isWorkoutDay && !item.workoutCompleted) backgroundColor = 'rgba(255, 193, 7, 0.4)'; 

        return (
          <TouchableOpacity
            key={dayString}
            onPress={() => onDayPress?.(item)}
            style={[
              styles.card,
              {
                width: cardWidth,
                backgroundColor,
                borderWidth: isToday ? 0 : 2.5,
                borderColor: colors.backgroundLight,
              },
            ]}
          >
            {item.isWorkoutDay && (
              <View
                style={[styles.dot, { backgroundColor: colors.secondary }]}
              />
            )}

            <Text style={[styles.dayText, { color: isToday ? colors.background : colors.textMuted }]}>
              {dayName}
            </Text>
            <Text style={[styles.dateText, { color: isToday ? colors.background : colors.text }]}>
              {dayNumber}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  card: {
    height: 70,
    borderRadius: 24,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 6,
  },
  dayText: {
    fontSize: 12,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WeekCalendar;