import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { YouTubeVideo, CategoryType } from "../types/youtube";
import VideoCard from "./VideoCard";
import { colors } from "../constants/colors";

interface CategorySectionProps {
  title: CategoryType;
  videos: YouTubeVideo[];
  onShowMore: () => void;
  onVideoPress: (video: YouTubeVideo) => void;
  isFirst?: boolean;
}

export default function CategorySection({
  title,
  videos,
  onShowMore,
  onVideoPress,
  isFirst = false,
}: CategorySectionProps) {
  return (
    <View style={[styles.container, !isFirst && styles.withBorder]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onShowMore}>
          <Text style={styles.showMore}>Show more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={videos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} onPress={() => onVideoPress(item)} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  withBorder: {
    borderTopWidth: 2,
    borderTopColor: colors.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: colors.text.dark,
  },
  showMore: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: colors.primary,
    textDecorationLine: "underline",
  },
  listContent: {
    paddingHorizontal: 24,
  },
});
