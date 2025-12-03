import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigationState } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import SortModal, { SortOption } from "../components/SortModal";
import { colors } from "../constants/colors";

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function HomeIcon({ focused }: { focused: boolean }) {
  return (
    <Image
      source={
        focused
          ? require("../../assets/home-icon-dark.png")
          : require("../../assets/home-icon-light.png")
      }
      style={styles.tabIcon}
      resizeMode='contain'
    />
  );
}

function SearchIcon({ focused }: { focused: boolean }) {
  return (
    <Image
      source={
        focused
          ? require("../../assets/search-icon-dark.png")
          : require("../../assets/search-icon-light.png")
      }
      style={styles.tabIcon}
      resizeMode='contain'
    />
  );
}

export default function HomeTabs() {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [activeTab, setActiveTab] = useState("HomeTab");

  const isHomeTab = activeTab === "HomeTab";

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle='dark-content' backgroundColor={colors.background} />
        {/* Top Search Bar */}
        <View style={styles.topBar}>
          <View style={styles.searchContainer}>
            <Image
              source={require("../../assets/search-icon-dark.png")}
              style={styles.searchIcon}
              resizeMode='contain'
            />
            <TextInput
              style={styles.searchInput}
              placeholder='Search videos'
              placeholderTextColor={colors.text.muted}
              editable={false}
            />
          </View>
          {isHomeTab && (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setSortModalVisible(true)}
            >
              <Image
                source={require("../../assets/settings-icon.png")}
                style={styles.settingsIcon}
                resizeMode='contain'
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.text.dark,
          tabBarInactiveTintColor: colors.white,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarShowLabel: true,
        }}
        screenListeners={{
          state: (e) => {
            const state = e.data.state;
            if (state) {
              const routeName = state.routes[state.index].name;
              setActiveTab(routeName);
            }
          },
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
    height: 70,
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
