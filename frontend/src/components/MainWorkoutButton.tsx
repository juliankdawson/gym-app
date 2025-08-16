import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import Colors from 'src/components/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MainWorkoutButtonProps {
  workoutName: string;
  onPress?: () => void;
}

const gymEmojis = ['💪', '🏋️‍♂️', '🔱', '🧘‍♂️', '⚙️', '🤸‍♂️', '🦍'];

const getStableEmoji = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gymEmojis.length;
  return gymEmojis[index];
};

const MainWorkoutButton: React.FC<MainWorkoutButtonProps> = ({ workoutName, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const screenWidth = Dimensions.get('window').width;
  const sidePadding = Math.max(16, screenWidth * 0.04);

  const emoji = getStableEmoji(workoutName);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary, paddingHorizontal: sidePadding }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.workoutText, {color: Colors.dark.text}]}>{workoutName}</Text>
      <Text style={styles.emoji}>{emoji}</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={35} // thicker than default
        color={Colors.dark.text}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 85,
    borderRadius: 12,
    justifyContent: 'center',
    marginVertical: 20,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  emoji: {
    fontSize: 40,
    marginLeft: 'auto',
    marginRight: 40, // leave space for chevron
  },
  chevron: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
});

export default MainWorkoutButton;
