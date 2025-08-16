import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Dimensions } from "react-native";
import Colors from "./colors";

type Props = {
  type: string;
  title: string;
  frequency: string;
  style?: object;
};

export default function ProgramCard({ type, title, frequency }: Props) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const screenWidth = Dimensions.get("window").width;
  const size = screenWidth - 32; // account for parent padding

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { width: size, backgroundColor: colors.background },
      ]}
    >
      <View>
        <Text style={[styles.type, { color: colors.textMuted }]}>{type}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>

      <View style={styles.bottomRow}>
        <View
          style={[
            styles.frequencyButton,
            { borderColor: colors.backgroundLight },
          ]}
        >
          <Text style={[styles.frequencyText, { color: colors.text }]}>
            {frequency}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    height: 75, // fixed height instead of square
    justifyContent: "space-between",
  },
  type: {
    fontSize: 12,
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  frequencyButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  frequencyText: {
    fontSize: 12,
  },
});