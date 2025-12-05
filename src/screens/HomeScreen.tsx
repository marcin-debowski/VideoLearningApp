import React, { useEffect, useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { colors } from "../constants/colors";
import { YouTubeVideo, CategoryType } from "../types/youtube";
import { TabParamList, RootStackParamList } from "../types/navigation";
import { getVideosByCategory } from "../services/youtubeService";
import CategorySection from "../components/CategorySection";
import { useHomeSort } from "../context/HomeSortContext";

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "HomeTab">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CATEGORIES: CategoryType[] = ["React Native", "React", "TypeScript", "JavaScript"];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { sortOption } = useHomeSort();
  const [videosByCategory, setVideosByCategory] = useState<Record<CategoryType, YouTubeVideo[]>>(
    {} as Record<CategoryType, YouTubeVideo[]>
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      const results: Record<CategoryType, YouTubeVideo[]> = {} as Record<
        CategoryType,
        YouTubeVideo[]
      >;

      for (const category of CATEGORIES) {
        const videos = await getVideosByCategory(category, 5);
        results[category] = videos;
      }

      setVideosByCategory(results);
    } catch (err) {
      console.error("Error loading videos:", err);
      setError("Failed to load videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = (category: CategoryType) => {
    navigation.navigate("SearchTab", { category });
  };

  const handleVideoPress = (video: YouTubeVideo) => {
    navigation.navigate("VideoPlayer", { video });
  };

  // Parse date string (DD.MM.YYYY) to Date object for sorting
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(year, month - 1, day);
  };

  // Sort videos in each category based on selected option
  const sortedVideosByCategory = useMemo(() => {
    const sorted: Record<CategoryType, YouTubeVideo[]> = {} as Record<CategoryType, YouTubeVideo[]>;

    for (const category of CATEGORIES) {
      const videos = videosByCategory[category] || [];
      if (!videos.length) {
        sorted[category] = videos;
        continue;
      }

      const sortedVideos = [...videos];

      switch (sortOption) {
        case "latest":
          sortedVideos.sort(
            (a, b) => parseDate(b.publishedAt).getTime() - parseDate(a.publishedAt).getTime()
          );
          break;
        case "oldest":
          sortedVideos.sort(
            (a, b) => parseDate(a.publishedAt).getTime() - parseDate(b.publishedAt).getTime()
          );
          break;
        case "popular":
          // Keep original order for "popular"
          break;
      }

      sorted[category] = sortedVideos;
    }

    return sorted;
  }, [videosByCategory, sortOption]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={colors.primary} />
        <Text style={styles.loadingText}>Loading videos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {CATEGORIES.map((category, index) => (
        <CategorySection
          key={category}
          title={category}
          videos={sortedVideosByCategory[category] || []}
          onShowMore={() => handleShowMore(category)}
          onVideoPress={handleVideoPress}
          isFirst={index === 0}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.muted,
    fontFamily: "Poppins_400Regular",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
