import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { YouTubeVideo } from "../types/youtube";
import { colors } from "../constants/colors";

interface VideoCardProps {
  video: YouTubeVideo;
  onPress?: () => void;
}

const CARD_WIDTH = 180;

export default function VideoCard({ video, onPress }: VideoCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: video.thumbnailUrl }} style={styles.thumbnail} resizeMode='cover' />
      <Text style={styles.title} numberOfLines={2}>
        {video.title}
      </Text>
      <Text style={styles.date}>{video.publishedAt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: 16,
  },
  thumbnail: {
    width: "100%",
    height: CARD_WIDTH * 0.65,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: colors.text.dark,
    marginTop: 8,
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
