import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: colors.text.dark,
    fontFamily: "Poppins_600SemiBold",
  },
});
