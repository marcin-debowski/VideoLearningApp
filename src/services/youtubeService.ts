import axios from "axios";
import { YouTubeVideo, YouTubeSearchResponse, CategoryType } from "../types/youtube";

const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const mapResponseToVideos = (response: YouTubeSearchResponse): YouTubeVideo[] => {
  return response.items
    .filter((item) => item.id.videoId)
    .map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      publishedAt: formatDate(item.snippet.publishedAt),
      channelTitle: item.snippet.channelTitle,
    }));
};

export const searchVideos = async (
  query: string,
  maxResults: number = 10
): Promise<YouTubeVideo[]> => {
  try {
    const response = await axios.get<YouTubeSearchResponse>(`${BASE_URL}/search`, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults,
        key: API_KEY,
      },
    });
    return mapResponseToVideos(response.data);
  } catch (error) {
    console.error("Error searching videos:", error);
    throw error;
  }
};

export const getVideosByCategory = async (
  category: CategoryType,
  maxResults: number = 5
): Promise<YouTubeVideo[]> => {
  const searchQuery = `${category} tutorial programming`;
  return searchVideos(searchQuery, maxResults);
};

export const getAllCategories = async (): Promise<Record<CategoryType, YouTubeVideo[]>> => {
  const categories: CategoryType[] = ["React Native", "React", "TypeScript", "JavaScript"];

  const results = await Promise.all(
    categories.map(async (category) => {
      const videos = await getVideosByCategory(category);
      return { category, videos };
    })
  );

  return results.reduce((acc, { category, videos }) => {
    acc[category] = videos;
    return acc;
  }, {} as Record<CategoryType, YouTubeVideo[]>);
};
