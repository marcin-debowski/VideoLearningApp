import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../constants/colors";

export type SortOption = "latest" | "oldest" | "popular";

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  selectedOption: SortOption;
  onSelectOption: (option: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Upload date: latest" },
  { value: "oldest", label: "Upload date: oldest" },
  { value: "popular", label: "Most popular" },
];

export default function SortModal({
  visible,
  onClose,
  selectedOption,
  onSelectOption,
}: SortModalProps) {
  const handleConfirm = () => {
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType='fade' onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Sort records by:</Text>

              <View style={styles.optionsContainer}>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.optionRow}
                    onPress={() => onSelectOption(option.value)}
                  >
                    <View style={styles.radioOuter}>
                      {selectedOption === option.value && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 350,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: colors.text.light,
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
  },
  optionLabel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: colors.text.light,
  },
  confirmButton: {
    backgroundColor: colors.button.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: colors.button.text,
  },
});
