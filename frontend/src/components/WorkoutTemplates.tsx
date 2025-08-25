import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, useColorScheme } from "react-native";
import ProgramCard from "./ProgramCard";
import Colors from "./colors";

const { width } = Dimensions.get("window");

export default function WorkoutTemplates() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [tab, setTab] = useState<"saved" | "recommended">("saved");

  const programs = [
    { id: "1", type: "Upper Body", title: "Push-Pull Strength", days: 4 },
    { id: "2", type: "Full Body", title: "Athletic Performance", days: 3 },
    { id: "3", type: "Lower Body", title: "Leg Power", days: 2 },
  ];

  return (
    <View style={styles.container}>
      {/* Tab Selector */}
      <View style={[styles.tabContainer, { borderColor: colors.backgroundLight }]}>
        {["saved", "recommended"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.tab,
              {
                borderColor: tab === t ? colors.primary : "transparent",
                backgroundColor: tab === t ? colors.backgroundLight : "transparent",
              },
            ]}
            onPress={() => setTab(t as "saved" | "recommended")}
          >
            <Text
              style={[
                styles.tabText,
                { color: tab === t ? colors.text : colors.textMuted },
              ]}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Program Cards */}
      <FlatList
        data={programs}
        renderItem={({ item }) => (
          <ProgramCard type={item.type} title={item.title} days={item.days} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -18, // ignores parent screen padding to span full width
    width: width,
    paddingHorizontal: 18,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 5,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
});