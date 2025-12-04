import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { colors } from "../constants/colors";
import { YouTubeVideo } from "../types/youtube";
import { TabParamList } from "../types/navigation";
import { searchVideos, getVideosByCategory } from "../services/youtubeService";
import SearchVideoCard from "../components/SearchVideoCard";
import { useSearch } from "../context/SearchContext";
import SortModal, { SortOption } from "../components/SortModal";

type SearchScreenRouteProp = RouteProp<TabParamList, "SearchTab">;

export default function SearchScreen() {
  const route = useRoute<SearchScreenRouteProp>();
  const { category } = route.params || {};
  const { searchQuery, searchTrigger } = useSearch();

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("popular");

  // Load videos when category changes from route params
  useEffect(() => {
    if (category) {
      loadCategoryVideos();
    }
  }, [category]);

  // Load videos when search is triggered from search bar
  useEffect(() => {
    if (searchTrigger > 0 && searchQuery.trim()) {
      loadSearchVideos();
    }
  }, [searchTrigger]);

  const loadCategoryVideos = async () => {
    if (!category) return;

    try {
      setLoading(true);
      setError(null);
      setCurrentSearch(category);
      const results = await getVideosByCategory(category, 20);
      setVideos(results);
    } catch (err) {
      console.error("Error loading videos:", err);
      setError("Failed to load videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadSearchVideos = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setCurrentSearch(searchQuery);
      const results = await searchVideos(searchQuery, 20);
      setVideos(results);
    } catch (err) {
      console.error("Error loading videos:", err);
      setError("Failed to load videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPress = (video: YouTubeVideo) => {
    // TODO: Navigate to video player
    console.log("Video pressed:", video.title);
  };

  // Parse date string (DD.MM.YYYY) to Date object for sorting
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(year, month - 1, day);
  };

  // Sort videos based on selected option
  const sortedVideos = useMemo(() => {
    if (!videos.length) return videos;

    const sorted = [...videos];

    switch (sortOption) {
      case "latest":
        sorted.sort(
          (a, b) => parseDate(b.publishedAt).getTime() - parseDate(a.publishedAt).getTime()
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) => parseDate(a.publishedAt).getTime() - parseDate(b.publishedAt).getTime()
        );
        break;
      case "popular":
        // YouTube API returns results sorted by relevance/popularity by default
        // Keep original order for "popular"
        break;
    }

    return sorted;
  }, [videos, sortOption]);

  const getTitle = () => {
    if (currentSearch) return currentSearch;
    return "Search";
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case "latest":
        return "Upload date: latest";
      case "oldest":
        return "Upload date: oldest";
      case "popular":
        return "Most popular";
      default:
        return "Most popular";
    }
  };

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

  if (videos.length === 0 && !currentSearch) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Use the search bar to find videos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.resultsCount}>
          {videos.length} results found for: "<Text style={styles.searchTerm}>{currentSearch}</Text>
          "
        </Text>
        <TouchableOpacity onPress={() => setSortModalVisible(true)}>
          <Text style={styles.sortBy}>
            Sort by: <Text style={styles.sortOption}>{getSortLabel()}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedVideos}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SearchVideoCard video={item} onPress={() => handleVideoPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
      />
      <SortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        selectedOption={sortOption}
        onSelectOption={setSortOption}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: colors.text.muted,
    marginBottom: 8,
  },
  searchTerm: {
    fontFamily: "Poppins_600SemiBold",
    color: colors.primary,
  },
  sortBy: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: colors.text.dark,
    textAlign: "right",
  },
  sortOption: {
    fontFamily: "Poppins_600SemiBold",
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
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.muted,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
