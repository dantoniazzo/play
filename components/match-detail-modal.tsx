import { ThemedText } from "@/components/themed-text";
import { Match } from "@/types/match";
import { matchApi, MatchParticipant } from "@/services/api";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";

interface MatchDetailModalProps {
  match: Match | null;
  visible: boolean;
  onClose: () => void;
  onDelete?: (matchId: number) => void;
  onRefresh?: () => void;
}

export default function MatchDetailModal({
  match,
  visible,
  onClose,
  onDelete,
  onRefresh,
}: MatchDetailModalProps) {
  const [participants, setParticipants] = useState<MatchParticipant[]>([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (match && visible) {
      loadParticipants();
    }
  }, [match, visible]);

  const loadParticipants = async () => {
    if (!match) return;

    try {
      setLoadingParticipants(true);
      const data = await matchApi.getMatchParticipants(match.id);
      setParticipants(data);
      // TODO: Check if current user is in participants when auth is implemented
      setIsJoined(false);
    } catch (error) {
      console.error("Error loading participants:", error);
    } finally {
      setLoadingParticipants(false);
    }
  };

  const handleJoin = async () => {
    if (!match) return;

    try {
      await matchApi.joinMatch(match.id, 1); // TODO: Replace with actual user ID
      Alert.alert("Success", `You've joined ${match.name}!`);
      setIsJoined(true);
      loadParticipants();
      onRefresh?.();
    } catch (error) {
      console.error("Error joining match:", error);
      Alert.alert("Error", "Failed to join match");
    }
  };

  const handleLeave = async () => {
    if (!match) return;

    try {
      await matchApi.leaveMatch(match.id, 1); // TODO: Replace with actual user ID
      Alert.alert("Success", "You've left the match");
      setIsJoined(false);
      loadParticipants();
      onRefresh?.();
    } catch (error) {
      console.error("Error leaving match:", error);
      Alert.alert("Error", "Failed to leave match");
    }
  };

  const handleDelete = () => {
    if (!match || !onDelete) return;
    onDelete(match.id);
  };

  if (!match) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {match.name}
          </ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <ThemedText style={styles.closeButtonText}>✕</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <ThemedText style={styles.label}>Address</ThemedText>
              <ThemedText style={styles.value}>
                {match.address}
              </ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText style={styles.label}>Date & Time</ThemedText>
              <ThemedText style={styles.value}>
                {match.date} at {match.time}
              </ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText style={styles.label}>Players</ThemedText>
              <ThemedText style={styles.value}>
                {match.current_players}/{match.max_players}
              </ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText style={styles.label}>Skill Level</ThemedText>
              <ThemedText style={styles.value}>{match.skill_level}</ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText style={styles.label}>Description</ThemedText>
              <ThemedText style={styles.value}>{match.description}</ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText style={styles.label}>Participants</ThemedText>
              {loadingParticipants ? (
                <ActivityIndicator size="small" color="#4CAF50" />
              ) : participants.length > 0 ? (
                <View style={styles.participantsList}>
                  {participants.map((participant) => (
                    <View key={participant.id} style={styles.participantItem}>
                      <ThemedText style={styles.participantName}>
                        • {participant.name}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              ) : (
                <ThemedText style={styles.value}>No participants yet</ThemedText>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.deleteButtonText}>Delete</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.joinButton, isJoined && styles.leaveButton]}
            onPress={isJoined ? handleLeave : handleJoin}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.joinButtonText}>
              {isJoined ? "Leave" : "Join"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    flex: 1,
    color: "#000",
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
  },
  content: {
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    gap: 20,
  },
  detailRow: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF5252",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  joinButton: {
    flex: 2,
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  leaveButton: {
    backgroundColor: "#FF9800",
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  participantsList: {
    gap: 8,
    marginTop: 8,
  },
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantName: {
    fontSize: 16,
    color: "#000",
  },
});
