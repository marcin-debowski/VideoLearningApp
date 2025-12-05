import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import SortModal, { SortOption } from "../components/SortModal";
import { colors } from "../constants/colors";
import { TabParamList } from "../types/navigation";
import { useSearch } from "../context/SearchContext";
import { useHomeSort } from "../context/HomeSortContext";

// Import SVG icons
import HomeIconSvg from "../../assets/home-icon.svg";
import SearchIconSvg from "../../assets/search-icon.svg";
import SettingsIconSvg from "../../assets/settings-icon.svg";

const Tab = createBottomTabNavigator<TabParamList>();

function HomeIcon({ focused }: { focused: boolean }) {
  return <HomeIconSvg width={32} height={32} color={focused ? colors.white : colors.text.dark} />;
}

function SearchIcon({ focused }: { focused: boolean }) {
  return <SearchIconSvg width={32} height={32} color={focused ? colors.white : colors.text.dark} />;
}

export default function HomeTabs() {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("HomeTab");
  const { searchQuery, setSearchQuery, triggerSearch, searchTrigger } = useSearch();
  const { sortOption, setSortOption } = useHomeSort();
  const navigationRef = useRef<any>(null);

  const isHomeTab = activeTab === "HomeTab";

  // Navigate to SearchTab when search is triggered
  useEffect(() => {
    if (searchTrigger > 0 && searchQuery.trim() && navigationRef.current) {
      navigationRef.current.navigate("SearchTab");
    }
  }, [searchTrigger]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      triggerSearch();
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle='dark-content' backgroundColor={colors.background} />
        {/* Top Search Bar */}
        <View style={styles.topBar}>
          <View style={styles.searchContainer}>
            <SearchIconSvg width={20} height={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder='Search videos'
              placeholderTextColor={colors.text.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType='search'
            />
          </View>
          {isHomeTab && (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setSortModalVisible(true)}
            >
              <SettingsIconSvg width={24} height={24} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <Tab.Navigator
        screenListeners={({ navigation }) => ({
          state: (e) => {
            navigationRef.current = navigation;
            const state = e.data.state;
            if (state) {
              const routeName = state.routes[state.index].name;
              setActiveTab(routeName);
            }
          },
        })}
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.text.dark,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarShowLabel: true,
        }}
      >
        <Tab.Screen
          name='HomeTab'
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          }}
        />
        <Tab.Screen
          name='SearchTab'
          component={SearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ focused }) => <SearchIcon focused={focused} />,
          }}
        />
      </Tab.Navigator>

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
  },
  safeAreaTop: {
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.dark,
    fontFamily: "Poppins_400Regular",
    padding: 0,
  },
  settingsButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    width: 32,
    height: 32,
  },
  tabBar: {
    backgroundColor: colors.background,
    borderTopWidth: 0,
    height: 72,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  tabIcon: {
    width: 32,
    height: 32,
  },
});
