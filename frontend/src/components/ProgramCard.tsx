import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import Colors from "./colors";

type Props = {
  type: string;
  title: string;
  days: number;
};

export default function ProgramCard({ type, title, days }: Props) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.background},
      ]}
      activeOpacity={0.85}
    >
      <Text style={[styles.type, { color: colors.textMuted }]}>{type}</Text>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={[styles.daysContainer, {backgroundColor: colors.backgroundLight}]}>
        <Text style={[styles.days, { color: colors.textMuted }]}>{days}/week</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 80,
    paddingHorizontal: 10,
    marginBottom: 0,
    borderRadius: 10,
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  type: {
    fontSize: 12,
    fontWeight: "400",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },
  daysContainer: {
    paddingVertical: 1,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  days: {
    fontSize: 12,
    fontWeight: "400",
  },
});