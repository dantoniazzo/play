import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Sport } from '@/types/match';

export default function HomeScreen() {
  const handleSportSelect = (sport: Sport) => {
    router.push({
      pathname: '/matches',
      params: { sport },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Choose Your Sport
      </ThemedText>

      <View style={styles.sportContainer}>
        <TouchableOpacity
          style={[styles.sportCard, styles.footballCard]}
          onPress={() => handleSportSelect('football')}
          activeOpacity={0.7}>
          <ThemedText style={styles.sportIcon}>⚽</ThemedText>
          <ThemedText type="subtitle" style={styles.sportText}>
            Football
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sportCard, styles.padelCard]}
          onPress={() => handleSportSelect('padel')}
          activeOpacity={0.7}>
          <ThemedText style={styles.sportIcon}>🎾</ThemedText>
          <ThemedText type="subtitle" style={styles.sportText}>
            Padel
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
  },
  sportContainer: {
    gap: 20,
  },
  sportCard: {
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  footballCard: {
    backgroundColor: '#4CAF50',
  },
  padelCard: {
    backgroundColor: '#2196F3',
  },
  sportIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  sportText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
