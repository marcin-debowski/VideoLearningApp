import { CategoryType } from "./youtube";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: { category?: CategoryType; searchQuery?: string } | undefined;
};
