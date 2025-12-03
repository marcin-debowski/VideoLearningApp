import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: 32,
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
    borderWidth: 2,
    borderColor: colors.border.yellow,
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
