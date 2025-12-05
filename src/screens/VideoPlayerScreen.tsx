import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  VideoFullscreenUpdate,
  VideoFullscreenUpdateEvent,
} from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { colors } from "../constants/colors";

// Import SVG icons from assets
import BackIcon from "../../assets/leftarrow-icon.svg";
import VolumeIcon from "../../assets/volume-icon.svg";
import FullscreenIcon from "../../assets/fullscreen-icon.svg";
import AirplayIcon from "../../assets/airplay-icon.svg";
import BackwardIcon from "../../assets/backward-icon.svg";
import ForwardIcon from "../../assets/forward-icon.svg";
import PlayIcon from "../../assets/play-icon.svg";
import PauseIcon from "../../assets/pause-icon.svg";
import PersonIcon from "../../assets/person-icon.svg";
import ViewsIcon from "../../assets/views-icon.svg";
import LikesIcon from "../../assets/likes-icon.svg";

type Props = NativeStackScreenProps<RootStackParamList, "VideoPlayer">;

const { width } = Dimensions.get("window");
const VIDEO_HEIGHT = (width * 9) / 16;

const SAMPLE_VIDEO_URL = "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

export default function VideoPlayerScreen({ navigation, route }: Props) {
  const { video } = route.params;
  const videoRef = useRef<Video>(null);
  const [activeTab, setActiveTab] = useState<"Details" | "Notes">("Details");
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const handleSeek = async (offsetMs: number) => {
    if (videoRef.current) {
      const newPosition = Math.max(0, Math.min(duration, currentTime + offsetMs));
      await videoRef.current.setPositionAsync(newPosition);
    }
  };

  const handleFullscreen = async () => {
    try {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      if (videoRef.current) {
        await videoRef.current.presentFullscreenPlayer();
      }
    } catch (error) {
      console.log("Fullscreen error:", error);
    }
  };

  const handleFullscreenUpdate = async (event: VideoFullscreenUpdateEvent) => {
    // PLAYER_DID_DISMISS = user exited fullscreen
    if (event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_DISMISS) {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        // Następnie odblokuj, żeby pozwolić na normalną rotację
        await ScreenOrientation.unlockAsync();
      } catch (error) {
        console.log("Orientation reset error:", error);
      }
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: SAMPLE_VIDEO_URL }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={true}
          isLooping={true}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onFullscreenUpdate={handleFullscreenUpdate}
        />

        {/* Video Controls Overlay */}
        <View style={styles.controlsOverlay}>
          {/* Top Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity
              style={[styles.backButton, styles.iconBackground]}
              onPress={() => navigation.goBack()}
            >
              <BackIcon width={20} height={20} color={colors.icon.light} />
            </TouchableOpacity>
            <View style={styles.topRightControls}>
              <TouchableOpacity style={[styles.controlButton, styles.iconBackground]}>
                <VolumeIcon width={20} height={20} color={colors.icon.light} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.controlButton, styles.iconBackground]}>
                <AirplayIcon width={20} height={20} color={colors.icon.light} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Center Play/Pause */}
          <View style={styles.centerControls}>
            <TouchableOpacity
              style={[styles.seekButton, styles.iconBackground]}
              onPress={() => handleSeek(-10000)}
            >
              <BackwardIcon width={24} height={24} color={colors.icon.light} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
              {isPlaying ? (
                <PauseIcon width={24} height={24} color={colors.icon.light} />
              ) : (
                <PlayIcon width={24} height={24} color={colors.icon.light} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.seekButton, styles.iconBackground]}
              onPress={() => handleSeek(10000)}
            >
              <ForwardIcon width={24} height={24} color={colors.icon.light} />
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={styles.bottomControls}>
            <View style={styles.bottomRow}>
              <Text style={styles.timeText}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
              <TouchableOpacity style={styles.fullscreenButton} onPress={handleFullscreen}>
                <FullscreenIcon width={24} height={24} color={colors.icon.light} />
              </TouchableOpacity>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Video Info */}
      <ScrollView style={styles.infoContainer}>
        {/* Title */}
        <Text style={styles.videoTitle} numberOfLines={2}>
          {video.title}
        </Text>

        {/* Channel Info */}
        <View style={styles.channelContainer}>
          <View style={styles.channelAvatar}>
            <PersonIcon width={20} height={20} color={colors.icon.light} />
          </View>
          <Text style={styles.channelName}>{video.channelTitle}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Details" && styles.activeTab]}
            onPress={() => setActiveTab("Details")}
          >
            <Text style={styles.tabText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setActiveTab("Notes")}>
            <Text style={[styles.tabText]}>Notes</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "Details" ? (
          <View style={styles.detailsContent}>
            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                {video.description || "No description available."}
              </Text>
            </View>

            {/* Statistics */}
            <View style={styles.statisticsSection}>
              <Text style={styles.sectionTitle}>Statistics</Text>
              <View style={styles.statsRow}>
                <View style={styles.statBadge}>
                  <ViewsIcon width={20} height={20} color={colors.icon.light} />
                  <Text style={styles.statText}>25268952 views</Text>
                </View>
                <View style={styles.statBadge}>
                  <LikesIcon width={20} height={20} color={colors.icon.light} />
                  <Text style={styles.statText}>12345 likes</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.notesContent}>
            <Text style={styles.notesPlaceholder}>
              Your notes will appear here. Start taking notes while watching the video.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  videoContainer: {
    width: width,
    height: VIDEO_HEIGHT,
    backgroundColor: "#000000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 44,
  },
  backButton: {
    padding: 8,
  },
  topRightControls: {
    flexDirection: "row",
    gap: 16,
  },
  controlButton: {
    padding: 8,
  },
  centerControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  seekButton: {
    padding: 8,
  },
  iconBackground: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomControls: {
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  fullscreenButton: {
    padding: 4,
  },
  timeText: {
    color: colors.text.light,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  progressBarContainer: {
    width: width,
    height: 4,
    marginLeft: -16,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF0000",
  },
  infoContainer: {
    flex: 1,
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: colors.text.dark,
    marginBottom: 12,
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  channelAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  channelName: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: colors.primary,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
    color: colors.primary,
  },

  detailsContent: {
    flex: 1,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    color: colors.text.dark,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: colors.text.muted,
    lineHeight: 22,
  },
  statisticsSection: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: colors.text.light,
  },
  notesContent: {
    flex: 1,
    padding: 16,
  },
  notesPlaceholder: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: colors.text.muted,
    textAlign: "center",
    marginTop: 40,
  },
});
