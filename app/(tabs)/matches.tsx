import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Match, Sport } from '@/types/match';
import MatchDetailModal from '@/components/match-detail-modal';
import CreateMatchModal from '@/components/create-match-modal';
import { matchApi } from '@/services/api';

export default function MatchesScreen() {
  const { sport } = useLocalSearchParams<{ sport: Sport }>();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadMatches();
  }, [sport]);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await matchApi.getAllMatches(sport);
      const formattedMatches = data.map(match => ({
        ...match,
        current_players: parseInt(match.current_players)
      }));
      setMatches(formattedMatches);
    } catch (error) {
      console.error('Error loading matches:', error);
      Alert.alert('Error', 'Failed to load matches. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMatch = async (matchId: number) => {
    Alert.alert(
      'Delete Match',
      'Are you sure you want to delete this match?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await matchApi.deleteMatch(matchId);
              setSelectedMatch(null);
              loadMatches();
              Alert.alert('Success', 'Match deleted successfully');
            } catch (error) {
              console.error('Error deleting match:', error);
              Alert.alert('Error', 'Failed to delete match');
            }
          },
        },
      ]
    );
  };

  const renderMatchCard = ({ item }: { item: Match }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedMatch(item)}
      activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          {item.name}
        </ThemedText>
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>{item.skill_level}</ThemedText>
        </View>
      </View>

      <View style={styles.cardInfo}>
        <ThemedText style={styles.infoText}>
          📅 {item.date} at {item.time}
        </ThemedText>
        <ThemedText style={styles.infoText}>📍 {item.address}</ThemedText>
        <ThemedText style={styles.infoText}>
          👥 {item.current_players}/{item.max_players} players
        </ThemedText>
      </View>

      <ThemedText style={styles.description}>{item.description}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: sport === 'football' ? 'Football Matches' : 'Padel Matches',
          headerBackTitle: 'Back',
        }}
      />

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <>
          <FlatList
            data={matches}
            renderItem={renderMatchCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.centerContent}>
                <ThemedText style={styles.emptyText}>No matches found</ThemedText>
                <ThemedText style={styles.emptySubtext}>
                  Be the first to create a match!
                </ThemedText>
              </View>
            }
          />

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowCreateModal(true)}
            activeOpacity={0.8}>
            <ThemedText style={styles.createButtonText}>+ Create Match</ThemedText>
          </TouchableOpacity>
        </>
      )}

      <MatchDetailModal
        match={selectedMatch}
        visible={selectedMatch !== null}
        onClose={() => setSelectedMatch(null)}
        onDelete={handleDeleteMatch}
        onRefresh={loadMatches}
      />

      <CreateMatchModal
        visible={showCreateModal}
        sport={sport}
        onClose={() => setShowCreateModal(false)}
        onSuccess={loadMatches}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  listContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    color: '#000',
  },
  badge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '600',
  },
  cardInfo: {
    gap: 8,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
