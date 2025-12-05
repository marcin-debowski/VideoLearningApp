import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import LoginScreen from "../screens/LoginScreen";
import HomeTabs from "./HomeTabs";
import VideoPlayerScreen from "../screens/VideoPlayerScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Home' component={HomeTabs} />
      <Stack.Screen name='VideoPlayer' component={VideoPlayerScreen} />
    </Stack.Navigator>
  );
}
