import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SearchProvider } from "./src/context/SearchContext";
import { HomeSortProvider } from "./src/context/HomeSortContext";

export default function App() {
  return (
    <SearchProvider>
      <HomeSortProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </HomeSortProvider>
    </SearchProvider>
  );
}
