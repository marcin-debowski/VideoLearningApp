import { CategoryType, YouTubeVideo } from "./youtube";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  VideoPlayer: { video: YouTubeVideo };
};

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: { category?: CategoryType; searchQuery?: string } | undefined;
};
