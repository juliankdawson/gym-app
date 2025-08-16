import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, useColorScheme, Dimensions } from "react-native";
import ProgramCard from "./ProgramCard";
import Colors from "./colors";

const recommendedTemplates = [
  { id: "1", type: "Upper Body", title: "Push-Pull Power", frequency: "4/week" },
  { id: "2", type: "Full Body", title: "Strength Builder", frequency: "3/week" },
  { id: "3", type: "Full Body", title: "Strength Builder", frequency: "3/week" },
  { id: "4", type: "Full Body", title: "Strength Builder", frequency: "3/week" },
  { id: "5", type: "Full Body", title: "Strength Builder", frequency: "3/week" },
  { id: "6", type: "Full Body", title: "Strength Builder", frequency: "3/week" }
];

const customTemplates = [
  { id: "3", type: "Lower Body", title: "Leg Focus Blast", frequency: "2/week" },
];

export default function WorkoutTemplates() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [activeTab, setActiveTab] = useState<"recommended" | "custom">("recommended");

  const data = activeTab === "recommended" ? recommendedTemplates : customTemplates;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: colors.backgroundLight }]}>
        <TouchableOpacity onPress={() => setActiveTab("recommended")}>
          <Text
            style={[
              styles.tabText,
              { color: colors.textMuted },
              activeTab === "recommended" && [styles.activeTab, { color: colors.primary }],
            ]}
          >
            Recommended
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("custom")}>
          <Text
            style={[
              styles.tabText,
              { color: colors.textMuted },
              activeTab === "custom" && [styles.activeTab, { color: colors.primary }],
            ]}
          >
            Custom
          </Text>
        </TouchableOpacity>
      </View>

      {/* Template stack */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProgramCard
            type={item.type}
            title={item.title}
            frequency={item.frequency}
            style={styles.programCard}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: -16, },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  tabText: {
    fontSize: 16,
  },
  activeTab: {
    fontWeight: "bold",
  },
  list: {
    paddingVertical: 16, // vertical padding only
  },
  programCard: {
    width: Dimensions.get("window").width, // full screen width
    height: 75, // compact height
    marginBottom: 12,
  },
});