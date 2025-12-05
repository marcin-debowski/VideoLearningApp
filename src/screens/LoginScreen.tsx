import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { PoetsenOne_400Regular } from "@expo-google-fonts/poetsen-one";
import { SigmarOne_400Regular } from "@expo-google-fonts/sigmar-one";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { colors } from "../constants/colors";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    PoetsenOne_400Regular,
    SigmarOne_400Regular,
  });

  const handleGuestLogin = () => {
    navigation.navigate("Home");
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.background} />

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Text style={styles.logoText}>YouTube</Text>
        <Text style={styles.learnText}>LEARN</Text>
      </View>

      {/* Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/app-icon.png")}
          style={styles.ytIcon}
          resizeMode='contain'
        />
      </View>

      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Welcome to the best YouTube-based learning application.
        </Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleGuestLogin}>
        <Text style={styles.loginButtonText}>Log in as guest</Text>
      </TouchableOpacity>

      {/* Terms and Conditions */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>By continuing you agree with</Text>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => Linking.openURL("https://github.com/marcin-debowski")}>
            <Text style={styles.linkText}>Terms and Conditions</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}> and </Text>
          <TouchableOpacity onPress={() => Linking.openURL("https://github.com/marcin-debowski")}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  loadingContainer: {
    justifyContent: "center",
  },
  logoSection: {
    marginTop: 80,
    marginRight: 52,
    marginLeft: 49,
  },
  logoText: {
    fontSize: 64,
    fontFamily: "PoetsenOne_400Regular",
    color: "#FFFEF5",
    letterSpacing: 0,
    textAlign: "left",
  },
  learnText: {
    fontSize: 32,
    fontFamily: "SigmarOne_400Regular",
    letterSpacing: 0,
    color: colors.text.dark,
    marginTop: -8,
    textAlign: "right",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ytIcon: {
    width: 140,
    height: 140,
  },
  welcomeContainer: {
    marginBottom: 24,
    alignSelf: "stretch",
    marginHorizontal: 33,
  },
  welcomeText: {
    fontSize: 22,
    color: colors.text.light,
    textAlign: "left",
    lineHeight: 28,
    fontFamily: "Poppins_600SemiBold",
  },
  loginButton: {
    backgroundColor: colors.button.primary,
    paddingVertical: 12,
    alignSelf: "stretch",
    borderRadius: 12,
    marginBottom: 24,
    alignItems: "center",
    marginHorizontal: 33,
  },
  loginButtonText: {
    color: colors.button.text,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  termsContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  termsText: {
    fontSize: 13,
    color: colors.text.light,
    fontFamily: "Poppins_400Regular",
  },
  linksContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  linkText: {
    fontSize: 13,
    color: colors.link,
    textDecorationLine: "underline",
    fontFamily: "Poppins_400Regular",
  },
});
