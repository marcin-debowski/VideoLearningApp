import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Image,
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
import { styles } from "./LoginScreen.styles";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

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
    navigation.navigate('Home');
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.background} />

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Text style={styles.logoText}>YouTube</Text>
        <Text style={styles.learnText}>LEARN</Text>
      </View>

      {/* Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/yticon.png")}
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
          <TouchableOpacity>
            <Text style={styles.linkText}>Terms and Conditions</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}> and </Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
