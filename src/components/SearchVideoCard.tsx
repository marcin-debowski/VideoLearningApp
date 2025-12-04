import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { YouTubeVideo } from "../types/youtube";
import { colors } from "../constants/colors";

interface SearchVideoCardProps {
  video: YouTubeVideo;
  onPress?: () => void;
}

export default function SearchVideoCard({ video, onPress }: SearchVideoCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: video.thumbnailUrl }} style={styles.thumbnail} resizeMode='cover' />
      <Text style={styles.channelName}>{video.channelTitle}</Text>
      <Text style={styles.title} numberOfLines={2}>
        {video.title}
      </Text>
      <Text style={styles.date}>{video.publishedAt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  channelName: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: colors.text.dark,
    marginTop: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: colors.text.muted,
    marginTop: 4,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: colors.text.muted,
    marginTop: 4,
    textAlign: "right",
  },
});
